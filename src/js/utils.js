import { loadDetailView } from "./render_detail-view";
import { cities, deleteLocation } from "./storage";

export let currentCity = null;

export function setCurrentCity(city) {
  currentCity = city;
}

export function getCurrentCity() {
  return currentCity;
}

export function get24HoursFromNow(forecast, lastUpdatedEpoch) {
  const todaysForecast = forecast[0].hour;
  const tomorrowsForecast = forecast[1].hour;

  const newForecast = [];

  const firstFutureTimeIndex = todaysForecast.findIndex(
    (hour) => hour.time_epoch > lastUpdatedEpoch,
  );

  for (let i = firstFutureTimeIndex - 1; i < todaysForecast.length; i++) {
    newForecast.push(todaysForecast[i]);
  }

  let tomorrowIndex = 0;

  while (newForecast.length < 24) {
    newForecast.push(tomorrowsForecast[tomorrowIndex]);
    tomorrowIndex++;
  }

  return newForecast;
}

export function getWeekDay(date) {
  const weekDate = new Date(date);
  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  return days[weekDate.getDay()];
}

export function getDetailWeather(click) {
  const selectedLocation = click.target.closest(".saved-locations-list__item")
    .dataset.id;
  loadDetailView(selectedLocation);
}

export function showDeletButton() {
  const deleteButtonEl = document.querySelectorAll(
    ".saved-locations-list__delete-button",
  );
  deleteButtonEl.forEach((button) => {
    button.classList.toggle("saved-locations-list__delete-button--hidden");
    button.addEventListener("click", deleteLocation);
  });
}

export function hideSaveButtonCheck() {
  const currentCity = getCurrentCity();

  const alreadySaved = cities.find((city) => city.id === currentCity);
  if (alreadySaved) {
    const saveButtonEl = document.querySelector(".head__save-button");
    saveButtonEl.classList.add("head__save-button--hidden");
  }
}

export function format24HourTime(time) {
  const isAM = time.includes("AM");

  const timeWithoutSuffix = time.split(" ")[0];

  if (isAM) {
    return timeWithoutSuffix + " Uhr";
  }

  const [hour, minutes] = timeWithoutSuffix.split(":");
  const newHour = Number(hour) + 12;

  return newHour + ":" + minutes + " Uhr";
}

export function formatTime(time) {
  const newTime = time.split(" ")[1].split(":")[0];
  return newTime + " Uhr";
}
