import { TOMTOM_API_KEY } from "../config";
export function formatPrice(
  value = 0,
  opts = { locale: "en-IN", currency: "INR" }
) {
  const { locale, currency } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export function getGeolocation(geoOptions) {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, geoOptions);
    });
  } else {
    throw new Error("Geolocation is not supported by this browser.");
  }
}

export async function getAdressFromCoords(latitude, longitude) {
  const url = await fetch(
    `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${TOMTOM_API_KEY}&radius=100`
  );
  try {
    const data = await url.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export function OrderIdSnip(id) {
  return id.slice(0, 8);
}
