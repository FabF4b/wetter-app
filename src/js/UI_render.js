import { fetchForecast } from "./API_fetch";
import { detailCityEl, savedLocationsEl, autocompleteListEl } from "./elements";
import { setCurrentCity } from "./utils";
import { cities, saveLocation } from "./storage";

export function renderAutocompleteList(suggestions) {
  autocompleteListEl.innerHTML = "";
  suggestions.forEach((suggestion) => {
    const suggestionItemEl = document.createElement("li");
    suggestionItemEl.dataset.id = suggestion.url;

    const city = suggestionItemEl.dataset.id;

    suggestionItemEl.textContent =
      suggestion.name + ", " + suggestion.region + ", " + suggestion.country;
    suggestionItemEl.classList.add("search-panel__autocomplete-item");
    autocompleteListEl.appendChild(suggestionItemEl);

    suggestionItemEl.addEventListener("click", () => renderDetailWeather(city));
  });
}

export function renderCompactWeather(forecast, cityId) {
  const savedCityDiv = document.createElement("div");
  savedCityDiv.classList.add("saved-locations-list__item");
  savedCityDiv.dataset.id = cityId;

  savedCityDiv.innerHTML = `
  <svg
            class="saved-locations-list__delete-button saved-locations-list__delete-button--hidden"
            height="32px"
            version="1.1"
            viewBox="0 0 32 32"
            xml:space="preserve"
          >
            <g></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <style type="text/css">
                .st0 {
                  fill: none;
                  stroke-width: 1.5;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                }
              </style>
              <circle class="st0" cx="16" cy="16" r="13"></circle>
              <line class="st0" x1="13.2" y1="13.2" x2="18.8" y2="18.8"></line>
              <line class="st0" x1="13.2" y1="18.8" x2="18.8" y2="13.2"></line>
            </g>
          </svg>
          <div class="location-compact">
            <div class="flex-space">
            <div>
            <p class="location-compact__name">${forecast.location.name}</p>
            <span class="location-compact__time">${forecast.location.localtime.slice(10)}</span>
              </div>
              <span class="location-compact__temp">${Math.floor(forecast.current.temp_c)}°</span>
            </div>
            <div class="flex-space">
              <span class="location-compact__condition">${forecast.current.condition.text}</span>
              <div class="location-compact__highLow">
                <span class="location-compact__highLow--high">H: ${Math.floor(forecast.forecast.forecastday[0].day.maxtemp_c)}°</span>
                <span class="location-compact__highLow--low">T: ${Math.floor(forecast.forecast.forecastday[0].day.mintemp_c)}°</span>
              </div>
            </div>
          </div>
      
    `;
  savedLocationsEl.appendChild(savedCityDiv);
}

export async function renderDetailWeather(city) {
  setCurrentCity(city);

  const forecast = await fetchForecast(city);
  let detailWeatherCard = "";

  detailWeatherCard += `
    <button
        id="location-detail__save-button"
        class="location-detail__save-button">+
      </button>
    <p class="location-detail__name">${forecast.location.name}</p>
    <p class="location-detail__temp">${Math.floor(forecast.current.temp_c)}°</p>
    <p class="location-detail__condition">${forecast.current.condition.text}</p>
    <div>
        <span class="location-detail__high">H:${Math.floor(forecast.forecast.forecastday[0].day.maxtemp_c)}°</span>
        <span class="location-detail__low">T:${Math.floor(forecast.forecast.forecastday[0].day.mintemp_c)}°</span>
      </div>
  `;
  detailCityEl.innerHTML = detailWeatherCard;
  detailCityEl.classList.remove("location-detail--hidden");

  const saveButtonEl = document.getElementById("location-detail__save-button");
  saveButtonEl.addEventListener("click", saveLocation);

  const alreadySaved = cities.find((savedCity) => savedCity.id === city);

  if (alreadySaved) {
    saveButtonEl.classList.toggle("location-detail__save-button--hidden");
  }
}
