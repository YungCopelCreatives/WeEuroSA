// Enhanced Weather App with Gradient Earth Theme
// Developed by Cebo Mlotshwa

const cityCoordinates = [
  // South African cities
  {
    latitude: "-26.2041",
    longitude: "28.0473",
    city: "Johannesburg",
    country: "South Africa"
  },
  {
    latitude: "-33.9249",
    longitude: "18.4241",
    city: "Cape Town",
    country: "South Africa"
  },
  {
    latitude: "-29.8587",
    longitude: "31.0218",
    city: "Durban",
    country: "South Africa"
  },
  {
    latitude: "-25.7479",
    longitude: "28.2293",
    city: "Pretoria",
    country: "South Africa"
  },
  {
    latitude: "-29.1183",
    longitude: "26.2142",
    city: "Bloemfontein",
    country: "South Africa"
  },
  // European cities
  {
    latitude: "52.367",
    longitude: "4.904",
    city: "Amsterdam",
    country: "Netherlands"
  },
  {
    latitude: "39.933",
    longitude: "32.859",
    city: "Ankara",
    country: "Turkey"
  },
  {
    latitude: "56.134",
    longitude: "12.945",
    city: "Åstorp",
    country: "Sweden"
  },
  {
    latitude: "37.983",
    longitude: "23.727",
    city: "Athens",
    country: "Greece"
  },
  {
    latitude: "54.597",
    longitude: "-5.930",
    city: "Belfast",
    country: "Northern Ireland"
  },
  {
    latitude: "41.387",
    longitude: "2.168",
    city: "Barcelona",
    country: "Spain"
  },
  {
    latitude: "52.520",
    longitude: "13.405",
    city: "Berlin",
    country: "Germany"
  },
  {
    latitude: "46.948",
    longitude: "7.447",
    city: "Bern",
    country: "Switzerland"
  },
  {
    latitude: "43.263",
    longitude: "-2.935",
    city: "Bilbao",
    country: "Spain"
  },
  {
    latitude: "50.847",
    longitude: "4.357",
    city: "Brussels",
    country: "Belgium"
  },
  {
    latitude: "47.497",
    longitude: "19.040",
    city: "Bucharest",
    country: "Romania"
  },
  {
    latitude: "59.329",
    longitude: "18.068",
    city: "Budapest",
    country: "Hungary"
  },
  {
    latitude: "51.483",
    longitude: "-3.168",
    city: "Cardiff",
    country: "Wales"
  },
  {
    latitude: "50.937",
    longitude: "6.96",
    city: "Cologne",
    country: "Germany"
  },
  {
    latitude: "55.676",
    longitude: "12.568",
    city: "Copenhagen",
    country: "Denmark"
  },
  {
    latitude: "51.898",
    longitude: "-8.475",
    city: "Cork",
    country: "Ireland"
  },
  {
    latitude: "53.349",
    longitude: "-6.260",
    city: "Dublin",
    country: "Ireland"
  },
  {
    latitude: "55.953",
    longitude: "-3.188",
    city: "Edinburgh",
    country: "Scotland"
  },
  {
    latitude: "43.7696",
    longitude: "11.255",
    city: "Florence",
    country: "Italy"
  },
  {
    latitude: "50.110",
    longitude: "8.682",
    city: "Frankfurt",
    country: "Germany"
  },
  {
    latitude: "43.254",
    longitude: "6.637",
    city: "French Riviera",
    country: "France"
  },
  {
    latitude: "32.650",
    longitude: "-16.908",
    city: "Funchal",
    country: "Portugal"
  },
  {
    latitude: "36.140",
    longitude: "-5.353",
    city: "Gibraltar",
    country: "British Territory"
  },
  {
    latitude: "57.708",
    longitude: "11.974",
    city: "Gothenburg",
    country: "Sweden"
  },
  {
    latitude: "53.548",
    longitude: "9.987",
    city: "Hamburg",
    country: "Germany"
  },
  {
    latitude: "60.169",
    longitude: "24.938",
    city: "Helsinki",
    country: "Finland"
  },
  {
    latitude: "39.020",
    longitude: "1.482",
    city: "Ibiza",
    country: "Spain"
  },
  {
    latitude: "50.450",
    longitude: "30.523",
    city: "Kyiv",
    country: "Ukraine"
  },
  {
    latitude: "61.115",
    longitude: "10.466",
    city: "Lillehammer",
    country: "Norway"
  },
  {
    latitude: "38.722",
    longitude: "-9.139",
    city: "Lisbon",
    country: "Portugal"
  },
  {
    latitude: "51.507",
    longitude: "-0.127",
    city: "London",
    country: "England"
  },
  {
    latitude: "40.416",
    longitude: "-3.703",
    city: "Madrid",
    country: "Spain"
  },
  {
    latitude: "39.695",
    longitude: "3.017",
    city: "Mallorca",
    country: "Spain"
  },
  {
    latitude: "53.480",
    longitude: "-2.242",
    city: "Manchester",
    country: "England"
  },
  {
    latitude: "43.296",
    longitude: "5.369",
    city: "Marseille",
    country: "France"
  },
  {
    latitude: "27.760",
    longitude: "-15.586",
    city: "Maspalomas",
    country: "Spain"
  },
  {
    latitude: "45.464",
    longitude: "9.190",
    city: "Milan",
    country: "Italy"
  },
  {
    latitude: "48.135",
    longitude: "11.582",
    city: "Munich",
    country: "Germany"
  },
  {
    latitude: "40.851",
    longitude: "14.268",
    city: "Naples",
    country: "Italy"
  },
  {
    latitude: "43.034",
    longitude: "-2.417",
    city: "Oñati",
    country: "Spain"
  },
  {
    latitude: "59.913",
    longitude: "10.752",
    city: "Oslo",
    country: "Norway"
  },
  {
    latitude: "48.856",
    longitude: "2.352",
    city: "Paris",
    country: "France"
  },
  {
    latitude: "50.075",
    longitude: "14.437",
    city: "Prague",
    country: "Czech Republic"
  },
  {
    latitude: "64.146",
    longitude: "-21.942",
    city: "Reykjavík",
    country: "Iceland"
  },
  {
    latitude: "56.879",
    longitude: "24.603",
    city: "Riga",
    country: "Latvia"
  },
  {
    latitude: "41.902",
    longitude: "12.496",
    city: "Rome",
    country: "Italy"
  },
  {
    latitude: "39.453",
    longitude: "-31.127",
    city: "Santa Cruz das Flores",
    country: "Portugal"
  },
  {
    latitude: "28.463",
    longitude: "-16.251",
    city: "Santa Cruz de Tenerife",
    country: "Spain"
  },
  {
    latitude: "57.273",
    longitude: "-6.215",
    city: "Skye",
    country: "Scotland"
  },
  {
    latitude: "42.697",
    longitude: "23.321",
    city: "Sofia",
    country: "Bulgaria"
  },
  {
    latitude: "59.437",
    longitude: "24.753",
    city: "Tallinn",
    country: "Estonia"
  },
  {
    latitude: "48.208",
    longitude: "16.373",
    city: "Vienna",
    country: "Austria"
  },
  {
    latitude: "52.229",
    longitude: "21.012",
    city: "Warsaw",
    country: "Poland"
  },
  {
    latitude: "53.961",
    longitude: "-1.07",
    city: "York",
    country: "England"
  },
  {
    latitude: "47.376",
    longitude: "8.541",
    city: "Zurich",
    country: "Switzerland"
  }
];

