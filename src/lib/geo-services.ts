"use server";

import { use } from "react";
import { env } from "~/env.js";

interface GeocodeLocation {
  lat: number;
  lng: number;
}

interface GeocodeResult {
  geometry: {
    location: GeocodeLocation;
  };
}

interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}

function createGeocodeAddress(
  addressLine1: string,
  addressLine2 = "",
  zip: string,
  city: string,
  country = "",
) {
  const cleanLine1 = addressLine1.trim();
  const cleanLine2 = addressLine2 ? addressLine2.trim() : "";
  const cleanZip = zip.trim();
  const cleanCity = city.trim();
  const cleanCountry = country.trim();

  let address = cleanLine1;
  if (cleanLine2) {
    address += " " + cleanLine2;
  }
  address += ", " + cleanZip + " " + cleanCity;
  if (cleanCountry) {
    address += ", " + cleanCountry;
  }
  const urlEncodedAddress = encodeURIComponent(address);
  return urlEncodedAddress.replace(/%20/g, "+");
}

export async function getGeoCoordinates(
  addressLine1: string,
  addressLine2 = "",
  zip: string,
  city: string,
  country = "",
) {
  const address = createGeocodeAddress(
    addressLine1,
    addressLine2,
    zip,
    city,
    country,
  );
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${env.GOOGLE_MAPS_KEY}`;
  console.log("url:", url);
  const geoRes = await fetch(url, {
    headers: { "User-Agent": "bordzApp/1.0" },
  });

  if (!geoRes.ok) {
    throw new Error("Geocode failed");
  }
  const data = (await geoRes.json()) as GeocodeResponse;
  console.log("geoRes data:", data);
  if (data.results.length === 0) {
    throw new Error("No data");
  }
  const { lat, lng } = data.results[0]!.geometry.location;
  return { lat, lng };
}
