import { fetchAutocomplete } from "/src/js/API_fetch.js";
import {
  actionButtonEl,
  autocompleteListEl,
  detailCityEl,
  locationInputEl,
  returnButtonEl,
  savedLocationsEl,
} from "./elements";
import "/src/scss/main.scss";
import { deleteLocation } from "./storage";
import { renderDetailWeather } from "./UI_render";

export let currentCity = null;

export function setCurrentCity(city) {
  currentCity = city;
}

export function getCurrentCity() {
  return currentCity;
}

function autocomplete(input) {
  const city = input.target.value;

  if (city.length >= 2) {
    fetchAutocomplete(city);
    autocompleteListEl.classList.remove(
      "search-panel__autocomplete-list--hidden",
    );
    returnButtonEl.classList.remove("search-panel__return-button--hidden");
    savedLocationsEl.classList.add("saved-locations-list--blurred");
  }
  autocompleteListEl.textContent = "";
}

export function clearSearchAutocomplete() {
  autocompleteListEl.textContent = "";
  locationInputEl.value = "";
  autocompleteListEl.classList.add("search-panel__autocomplete-list--hidden");
  returnButtonEl.classList.add("search-panel__return-button--hidden");
  savedLocationsEl.classList.remove("saved-locations-list--blurred");
}

export function applyEventListeners() {
  returnButtonEl.addEventListener("click", clearSearchAutocomplete);
  locationInputEl.addEventListener("input", autocomplete);
}

export function actionButton() {
  if (detailCityEl.classList.contains("location-detail--hidden")) {
    const deleteButtonEl = document.querySelectorAll(
      ".saved-locations-list__delete-button",
    );
    deleteButtonEl.forEach((button) => {
      button.classList.toggle("saved-locations-list__delete-button--hidden");
      button.addEventListener("click", deleteLocation);
    });
  } else {
    detailCityEl.classList.add("location-detail--hidden");
    clearSearchAutocomplete();
  }
}

export function applyListeners() {
  actionButtonEl.addEventListener("click", actionButton);

  const savedLocationsEl = document.querySelectorAll(".location-compact");
  savedLocationsEl.forEach((location) => {
    location.addEventListener("click", getDetailWeather);
  });
}

export function getDetailWeather(click) {
  const selectedLocation = click.target.closest(".saved-locations-list__item")
    .dataset.id;
  renderDetailWeather(selectedLocation);
}