const weathermap = {
  tsrain: "Thunderstorm with rain",
  snow: "Snow",
  rain: "Rain",
  fog: "Foggy",
  humid: "Relatively Humid",
  lightrain: "Light rain or showers",
  cloudy: "Cloudy",
  oshower: "Occasional showers",
  ishower: "Isolated showers",
  lightsnow: "Light snow",
  tstorm: "Thunderstorm",
  clear: "Clear",
  pcloudy: "Partly Cloudy",
  mcloudy: "Mostly Cloudy",
  rainsnow: "Mixed rain and snow"
};

const iconMap = {
  tsrain: "thunderstorm.svg",
  snow: "snow.svg",
  rain: "rain.svg",
  fog: "fog.svg",
  humid: "humidity.svg",
  lightrain: "light-rain.svg",
  cloudy: "cloudy.svg",
  oshower: "showers.svg",
  ishower: "showers.svg",
  lightsnow: "light-snow.svg",
  tstorm: "thunderstorm.svg",
  clear: "clear.svg",
  pcloudy: "partly-cloudy.svg",
  mcloudy: "mostly-cloudy.svg",
  rainsnow: "rain-snow.svg"
};

const options = {
  weekday: "long",
  month: "short",
  day: "2-digit",
  year: "numeric"
};

const time = new Date();
let meteoData;
const selectElement = document.querySelector("select");
const summaryTemp = document.querySelector("#summary-temp");
const locationEl = document.querySelector("#location");
const presentDay = document.querySelector("#present-day");
const presentTime = document.querySelector("#present-time");
const humidity = document.querySelector("#humid");
const wind = document.querySelector("#wind");
const tempHigh = document.querySelector("#highest");
const tempLow = document.querySelector("#lowest");
const weekWeather = document.querySelector("#weekly-weather");
const weatherPoint = document.querySelector("#weekly-weather-point");
const dailyContainer = document.querySelector(".data-details");
const main = document.querySelector(".main");
const weatherIcon = document.querySelector(".wicon");
const backgroundGradient = document.querySelector(".background-gradient");

