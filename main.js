import { applyEventListeners } from "./src/js/utils";
import { loadFromLocalStorage } from "./src/js/storage";
import.meta.env.VITE_API_KEY;

loadFromLocalStorage();
applyEventListeners();
console.log("API KEY:", import.meta.env.VITE_API_KEY);
