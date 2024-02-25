"use client";

import type { PropsWithChildren } from "react";

import { Icon, type LatLngExpression, type LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";

import { TILE_SERVER_URL } from "../constants";

type MapProps = PropsWithChildren<{
  areas?: LatLngExpression[][];
  points: { coords: LatLngLiteral; name: string };
  position: [lat: number, lng: number];
  zoom: number;
}>;

export default function Map({ areas, points, position, zoom }: MapProps) {
  const icon = new Icon({
    iconSize: [20, 20],
    iconUrl:
      "https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png",
  });
  console.log(areas?.length);
  return (
    <MapContainer
      attributionControl={false}
      center={position}
      // minZoom={30}
      scrollWheelZoom={true}
      style={{ height: "100dvh" }}
      zoom={zoom}
    >
      <TileLayer url={TILE_SERVER_URL} />
      {areas.map((coords, i) => (
        <Polygon color="#ccc" fill={false} key={i} positions={coords} />
      ))}
      {/* <Polygon pathOptions={{ color: "red" }} positions={areas[0]} /> */}
      {/* {points.map((coords, i) => (
        <Marker icon={icon} key={i} position={coords} />
      ))} */}
      {/* <Marker icon={icon} position={points.coords} /> */}
    </MapContainer>
  );
}
