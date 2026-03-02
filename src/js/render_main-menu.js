import { rootElement } from "../../main";
import { fetchForecast } from "./API_fetch";
import { applyAutocomplete } from "./autocomplete";
import { renderLoading } from "./loading";
import { cities } from "./storage";
import { getDetailWeather, showDeletButton } from "./utils";
import { getConditionImagePath } from "./weather_conditions";

export async function loadMainMenu() {
  renderLoading();
  await renderMainMenu();
}

async function renderMainMenu() {
  rootElement.classList.remove("show-background");

  rootElement.innerHTML = `
  <div class="main-menu-container">
    ${getHeadHtml()}
    ${await getSavedLocationHtml()}
    ${getSearchbarHtml()}
  </div>
  `;
  applyDetailView();
  applyAutocomplete();
  applyActionButton();
}

function getHeadHtml() {
  return `
    <section class="header-bar">
        <h1 class="header-bar__title">Wetter</h1>
        <button id="header-bar__action-button" class="header-bar__action-button">•••</button>
    </section>
  `;
}

async function getSavedLocationHtml() {
  const citiesElements = [];

  for (const city of cities) {
    const forecastData = await fetchForecast(city.id);
    const { location, current, forecast } = forecastData;
    const currentDay = forecast.forecastday[0];

    const conditionImage = getConditionImagePath(
      current.condition.code,
      current.is_day !== 1,
    );

    const savedLocationHtml = `
    <div class="saved-locations-list__item" data-id="${city.id}">
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
        <div class="location-card show-background" style="--condition-image: url(${conditionImage})">
          <div class="flex-space">
            <div>
              <p class="location-card__name">${location.name}</p>
              <span class="location-card__time"
                >${location.localtime.slice(10)}</span
              >
            </div>
            <span class="location-card__temp"
              >${Math.floor(current.temp_c)}°</span
            >
          </div>
          <div class="flex-space">
            <span class="location-card__condition"
              >${current.condition.text}</span
            >
            <div class="location-card__highLow">
              <span class="location-card__highLow--high"
                >H: ${Math.floor(currentDay.day.maxtemp_c)}°</span
              >
              <span class="location-card__highLow--low"
                >T: ${Math.floor(currentDay.day.mintemp_c)}°</span
              >
            </div>
          </div>
        </div>
      </div>
      `;
    citiesElements.push(savedLocationHtml);
  }

  const locationListHtml = citiesElements.join("");

  return `
  <section id="saved-locations-list" class="saved-locations-list">${locationListHtml}</section>
  `;
}

function getSearchbarHtml() {
  return `
    <section class="search-panel">
        <ul
          id="autocomplete-list" class="search-panel__autocomplete-list search-panel__autocomplete-list--hidden">
        </ul>
        <div class="search-panel__container-bar">
          <svg class="search-panel__icon" height="20px" viewBox="0 0 24 24">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
              ></path>
            </g>
          </svg>
          <input
            id="location-input"
            class="search-panel__input"
            type="text"
            placeholder="Stadt eingeben..."
          />
        </div>
        <button
          id="search-panel__return-button"
          class="search-panel__return-button search-panel__return-button--hidden">←
        </button>
    </section>
  `;
}

function applyActionButton() {
  const actionButton = document.getElementById("header-bar__action-button");
  actionButton.addEventListener("click", showDeletButton);
}

function applyDetailView() {
  const cities = document.querySelectorAll(".location-card");

  cities.forEach((city) => {
    city.addEventListener("click", getDetailWeather);
  });
}
