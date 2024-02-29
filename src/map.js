import React, {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef
} from "react";
import ReactMapboxGl, {
  Image,
  GeoJSONLayer,
  MapContext
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMotion } from "./useMotion.js";
import van from "./van_0.png";
const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXJhdmluZHR3aWxpZ2h0IiwiYSI6ImNsdDZxMXJmYzA1MGQybW8zZHN2NmMwMXAifQ.Cy65IvjJ4kXEoCFWORNWMA"
});
const center = [30, 60];
const step = 5;
const inter = [
  "interpolate",
  ["linear"],
  ["to-number", ["get", "direction"]],
  0,
  0,
  180,
  360
];
const layout = {
  "icon-image": "vehicle",
  "icon-rotate": inter,
  "icon-size": 0.35,
  "icon-ignore-placement": true,
  "icon-allow-overlap": true
};
function getFeatures(data) {
  return data.map((i) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [i.lng, i.lat]
    },
    properties: {
      direction: i.direction
    }
  }));
}


export default function Map({ dataSrc }) {
  const [selected, setSelected] = useState(1);
  const mapRef = useRef();
  const step = 120;
  const geoData = useMemo(
    () => ({
      type: "FeatureCollection",
      features: getFeatures(dataSrc[selected])
    }),
    [dataSrc, selected]
  );

  const [frame, setMap] = useMotion(geoData, step);
  console.log("frame", frame);
  useLayoutEffect(() => {
    mapRef.current && mapRef.current.getSource("geo123").setData(frame);
  }, [frame, mapRef.current]);
 
  function onMapLoad(map) {
    mapRef.current = map;
    setMap(map);
    console.log("onMapLoad", map);
  }
 
  return (
    <>
      
      <Mapbox
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={center}
        zoom={[8]}
        onDragEnd={(map, e) => console.log("Bounds:", map.getBounds())}
        onClick={(map, e) => console.log("clicked", e.lngLat)}
        onStyleLoad={(map) => onMapLoad(map)}
      >
        {/* <MapContext.Consumer>
          {(map) => {
            console.log("map", map);
          }}
        </MapContext.Consumer> */}
        <Image
          id={"vehicle"}
          url={van}
          options={{ width: 20, height: 20 }}
          alt=""
         
        />
        {console.log("frame inside map", frame)}
        <GeoJSONLayer id={"geo123"} data={frame} symbolLayout={layout} />
      </Mapbox>
    </>
  );
}
