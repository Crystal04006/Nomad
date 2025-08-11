// Data with state -> places mapping + images, booking links, popularity tag
const placesData = {
  "Maharashtra": [
    {
      id: 1,
      name: "Gateway of India",
      location: "Mumbai, Maharashtra",
      lat: 18.9220,
      lon: 72.8347,
      description: "Iconic arch monument overlooking the Arabian Sea.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Gateway_of_India_Mumbai_03-2016_img3.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Gateway_of_India%2C_Mumbai_01.JPG"
      ],
      popularity: "Must-See",
      bookingLink: null
    },
    {
      id: 2,
      name: "Siddhivinayak Temple",
      location: "Mumbai, Maharashtra",
      lat: 19.0176,
      lon: 72.8301,
      description: "Famous Hindu temple dedicated to Lord Ganesha.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Siddhivinayak_Temple_Mumbai_2011.jpg"
      ],
      popularity: "Popular",
      bookingLink: null
    }
  ],
  "Uttar Pradesh": [
    {
      id: 5,
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      lat: 27.1751,
      lon: 78.0421,
      description: "The iconic white marble mausoleum, symbol of eternal love.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj_Mahal_in_March_2004.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/19/Taj_Mahal_in_March_2004.jpg"
      ],
      popularity: "Must-See",
      bookingLink: "https://www.tajmahal.gov.in/ticket-info.html"
    }
  ],
  "Karnataka": [
    {
      id: 3,
      name: "Mysore Palace",
      location: "Mysore, Karnataka",
      lat: 12.3051,
      lon: 76.6551,
      description: "Royal historical palace with exquisite architecture and light shows.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/Mysore_Palace_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mysore_Palace_Inside.JPG"
      ],
      popularity: "Popular",
      bookingLink: "https://www.mysorepalace.gov.in/visit"
    }
  ],
  "Rajasthan": [
    {
      id: 4,
      name: "Amber Fort",
      location: "Jaipur, Rajasthan",
      lat: 26.9855,
      lon: 75.8513,
      description: "Historic fort palace with breathtaking views and cultural heritage.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Amber_fort_3.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Amber_Fort_-_Panorama.jpg"
      ],
      popularity: "Hidden Gem",
      bookingLink: "https://amberfort.in/tickets"
    }
  ]
};

// DOM references
const stateSelect = document.getElementById("stateSelect");
const citySelect = document.getElementById("citySelect");
const detailsSection = document.getElementById("detailsSection");
const placeName = document.getElementById("placeName");
const placeLocation = document.getElementById("placeLocation");
const placeDescription = document.getElementById("placeDescription");
const imagesContainer = document.getElementById("imagesContainer");
const bookingBtn = document.getElementById("bookingBtn");
const popularityTag = document.getElementById("popularityTag");
const transportInfo = document.getElementById("transportInfo");
const addToPlanBtn = document.getElementById("addToPlanBtn");
const clearPlanBtn = document.getElementById("clearPlanBtn");
const planList = document.getElementById("planList");
const generatePlanBtn = document.getElementById("generatePlanBtn");
const finalPlan = document.getElementById("finalPlan");
const darkModeToggle = document.getElementById("darkModeToggle");

let selectedPlace = null;
let userCoords = null;
let plan = [];

let map = null;
let placeMarker = null;
let userMarker = null;

