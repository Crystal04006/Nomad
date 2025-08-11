<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nomad</title>
  <!-- Google Fonts Poppins -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <div class="header-content">
      <h1>Nomad</h1>
      <button id="darkModeToggle" aria-label="Toggle dark mode">🌙</button>
    </div>
  </header>
  <main>
    <section class="selection-section">
      <label for="stateSelect">Select State</label>
      <select id="stateSelect">
        <option value="" disabled selected>Choose a state</option>
      </select>

      <label for="citySelect" class="hidden">Select City / Place</label>
      <select id="citySelect" class="hidden">
        <option value="" disabled selected>Choose a city/place</option>
      </select>
    </section>

    <section id="detailsSection" class="details-section hidden">
      <div class="place-header">
        <h2 id="placeName"></h2>
        <span id="popularityTag" class="popularity-tag"></span>
      </div>
      <p class="location" id="placeLocation"></p>
      <p class="description" id="placeDescription"></p>

      <div id="imagesContainer" class="images-container"></div>

      <button id="bookingBtn" class="booking-btn hidden" target="_blank" rel="noopener noreferrer">Book Now</button>

      <div id="map"></div>

      <div class="transport-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bus-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 13h18M7 17h10M5 7h14l1 6H4l1-6zM6 17v2a1 1 0 001 1h1v-3H6zm10 0v3h1a1 1 0 001-1v-2h-2z"
          />
        </svg>
        <p id="transportInfo" class="info-text">Loading route info...</p>
      </div>

      <button id="addToPlanBtn" class="add-plan-btn">Add to Plan</button>
      <button id="clearPlanBtn" class="clear-plan-btn">Clear Plan</button>
    </section>

    <section class="plan-section">
      <h3>Your Plan</h3>
      <ul id="planList" class="plan-list"></ul>
      <button id="generatePlanBtn" disabled>Create Outing Plan</button>
      <pre id="finalPlan" class="final-plan"></pre>
    </section>
  </main>

  <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" crossorigin=""></script>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    crossorigin=""
  />
  <script src="app.js"></script>
</body>
</html>

/* Reset and base */
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: #f5f7fb;
  color: #222;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.4s ease, color 0.4s ease;
}
header {
  background: linear-gradient(90deg, #8e2de2, #4a00e0);
  padding: 1.2rem 2rem;
  color: white;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header h1 {
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 2px;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
#darkModeToggle {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease;
  user-select: none;
}
#darkModeToggle:hover {
  transform: rotate(20deg);
}

main {
  max-width: 900px;
  margin: 1.5rem auto 3rem;
  padding: 1rem 2rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 16px 36px rgba(74, 0, 224, 0.2);
  transition: background-color 0.4s ease, color 0.4s ease;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.selection-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  align-items: center;
}
.selection-section label {
  font-weight: 600;
  font-size: 1.1rem;
  min-width: 110px;
}
.selection-section select {
  flex-grow: 1;
  min-width: 180px;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  border: 2px solid #8e2de2;
  font-size: 1rem;
  background: #f7f3ff;
  color: #4a00e0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.selection-section select:hover {
  background-color: #eee7ff;
}
.selection-section select:focus {
  outline: none;
  border-color: #4a00e0;
  background-color: #dcd0ff;
}

.hidden {
  display: none !important;
}

.details-section {
  border-top: 2px solid #8e2de2;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.place-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.place-header h2 {
  margin: 0;
  font-weight: 700;
  font-size: 1.8rem;
  color: #4a00e0;
  text-shadow: 0 0 10px rgba(74, 0, 224, 0.4);
}
.popularity-tag {
  background: #ff6f91;
  color: white;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 10px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  user-select: none;
  box-shadow: 0 2px 8px #ff6f91aa;
  transition: background-color 0.3s ease;
}
.popularity-tag.hidden {
  display: none;
}
.location {
  font-style: italic;
  font-weight: 600;
  color: #7a57d1;
  letter-spacing: 0.05em;
}
.description {
  font-size: 1rem;
  color: #444;
  line-height: 1.4;
  max-width: 700px;
}
.images-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.images-container img {
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 6px 15px rgba(74, 0, 224, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
}
.images-container img:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(74, 0, 224, 0.6);
}
.booking-btn {
  background: #ff4785;
  color: white;
  font-weight: 700;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 14px;
  cursor: pointer;
  width: fit-content;
  user-select: none;
  transition: background-color 0.3s ease;
  margin-top: 0.6rem;
  box-shadow: 0 4px 10px #ff4785cc;
}
.booking-btn:hover {
  background-color: #d13868;
  box-shadow: 0 6px 15px #d1386888;
}
#map {
  margin-top: 1rem;
  border-radius: 18px;
  height: 260px;
  box-shadow: 0 10px 30px rgba(74, 0, 224, 0.25);
  border: none;
}
.transport-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
  color: #5b3ea6;
  font-weight: 600;
  font-size: 0.9rem;
  user-select: none;
}
.bus-icon {
  width: 24px;
  height: 24px;
  stroke: #5b3ea6;
}
.add-plan-btn,
.clear-plan-btn {
  background: #4a00e0;
  color: white;
  border: none;
  padding: 0.7rem 1.3rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 6px 18px rgba(74, 0, 224, 0.3);
  margin-right: 0.75rem;
  transition: background-color 0.3s ease;
}
.add-plan-btn:hover {
  background-color: #2f00a3;
  box-shadow: 0 9px 25px rgba(47, 0, 163, 0.4);
}
.clear-plan-btn {
  background: #a52a2a;
  box-shadow: 0 6px 18px rgba(165, 42, 42, 0.3);
}
.clear-plan-btn:hover {
  background-color: #7a1d1d;
  box-shadow: 0 9px 25px rgba(122, 29, 29, 0.4);
}
.plan-section {
  border-top: 2px solid #8e2de2;
  padding-top: 1rem;
}
.plan-section h3 {
  font-weight: 700;
  font-size: 1.6rem;
  color: #4a00e0;
  text-shadow: 0 0 8px rgba(74, 0, 224, 0.4);
}
.plan-list {
  margin-top: 0.6rem;
  max-width: 100%;
  padding-left: 1.2rem;
}
.plan-list li {
  font-weight: 600;
  color: #3a1c9f;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.btn-remove {
  background: #ff4785;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 6px;
  padding: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}
