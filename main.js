import { loadMainMenu } from "./src/js/render_main-menu";
import { loadFromLocalStorage } from "./src/js/storage";
import.meta.env.VITE_API_KEY;
import "/src/scss/main.scss";

export const rootElement = document.getElementById("app");

loadFromLocalStorage();