// Initialize Leaflet map
function initMap(lat = 20.5937, lon = 78.9629, zoom = 5) {
  if (map) {
    map.remove();
  }
  map = L.map("map").setView([lat, lon], zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

// Populate state dropdown
function populateStates() {
  const states = Object.keys(placesData);
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}
populateStates();

// On state select, populate city/place dropdown
stateSelect.addEventListener("change", () => {
  citySelect.innerHTML = '<option value="" disabled selected>Choose a city/place</option>';
  const selectedState = stateSelect.value;
  if (!selectedState) {
    citySelect.classList.add("hidden");
    detailsSection.classList.add("hidden");
    return;
  }
  const places = placesData[selectedState];
  places.forEach((place) => {
    const option = document.createElement("option");
    option.value = place.id;
    option.textContent = place.name;
    citySelect.appendChild(option);
  });
  citySelect.classList.remove("hidden");
  detailsSection.classList.add("hidden");
  selectedPlace = null;
});

// On city/place select, show details
citySelect.addEventListener("change", () => {
  const placeId = parseInt(citySelect.value);
  const state = stateSelect.value;
  const place = placesData[state].find((p) => p.id === placeId);
  if (place) {
    selectedPlace = place;
    showPlaceDetails(place);
  }
});

function showPlaceDetails(place) {
  placeName.textContent = place.name;
  placeLocation.textContent = place.location;
  placeDescription.textContent = place.description;

  // Popularity tag
  if (place.popularity) {
    popularityTag.textContent = place.popularity;
    popularityTag.classList.remove("hidden");
  } else {
    popularityTag.classList.add("hidden");
  }

  // Images
  imagesContainer.innerHTML = "";
  if (place.images && place.images.length) {
    place.images.forEach((imgUrl) => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = place.name;
      img.loading = "lazy";
      imagesContainer.appendChild(img);
    });
  }

  // Booking button
  if (place.bookingLink) {
    bookingBtn.classList.remove("hidden");
    bookingBtn.onclick = () => {
      window.open(place.bookingLink, "_blank", "noopener");
    };
  } else {
    bookingBtn.classList.add("hidden");
    bookingBtn.onclick = null;
  }

  detailsSection.classList.remove("hidden");

  // Update map and transport info
  updateMapAndTransport(place.lat, place.lon);
}

function updateMapAndTransport(lat, lon) {
  if (!map) {
    initMap(lat, lon, 10);
  } else {
    map.setView([lat, lon], 10);
  }
  if (placeMarker) {
    map.removeLayer(placeMarker);
    placeMarker = null;
  }
  if (userMarker) {
    map.removeLayer(userMarker);
    userMarker = null;
  }

  placeMarker = L.marker([lat, lon]).addTo(map).bindPopup(selectedPlace.name).openPopup();

  if (userCoords) {
    userMarker = L.marker([userCoords.latitude, userCoords.longitude], {
      icon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      })
    }).addTo(map).bindPopup("You are here");

    const bounds = L.latLngBounds(
      [
        [lat, lon],
        [userCoords.latitude, userCoords.longitude]
      ]
    );
    map.fitBounds(bounds, { padding: [50, 50] });

    // Fetch transport info (mock example here)
    transportInfo.textContent = `Approx. 1-2 hours by public transport from your location.`;
  } else {
    transportInfo.textContent = "Allow location access for transport info.";
  }
}

function requestUserLocation() {
  if (!navigator.geolocation) {
    transportInfo.textContent = "Geolocation not supported by your browser.";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords = pos.coords;
      if (selectedPlace) {
        updateMapAndTransport(selectedPlace.lat, selectedPlace.lon);
      }
    },
    () => {
      transportInfo.textContent = "Unable to get your location.";
    }
  );
}

requestUserLocation();

// Add to plan functionality
addToPlanBtn.addEventListener("click", () => {
  if (!selectedPlace) return;
  if (plan.find((p) => p.id === selectedPlace.id)) return;

  plan.push(selectedPlace);
  updatePlanList();
});

clearPlanBtn.addEventListener("click", () => {
  plan = [];
  updatePlanList();
  finalPlan.textContent = "";
  generatePlanBtn.disabled = true;
});

function updatePlanList() {
  planList.innerHTML = "";
  if (plan.length === 0) {
    generatePlanBtn.disabled = true;
    return;
  }
  generatePlanBtn.disabled = false;
  plan.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${p.name}`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn-remove");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      plan = plan.filter((pl) => pl.id !== p.id);
      updatePlanList();
      finalPlan.textContent = "";
    };

    li.appendChild(removeBtn);
    planList.appendChild(li);
  });
}

generatePlanBtn.addEventListener("click", () => {
  if (plan.length === 0) return;
  let output = "Your Outing Plan:\n\n";
  plan.forEach((p, i) => {
    output += `${i + 1}. ${p.name} - ${p.location}\n`;
  });
  finalPlan.textContent = output;
});

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});
