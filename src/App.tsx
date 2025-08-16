import React, { useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent/MapComponent";
import CoordModal from "./components/CoordModal/CoordModal";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<Array<[number, number]>>([]);

  const handlePolygonComplete = (points: any) => {
    const coords = points.map((point: { lat: number; lng: number }) => [
      point.lat,
      point.lng,
    ]);
    setCoordinates(coords);
    setModalIsOpen(true);
  };

  return (
    <div className="app">
      <p>
        Для выбора точки нажмите ЛКМ на карте. Для показа модального окна с
        точками нажмите Enter
      </p>
      <div className="map-container">
        <MapComponent onPolygonComplete={handlePolygonComplete} />
      </div>
      <CoordModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        coordinates={coordinates}
      />
    </div>
  );
};

export default App;
