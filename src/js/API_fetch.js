import { savedLocationsEl } from "./elements";
import { cities } from "./storage";
import { renderAutocompleteList, renderCompactWeather } from "./UI_render";
import { applyListeners } from "./utils";

const API_KEY = "09891e249cd6454ab03104830260902";
const API_LANG = "de";
const API_FORECAST = "http://api.weatherapi.com/v1/forecast.json";
const API_SEARCH = "http://api.weatherapi.com/v1/search.json";

export async function fetchForecast(city) {
  const response = await fetch(
    `${API_FORECAST}?key=${API_KEY}&q=${city}&lang=${API_LANG}`,
  );

  if (!response.ok) {
    alert("Daten konnten nicht abgerufen werden!");
  } else {
    const forecast = await response.json();
    return forecast;
  }
}

export async function fetchCompact() {
  savedLocationsEl.innerHTML = "";

  for (const city of cities) {
    const forecast = await fetchForecast(city.id);
    renderCompactWeather(forecast, city.id);
    applyListeners();
  }
}

export async function fetchAutocomplete() {
  const API_CITY = document.getElementById("location-input").value;

  const response = await fetch(
    `${API_SEARCH}?key=${API_KEY}&q=${API_CITY}&lang=${API_LANG}`,
  );

  if (!response.ok) {
    alert("Daten konnten nicht abgerufen werden!");
  } else {
    const locations = await response.json();
    renderAutocompleteList(locations);
  }
}
