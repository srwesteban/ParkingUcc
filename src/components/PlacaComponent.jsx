import React, { useState } from "react";

const PlacaComponent = ({ index, placa, onEdit }) => {
  const [editando, setEditando] = useState(false);
  const [nuevaPlaca, setNuevaPlaca] = useState(placa);

  const validarFormatoPlaca = (valor) => /^[A-Z]{3}\d{3}$/.test(valor);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6) {
      setNuevaPlaca(value.toUpperCase());
    }
  };

  const handleEdit = () => setEditando(true);

  const handleSave = () => {
    if (validarFormatoPlaca(nuevaPlaca)) {
      onEdit(index, nuevaPlaca);
      setEditando(false);
    } else {
      alert("El formato de la placa debe ser 3 letras seguidas de 3 números (por ejemplo, ABC123).");
    }
  };

  const handleBlur = () => {
    if (!validarFormatoPlaca(nuevaPlaca)) {
      setNuevaPlaca(placa);
      setEditando(false);
    }
  };

  return (
    <>
      <div className="placa">
        {editando ? (
          <input
            value={nuevaPlaca}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={6}
            placeholder="ABC123"
          />
        ) : (
          <span>{placa}</span>
        )}
      </div>
      <div className="btn-placa">
        <button onClick={editando ? handleSave : handleEdit}>
          {editando ? "Guardar" : "Editar"}
        </button>
      </div>
    </>
  );
};

export default PlacaComponent;
