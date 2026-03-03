import { rootElement } from "../../main";
import { fetchForecast } from "./API_fetch";
import { renderLoading } from "./loading";
import { loadMainMenu } from "./render_main-menu";
import { saveLocation } from "./storage";
import {
  format24HourTime,
  formatTime,
  get24HoursFromNow,
  getWeekDay,
  hideSaveButtonCheck,
  setCurrentCity,
} from "./utils";
import { getConditionImagePath } from "./weather_conditions";

export async function loadDetailView(city) {
  renderLoading(city);
  const forecastData = await fetchForecast(city);
  setCurrentCity(city);
  renderDetailView(forecastData);
  hideSaveButtonCheck();
}

function renderDetailView(forecastData) {
  const { location, current, forecast } = forecastData;
  const currentDay = forecast.forecastday[0];

  const conditionImage = getConditionImagePath(
    current.condition.code,
    current.is_day !== 1,
  );

  if (conditionImage) {
    rootElement.style = `--condition-image: url(${conditionImage})`;
    rootElement.classList.add("show-background");
  }

  rootElement.innerHTML =
    getHeaderHtml(
      location.name,
      current.temp_c,
      current.feelslike_c,
      currentDay.day.maxtemp_c,
      currentDay.day.mintemp_c,
    ) +
    getCurrentHtml(
      current.condition.text,
      currentDay.day.condition.text,
      forecast.forecastday,
      current.last_updated_epoch,
    ) +
    getForecastHtml(forecast.forecastday) +
    getMoreWeatherHtml(forecast.forecastday[0]);
  applyButtons();
}

function getHeaderHtml(location, currentTemp, feelslike, maxTemp, minTemp) {
  return `
        <section class="head">
            <button class="head__save-button">♥️</button>
            <button class="head__action-button">•••</button>
            <h2 class="head__city">${location}</h2>
            <h1 class="head__temp">${Math.floor(currentTemp)}°</h1>
            <p class="head__feels">Gefühlt: ${Math.floor(feelslike)}°</p>
            <div>
              <span class="head__day-high">H: ${Math.floor(maxTemp)}°</span>
              <span class="head__day-low">T: ${Math.floor(minTemp)}°</span>
            </div>
        </section>
    `;
}

function getCurrentHtml(
  currentCondition,
  condition,
  forecastdays,
  lastUpdatedEpoch,
) {
  const hourlyForecastElements = get24HoursFromNow(
    forecastdays,
    lastUpdatedEpoch,
  )
    .filter((el) => el !== undefined)
    .map(
      (hour, i) => `
        <li class="current-weather__forecast-list--item">
            <p class="current-weather__time">${i === 0 ? "Jetzt" : formatTime(hour.time)}</p>
            <img 
              src="https:${hour.condition.icon}"
              alt=""
              class="current-weather__icon"/>
            <p class="current-weather__temp">${Math.floor(hour.temp_c)}°</p>
        </li>
        `,
    );

  const hourlyForecastHtml = hourlyForecastElements.join("");

  return `
           <section class="current-weather">
              <p class="current-weather__condition-text">
                  Aktuell ${currentCondition}. Über den Tag ${condition}.
                </p>
              <ul class="current-weather__forecast-list">
                  ${hourlyForecastHtml}
                </ul>
            </section>
    `;
}

function getForecastHtml(forecast) {
  const dailyForecastElements = forecast.map(
    (forecastDay, i) => `
        <div class="forecast-weather__days">
            <p>${i === 0 ? "Heute" : getWeekDay(forecastDay.date)}</p>
            <img 
                src="https:${forecastDay.day.condition.icon}"
                alt=""
                class="forecast-weather__icon"/>
            <p>${Math.floor(forecastDay.day.mintemp_c)}°</p>
            <p>――</p>
            <p>${Math.floor(forecastDay.day.maxtemp_c)}°</p>
        </div>
        `,
  );

  const dailyForecastHtml = dailyForecastElements.join("");

  return `
            <section class="forecast-weather">
                <p class="forecast-weather__title">3 Tage Vorhersage</p>
                ${dailyForecastHtml}
            </section>
    `;
}

function getMoreWeatherHtml(forecast) {
  return `
            <section class="more-weather">
                  <div class="more-weather__item">
                      <p class="more-weather__item-title">Sonnenaufgang</p> 
                      <p class="more-weather__item-value">${format24HourTime(forecast.astro.sunrise)}</p>
                  </div>
                  <div class="more-weather__item">
                      <p class="more-weather__item-title">Sonnenuntergang</p>
                      <p class="more-weather__item-value">${format24HourTime(forecast.astro.sunset)}</p> 
                  </div>
                  <div class="more-weather__item">
                      <p class="more-weather__item-title">Niederschlag</p>
                      <p class="more-weather__item-value">${forecast.day.daily_chance_of_rain} %</p> 
                  </div>
                  <div class="more-weather__item">
                      <p class="more-weather__item-title">Luftfeuchtigkeit</p>
                      <p class="more-weather__item-value">${forecast.day.avghumidity} %</p>
                  </div>
                  <div class="more-weather__item">
                      <p class="more-weather__item-title">UV Index</p>
                      <p class="more-weather__item-value">${forecast.day.uv}</p> 
                  </div>
                  <div class="more-weather__item">
                      <p class="more-weather__item-title">Windstärke</p>
                      <p class="more-weather__item-value">${forecast.day.maxwind_kph} km/h</p> 
                  </div>
              </section>
    `;
}

function applyButtons() {
  const saveButtonEl = document.querySelector(".head__save-button");
  saveButtonEl.addEventListener("click", () => {
    saveButtonEl.classList.toggle("head__save-button--saved");
  });

  const actionButtonEl = document.querySelector(".head__action-button");
  actionButtonEl.addEventListener("click", () => {
    if (saveButtonEl.classList.contains("head__save-button--saved")) {
      (saveLocation(), loadMainMenu());
    } else {
      loadMainMenu();
    }
  });
}
