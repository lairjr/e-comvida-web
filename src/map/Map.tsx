import React from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import { usePosition } from "../common/hooks/usePosition";

function Map() {
  const { latitude, longitude } = usePosition();

  return (
    <div
      style={{
        height: "300px", // Height is controlled by the flex box, it needs to have some value due google maps
        width: "100%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY || "" }}
        center={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  );
}

export default Map;
