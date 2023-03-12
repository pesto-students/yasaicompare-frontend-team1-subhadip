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
    `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${process.env.TOM_TOM_API}&radius=100`
  );
  try {
    const data = await url.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
