import React from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";

function Map() {
  return (
    <div
      style={{
        height: "300px", // Height is controlled by the flex box, it needs to have some value due google maps
        width: "100%",
      }}
    >
      <GoogleMapReact
        defaultCenter={{
          lat: 59.95,
          lng: 30.33,
        }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  );
}

export default Map;
