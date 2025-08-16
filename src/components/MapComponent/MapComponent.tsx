import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

interface IProps {
  onPolygonComplete: (coordinates: L.LatLngExpression[]) => void;
}

const DrawPolygon: React.FC<IProps> = ({ onPolygonComplete }) => {
  const [polygonPoints, setPolygonPoints] = useState<L.LatLng[]>([]);

  useMapEvents({
    click(e) {
      const newPoint = e.latlng;
      setPolygonPoints([...polygonPoints, newPoint]);
    },
    keypress(e) {
      if (e.originalEvent.key === "Enter") {
        if (polygonPoints.length >= 3) {
          onPolygonComplete(polygonPoints);
          setPolygonPoints([]);
        }
      }
    },
  });

  return polygonPoints.length > 0 ? (
    <Polygon
      positions={polygonPoints}
      pathOptions={{ color: "blue", fillOpacity: 0.4 }}
    />
  ) : null;
};

const MapComponent: React.FC<IProps> = ({ onPolygonComplete }) => {
  return (
    <MapContainer
      center={[52.42, 31.01]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DrawPolygon onPolygonComplete={onPolygonComplete} />
    </MapContainer>
  );
};

export default MapComponent;
