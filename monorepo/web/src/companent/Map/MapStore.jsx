import { useState, useEffect } from "react";
import "./Map.scss";
import {
  MapContainer as LeafMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

const MapStore = () => {
  // const [position, setPosition] = useState([36.8065, 10.1815]);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  // const [altitude, setAltitude] = useState(null);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     const watchId = navigator.geolocation.watchPosition(
  //       function (position) {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         setAltitude(position.coords.altitude);

  //         setPosition([position.coords.latitude, position.coords.longitude]);
  //       },
  //       function (error) {
  //         console.error(`Error getting location: ${error.message}`);
  //       }
  //     );

  //     // Cleanup the watchPosition when the component unmounts
  //     return () => {
  //       navigator.geolocation.clearWatch(watchId);
  //     };
  //   } else {
  //     console.log("Geolocation is not available in this browser.");
  //   }
  // }, []);

  return (
    <div className="map-lealet">
      <div>
        <h1>Nos Position</h1>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d564.9274060632197!2d10.090410702748773!3d36.777475977060156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3176c8f21a15%3A0x424adcd8ad1c9f2b!2sD%C3%A9p%C3%B4t%20transtu%20zahrouni!5e0!3m2!1sen!2stn!4v1699746663125!5m2!1sen!2stn"
          width="100%"
          height="550"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapStore;
{
  /* <LeafMap center={position} zoom={30} style={{ height: "50vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
          <br />
          Altitude:{" "}
          {altitude !== null && !isNaN(altitude)
            ? `${altitude} meters above sea level`
            : "N/A"}
        </Popup>
      </Marker>
    </LeafMap> */
}