// Initialize the app
function initApp() {
  updateDateTime();
  setInterval(updateDateTime, 60000); // Update time every minute
  populateLocationSelect();
  initGeolocation();
  addEventListeners();
  applyDynamicGradient();
  setInterval(() => {
    const selectedCityIndex = selectElement.selectedIndex - 1; // Adjust for the "Select a location" option
    if (selectedCityIndex >= 0) {
      updateData(cityCoordinates[selectedCityIndex]); // Update weather data every 5 minutes
    }
  }, 300000); // 300000 ms = 5 minutes
}

// Update date and time display
function updateDateTime() {
  const now = new Date();
  presentTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  presentDay.textContent = now.toLocaleDateString([], options);
}

// Apply dynamic gradient based on time of day
function applyDynamicGradient() {
  const hour = new Date().getHours();
  let gradient;
  
  if (hour >= 6 && hour < 12) {
    // Morning gradient (sunrise)
    gradient = "linear-gradient(135deg, #0a2463 0%, #3a7bd5 50%, #00d2ff 100%)";
  } else if (hour >= 12 && hour < 18) {
    // Daytime gradient
    gradient = "linear-gradient(135deg, #0a2463 0%, #1e88e5 50%, #00b894 100%)";
  } else if (hour >= 18 && hour < 21) {
    // Evening gradient (sunset)
    gradient = "linear-gradient(135deg, #0a2463 0%, #6a11cb 50%, #fc4a1a 100%)";
  } else {
    // Night gradient
    gradient = "linear-gradient(135deg, #000428 0%, #004e92 100%)";
  }
  
  backgroundGradient.style.background = gradient;
}

// Populate location select dropdown
function populateLocationSelect() {
  cityCoordinates.forEach((location, i) => {
    const option = document.createElement("option");
    option.text = `${location.city}, ${location.country}`;
    option.value = `${location.city} ${i}`;
    selectElement.add(option);
  });
}

// Add event listeners
function addEventListeners() {
  selectElement.addEventListener("change", handleLocationSelect);
  document.querySelector(".page").addEventListener("click", () => {
    location.reload();
    showLoadingAnimation();
  });
  window.addEventListener("online", initGeolocation);
}

// Handle location selection
function handleLocationSelect(e) {
  dailyContainer.innerHTML = "";
  dailyContainer.classList.remove("added");
  showLoadingAnimation("Getting weather data");
  
  const arr = e.target.value.slice().split(" ");
  const num = +arr[arr.length - 1];
  const cityObj = cityCoordinates[num];
  
  updateData(cityObj, true);
}

// Initialize geolocation
function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const { latitude, longitude } = success.coords;
        const city = {
          latitude: +latitude.toFixed(3),
          longitude: +longitude.toFixed(3),
        };
        userLocationGetData(city);
      },
      (error) => {
        dailyContainer.innerHTML = "";
        dailyContainer.classList.remove("added");
        dailyContainer.textContent = `Location access denied. Please select a location manually or enable location services.`;
        console.error(`Geolocation error: ${error.message}`);
      }
    );
  } else {
    dailyContainer.textContent = `Geolocation is not supported by your browser. Please select a location manually.`;
  }
}

// Show loading animation
function showLoadingAnimation(text = "Loading") {
  dailyContainer.innerHTML = `
    <div class="loading-container">
      <div class="loading-text">${text}</div>
      <div class="dot-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`;
}

// Get city data from API
async function getCityData(city, product) {
  try {
    const res = await fetch(
      `https://www.7timer.info/bin/api.pl?lon=${city.longitude}&lat=${city.latitude}&product=${product}&unit=metric&output=json`
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const text = await res.text();
    
    // Try to clean malformed JSON if needed
    const cleanedText = text
      .replace(/,\s*}/g, '}')  // Remove trailing commas
      .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
    
    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse JSON:', cleanedText);
      throw new Error(`Invalid JSON received from API: ${parseError.message}`);
    }
    
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw new Error(`Failed to get weather data: ${error.message}`);
  }
}

