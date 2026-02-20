import { getCurrentCity } from "./utils";
import { fetchCompact } from "./API_fetch";

export const STORAGE_KEY = "weather-app";
export let cities = [];

export function saveLocation() {
  const currentCity = getCurrentCity();

  const alreadySaved = cities.find((city) => city.id === currentCity);
  if (alreadySaved) return;

  const city = {
    id: currentCity,
  };
  cities.push(city);

  fetchCompact();
  saveToLocalStorage();
}

export function deleteLocation(click) {
  const selectedLocation = click.target.closest(".saved-locations-list__item")
    .dataset.id;

  if (!selectedLocation) return;

  const id = selectedLocation;
  cities = cities.filter((city) => city.id !== id);

  saveToLocalStorage();
  loadFromLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export function loadFromLocalStorage() {
  const savedLocations = localStorage.getItem(STORAGE_KEY);

  if (savedLocations) {
    cities = JSON.parse(savedLocations);
  }

  fetchCompact();
}
