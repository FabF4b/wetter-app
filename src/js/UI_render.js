import { fetchForecast } from "./API_fetch";
import {
  detailCityEl,
  savedLocationsEl,
  autocompleteListEl,
  actionButtonEl,
} from "./elements";
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
  actionButtonEl.textContent = "←";
  detailWeatherCard += `
        <button
          id="detail-view__save-button"
          class="detail-view__save-button"
          >
          +
        </button>
        <div class="head">
            <p class="head__city">${forecast.location.name}</p>
            <p class="head__temp">${Math.floor(forecast.current.temp_c)}°</p>
            <p class="head__feels">Gefühlt: ${Math.floor(forecast.current.feelslike_c)}°</p>
            <div>
              <span class="head__day-high">H: ${Math.floor(forecast.forecast.forecastday[0].day.maxtemp_c)}°</span
              ><span class="head__day-low">T: ${Math.floor(forecast.forecast.forecastday[0].day.mintemp_c)}°</span>
            </div>
          </div>
          <section class="detail-view__current-weather">
          <div class="current-weather">
            <p class="current-weather__condition-text">
              Aktuell ${forecast.current.condition.text}. Über den Tag ${forecast.forecast.forecastday[0].day.condition.text}
            </p>
            <ul class="current-weather__forecast-list">
              <li>
                <p>12h</p>
                <p>☀️</p>
                <p>10*</p>
              </li>

              <li>
                <p>12h</p>
                <p>☀️</p>
                <p>10*</p>
              </li>

              <li>
                <p>12h</p>
                <p>☀️</p>
                <p>10*</p>
              </li>

              <li>
                <p>12h</p>
                <p>☀️</p>
                <p>10*</p>
              </li>

              <li>
                <p>12h</p>
                <p>☀️</p>
                <p>10*</p>
              </li>

              <li>
                <p>12h</p>
                <p>☀️</p>
                <p>10*</p>
              </li>
            </ul>
          </div>
        </section>
        <section class="detail-view__forecast-weather">
          <div class="forecast-weather">
            <p class="forecast-weather__title">7 Tage Vorhersage</p>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
            <div class="forecast-weather__days">
              <p>heute</p>
              <p>☀️</p>
              <p>15*</p>
              <p>----</p>
              <p>20*</p>
            </div>
          </div>
        </section>
        <section class="detail-view__more-weather">
          <div class="more-weather">
            <div class="more-weather__item">1</div>
            <div class="more-weather__item">2</div>
            <div class="more-weather__item">3</div>
            <div class="more-weather__item">4</div>
            <div class="more-weather__item">5</div>
            <div class="more-weather__item">6</div>
          </div>
        </section>      
  `;
  detailCityEl.innerHTML = detailWeatherCard;
  detailCityEl.classList.remove("detail-view--hidden");

  const saveButtonEl = document.getElementById("detail-view__save-button");
  saveButtonEl.addEventListener("click", saveLocation);

  const alreadySaved = cities.find((savedCity) => savedCity.id === city);

  if (alreadySaved) {
    saveButtonEl.classList.add("detail-view__save-button--hidden");
  }
}
