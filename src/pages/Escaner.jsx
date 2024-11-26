import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Escaner.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importando los íconos

export const Escaner = () => {
  const URL_BASE = "http://127.0.0.1:8000";
  const URL_PRO = "https://envio-de-correo.onrender.com";
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState(null);
  const [isValid, setIsValid] = useState(null); // Nueva variable de estado para almacenar si es válido o no

  const handleInputChange = (e) => {
    setPlaca(e.target.value.toUpperCase()); // Convierte la entrada a mayúsculas
    console.log("Placa ingresada:", e.target.value); // Log para ver lo que se ingresa
  };

  const validarPlaca = async () => {

    console.log("Iniciando validación de placa...");

    if (placa.length !== 6) {
      setResultado('La placa debe tener 6 caracteres');
      setIsValid(false);
      console.log("Placa inválida: la longitud no es 6"); // Log si la placa tiene longitud incorrecta
      return;
    }

    try {
      console.log("Realizando solicitud para validar placa:", placa); // Log para mostrar la placa que se valida
      const response = await axios.get(`${URL_PRO}/api/validar_placa/`, {
        params: { placa },
      });

      console.log("Respuesta de validación:", response.data); // Log de la respuesta de la API

      const isValidResponse = response.data.exists;
      setResultado(isValidResponse ? 'Placa válida' : 'Placa no registrada');
      setIsValid(isValidResponse);

      console.log(isValidResponse ? "Placa válida" : "Placa no registrada"); // Log según si la placa es válida o no
    } catch (error) {
      console.error("Error al validar la placa:", error); // Log de error si algo sale mal
      setResultado('Error al validar la placa');
      setIsValid(false);
    }
  };

  return (
    <div className="escaner-container">
      <h1 className="escaner-title">Escáner de Placas</h1>
      <input
        type="text"
        value={placa}
        onChange={handleInputChange}
        placeholder="Ingresa la placa"
        maxLength={6}
        className="escaner-input"
      />
      <button
        onClick={validarPlaca}
        className="escaner-button"
      >
        Validar
      </button>
      {resultado && (
        <div className={`result-message ${isValid ? 'success' : 'error'}`}>
          <div className="result-icon">
            {isValid ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
          {resultado}
        </div>
      )}
    </div>
  );
};