// Get user location data
async function userLocationGetData(city) {
  dailyContainer.innerHTML = "";
  dailyContainer.classList.remove("added");
  showLoadingAnimation("Detecting your location");
  
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${city.latitude}&lon=${city.longitude}`
    );
    if (!res.ok) throw new Error("Location service unavailable");
    
    const data = await res.json();
    if (!data.address) throw new Error("Could not determine location");
    
    await updateData({
      ...city,
      city: data.address.city || data.address.town || data.address.village || "Current Location",
      country: data.address.country
    });
    
    dailyContainer.innerHTML = "";
  } catch (error) {
    locationEl.textContent = `Current Location`;
    console.error(`Location error: ${error.message}`);
  }
}

// Update all weather data
async function updateData(cityObj, daily = false) {
  try {
    showLoadingAnimation("Fetching weather data");
    
    const [meteoData, civilLightData, civilData] = await Promise.all([
      getCityData(cityObj, "meteo"),
      getCityData(cityObj, "civillight"),
      getCityData(cityObj, "civil"),
    ]);
    
    updateSummary(meteoData, cityObj);
    updateWeatherStats(meteoData, civilLightData, civilData);
    
    if (daily) {
      createDailyForecast(civilLightData);
    }
    
  } catch (error) {
    dailyContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${error.message}</p>
      </div>
    `;
    console.error(error);
  }
}

// Update summary weather information
function updateSummary(data, cityObj) {
  const currentWeather = data.dataseries[0];
  const weatherCode = currentWeather.weather;
  const weatherDescription = weathermap[weatherCode] || "Unknown weather condition";
  
  // Update main weather display
  summaryTemp.textContent = `${currentWeather.temp2m}°`;
  locationEl.textContent = `${cityObj.city}, ${cityObj.country}`;
  
  // Update weather icon
  const iconName = iconMap[weatherCode] || "clear.svg";
  weatherIcon.src = `./images/${iconName}`;
  weatherIcon.alt = weatherDescription;
  
  // Animate weather icon change
  weatherIcon.style.opacity = 0;
  setTimeout(() => {
    weatherIcon.style.opacity = 1;
    weatherIcon.style.transform = "scale(1.1)";
    setTimeout(() => {
      weatherIcon.style.transform = "scale(1)";
    }, 300);
  }, 200);
}

// Update weather statistics
function updateWeatherStats(meteoData, civilLightData, civilData) {
  const currentWeather = meteoData.dataseries[0];
  const todayForecast = civilLightData.dataseries[0];
  
  // Update current weather stats
  humidity.textContent = `${currentWeather.rh2m}%`;
  wind.textContent = `${currentWeather.wind10m.speed}m/s | ${currentWeather.wind10m.direction}°`;
  
  // Update temperature range
  tempHigh.textContent = `${todayForecast.temp2m.max}°C`;
  tempLow.textContent = `${todayForecast.temp2m.min}°C`;
  
  // Update weekly weather summary
  weekWeather.textContent = weathermap[todayForecast.weather] || "Various";
  weatherPoint.textContent = `${currentWeather.prec_amount}mm`;
}

// Create daily forecast
function createDailyForecast(data) {
  dailyContainer.innerHTML = "";
  dailyContainer.classList.add("added");
  
  // Limit to 7 days forecast
  const forecastDays = data.dataseries.slice(0, 7);
  
  forecastDays.forEach(day => {
    const date = new Date(day.date);
    const dayElement = document.createElement("div");
    dayElement.className = "daily-data";
    dayElement.innerHTML = `
      <div class="day-name">${date.toLocaleDateString([], { weekday: 'short' })}</div>
      <div id="img">
        <img src="./images/${iconMap[day.weather] || 'clear.svg'}" alt="${weathermap[day.weather] || 'Unknown'}">
      </div>
      <div id="div">
        <span class="temp-max">${day.temp2m.max}°</span>
        <span class="temp-min">${day.temp2m.min}°</span>
      </div>
      <div class="weather-desc">${weathermap[day.weather] || 'Unknown'}</div>
    `;
    
    dailyContainer.appendChild(dayElement);
  });
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);

async function getCityDataWithRetry(city, product, retries = 3) {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await getCityData(city, product);
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Wait before retry
    }
  }
  
  throw lastError; // Throw the last error after all retries
}