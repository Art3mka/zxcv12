import React from "react";
import Modal from "react-modal";
import "./styles.css";

interface IProps {
  isOpen: boolean;
  onRequestClose: () => void;
  coordinates: Array<[number, number]>;
}

const CoordModal: React.FC<IProps> = ({
  isOpen,
  onRequestClose,
  coordinates,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <h2>Выбранная область</h2>
      <div className="coordinates-list">
        {coordinates.map((coord, index) => (
          <div key={index}>
            Точка {index + 1}: {coord[0].toFixed(6)}, {coord[1].toFixed(6)}
          </div>
        ))}
      </div>
      <button onClick={onRequestClose}>Закрыть</button>
    </Modal>
  );
};

export default CoordModal;
