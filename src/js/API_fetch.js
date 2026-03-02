import { renderAutocompleteList } from "./autocomplete";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_LANG = "de";
export const API_FORECAST = "https://api.weatherapi.com/v1/forecast.json";
const API_SEARCH = "https://api.weatherapi.com/v1/search.json";

export async function fetchForecast(city) {
  const response = await fetch(
    `${API_FORECAST}?key=${API_KEY}&q=${city}&lang=${API_LANG}&days=3`,
  );

  if (!response.ok) {
    alert("Daten konnten nicht abgerufen werden!");
  } else {
    const forecastData = await response.json();
    return forecastData;
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
