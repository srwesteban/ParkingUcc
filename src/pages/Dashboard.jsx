import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlacaComponent from "../components/PlacaComponent";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const estudianteInicial = {
    id: "001",
    nombre: "Juan Perez",
    placas: ["ABC123", "XYZ789"],
  };

  const [estudiante, setEstudiante] = useState(estudianteInicial);
  const [placas, setPlacas] = useState(estudianteInicial.placas);

  const handleEditPlaca = (index, nuevaPlaca) => {
    const nuevasPlacas = [...placas];
    nuevasPlacas[index] = nuevaPlaca;
    setPlacas(nuevasPlacas);
  };

  const handleSave = () => {
    setEstudiante((prevEstudiante) => ({
      ...prevEstudiante,
      placas: placas,
    }));
    alert("Placas actualizadas");
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="estudiante-info">
            <h1>Informacion del Estudiante</h1>
            <p>ID: {estudiante.id}</p>
            <p>Nombre: {estudiante.nombre}</p>
          </div>
          <div className="placas">
            <h2>Placas de Vehículos</h2>
            {placas.map((placa, index) => (
              <PlacaComponent
                key={index}
                index={index}
                placa={placa}
                onEdit={handleEditPlaca}
              />
            ))}
            <button
              className="bg-gradient-to-r from-blue-500 to-green-500 p-3 px-5 m-4 rounded-xl text-white font-semibold shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Guardar Placas
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