.btn-remove:hover {
  background-color: #d13868;
}
#generatePlanBtn {
  margin-top: 0.8rem;
  background: #ff6f91;
  box-shadow: 0 6px 20px #ff6f9188;
  transition: background-color 0.3s ease;
}
#generatePlanBtn:disabled {
  background: #ff6f91aa;
  cursor: not-allowed;
  box-shadow: none;
}
#generatePlanBtn:not(:disabled):hover {
  background-color: #db566b;
  box-shadow: 0 9px 30px #db566bcc;
}
.final-plan {
  margin-top: 1rem;
  white-space: pre-wrap;
  font-weight: 600;
  font-size: 1rem;
  color: #5b3ea6;
  max-width: 100%;
  user-select: text;
  background: #f0e7ff;
  padding: 1rem 1.2rem;
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(74, 0, 224, 0.2);
}

/* Responsive */
@media (max-width: 620px) {
  main {
    padding: 1rem 1.2rem;
  }
  .selection-section {
    flex-direction: column;
  }
  .selection-section label {
    min-width: auto;
  }
  .selection-section select {
    width: 100%;
  }
  .images-container img {
    width: 100px;
    height: 65px;
  }
}
body.dark-mode {
  background: #121217;
  color: #ddd;
}
body.dark-mode main {
  background: #1e1e2f;
  color: #ddd;
  box-shadow: 0 16px 36px rgba(74, 0, 224, 0.8);
}
body.dark-mode header {
  background: linear-gradient(90deg, #3700b3, #6200ea);
}
body.dark-mode .selection-section select {
  background: #2e2e44;
  color: #ddd;
  border-color: #6200ea;
}
body.dark-mode .selection-section select:hover {
  background: #3c3c5a;
}
body.dark-mode .details-section {
  border-top-color: #6200ea;
}
body.dark-mode .place-header h2,
body.dark-mode .popularity-tag,
body.dark-mode .plan-section h3 {
  color: #bb86fc;
  text-shadow: none;
}
body.dark-mode .description,
body.dark-mode .location {
  color: #ccc;
}
body.dark-mode .booking-btn {
  background: #bb86fc;
  color: #121217;
  box-shadow: 0 4px 10px #bb86fccc;
}
body.dark-mode .booking-btn:hover {
  background-color: #985eff;
  box-shadow: 0 6px 15px #985eff88;
}
body.dark-mode .add-plan-btn {
  background: #6200ea;
  box-shadow: 0 6px 18px #6200eaaa;
}
body.dark-mode .add-plan-btn:hover {
  background-color: #3700b3;
  box-shadow: 0 9px 25px #3700b3cc;
}
body.dark-mode .clear-plan-btn {
  background: #b00020;
  box-shadow: 0 6px 18px #b00020aa;
}
body.dark-mode .clear-plan-btn:hover {
  background-color: #7f0016;
  box-shadow: 0 9px 25px #7f001688;
}
body.dark-mode .plan-list li {
  color: #ddd;
}
body.dark-mode .btn-remove {
  background: #bb86fc;
  color: #121217;
}
body.dark-mode .btn-remove:hover {
  background-color: #985eff;
}
body.dark-mode #generatePlanBtn {
  background: #bb86fc;
  box-shadow: 0 6px 20px #bb86fc88;
}
body.dark-mode #generatePlanBtn:disabled {
  background: #bb86fc55;
  cursor: not-allowed;
  box-shadow: none;
}
body.dark-mode #generatePlanBtn:not(:disabled):hover {
  background-color: #985eff;
  box-shadow: 0 9px 30px #985effcc;
}
body.dark-mode .final-plan {
  background: #2e2e44;
  color: #ddd;
  box-shadow: 0 4px 15px #6200ea88;
}

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
