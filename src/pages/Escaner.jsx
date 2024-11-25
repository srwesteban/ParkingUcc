import React, { useState } from 'react';
import axios from 'axios';

export const Escaner = () => {
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleInputChange = (e) => {
    setPlaca(e.target.value.toUpperCase()); // Convierte la entrada a mayúsculas
  };

  const validarPlaca = async () => {
    if (placa.length !== 6) {
      setResultado('La placa debe tener 6 caracteres');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/validar_placa/', {
        params: { placa },
      });
      setResultado(response.data.exists ? 'Placa válida' : 'Placa no registrada');
    } catch (error) {
      console.error(error);
      setResultado('Error al validar la placa');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Escáner de Placas</h1>
      <input
        type="text"
        value={placa}
        onChange={handleInputChange}
        placeholder="Ingresa la placa"
        maxLength={6}
        style={{
          padding: '10px',
          fontSize: '16px',
          textTransform: 'uppercase', // Asegura que siempre sea mayúscula
        }}
      />
      <button
        onClick={validarPlaca}
        style={{
          marginLeft: '10px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Validar
      </button>
      {resultado && (
        <p
          style={{
            marginTop: '20px',
            fontSize: '18px',
            color: resultado === 'Placa válida' ? 'green' : 'red',
          }}
        >
          {resultado}
        </p>
      )}
    </div>
  );
};
