import React from "react";

export const PopupComponent = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 className="text-5xl m-2 p-3">Revisa tu correo</h1>
        <h4>Acabamos de enviar un mensaje a:</h4>
        <div className="border border-black px-0 py-2 rounded-md m-6">
          {message}
        </div>
        <h3 className="m-10 p-2">
          Sigue los pasos para ingresar al sistema,
          <br />
          ¡Por el momento ya puedes cerrar esta página!
        </h3>
        <button onClick={onClose} className="modal-button bg-primary">
          Cerrar
        </button>
      </div>
    </div>
  );
};
