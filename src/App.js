import React from "react";
import Map from "./map.js";



const dataSrc1 = [
  {
    lng: 76.2711,
    lat:10.8505,
    direction: 30
  },
  {
    lng: 78.1198,
    lat: 9.9252,
    direction: 60
  },
  {
    lng: 78.7047,
    lat: 10.7905,
    direction: 90
  }
  
];
const dataSrc2 = [
  {
    lng: 79.4985,
    lat:11.9436,
    direction: 36
  },
  {
    lng:  80.2707,
    lat: 13.0827,
    direction: 40
  },
  {
    lng: 79.4985,
    lat: 13.0827,
    direction: 100
  }
];
const dataSrc = [dataSrc1, dataSrc2];

export default function App() {
  return <Map dataSrc={dataSrc} />;
}
