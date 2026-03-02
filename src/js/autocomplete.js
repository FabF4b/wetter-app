import { fetchAutocomplete } from "./API_fetch";
import { loadDetailView } from "./render_detail-view";
import { loadMainMenu } from "./render_main-menu";

export function autocomplete(input) {
  const city = input.target.value;
  const autocompleteListEl = document.getElementById("autocomplete-list");
  const headerbarEl = document.querySelector(".header-bar");
  const savedListEl = document.querySelector(".saved-locations-list");
  const returnButtonEl = document.getElementById("search-panel__return-button");

  if (city.length >= 2) {
    fetchAutocomplete(city);
    autocompleteListEl.classList.remove(
      "search-panel__autocomplete-list--hidden",
      headerbarEl.classList.add("header-bar--blurred"),
      savedListEl.classList.add("saved-locations-list--blurred"),
      returnButtonEl.classList.remove("search-panel__return-button--hidden"),
      returnButtonEl.addEventListener("click", returnButton),
    );
  } else {
    autocompleteListEl.textContent = "";
  }
}

export function renderAutocompleteList(suggestions) {
  const autocompleteListEl = document.getElementById("autocomplete-list");
  autocompleteListEl.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const suggestionItemEl = document.createElement("li");
    suggestionItemEl.dataset.id = suggestion.url;

    const city = suggestionItemEl.dataset.id;

    suggestionItemEl.textContent =
      suggestion.name + ", " + suggestion.region + ", " + suggestion.country;
    suggestionItemEl.classList.add("search-panel__autocomplete-item");
    autocompleteListEl.appendChild(suggestionItemEl);

    suggestionItemEl.addEventListener("click", () => loadDetailView(city));
  });
}

export function applyAutocomplete() {
  const cityInputEl = document.getElementById("location-input");
  cityInputEl.addEventListener("input", autocomplete);
}

function returnButton() {
  const returnButtonEl = document.getElementById("search-panel__return-button");
  const autocompleteListEl = document.getElementById("autocomplete-list");
  const headerbarEl = document.querySelector(".header-bar");
  const savedListEl = document.querySelector(".saved-locations-list");
  const loactionInputEl = document.getElementById("location-input");

  autocompleteListEl.classList.add("search-panel__autocomplete-list--hidden");
  headerbarEl.classList.remove("header-bar--blurred");
  savedListEl.classList.remove("saved-locations-list--blurred");
  loactionInputEl.textContent = "";
  returnButtonEl.addEventListener("click", loadMainMenu);
}
