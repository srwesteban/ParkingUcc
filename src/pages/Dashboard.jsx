import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

export const Dashboard = () => {
  const URL_BASE = "http://127.0.0.1:8000";
  const URL_PRO = "https://parking-ucc.vercel.app";
  const location = useLocation();
  const id = location.state?.user?.data?.id_estudiante;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Usuario inicializado en null.

  // Función para obtener los datos del estudiante
  const obtenerEstudiante = async () => {
    if (!id) {
      console.error("El ID del estudiante no está disponible");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${URL_PRO}/api/estudiante/${id}/`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del estudiante");
      }

      const data = await response.json();
      setUser({
        id: data.id_estudiante,
        nombre: data.nombre,
        placas: data.placas || [],
      });
    } catch (error) {
      console.error("Error al obtener estudiante:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEstudiante();
  }, [id]);

  const handlePlacaChange = (index, newPlaca) => {
    const updatedPlacas = [...(user.placas || [])];
    updatedPlacas[index] = newPlaca;
    setUser((prevUser) => ({ ...prevUser, placas: updatedPlacas }));
  };

  const handleSave = async () => {
    if (!id || !user) {
      console.error(
        "El ID del estudiante o los datos del usuario no están disponibles"
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${URL_PRO}/api/estudiante/${id}/placas/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placas: user.placas }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar las placas");
      }
      console.log("Placas guardadas correctamente");
    } catch (error) {
      console.error("Error al guardar las placas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {loading ? (
          <div className="loading-text">Cargando...</div>
        ) : user ? (
          <>
            <div className="estudiante-info">
              <h1>Información del Estudiante</h1>
              <p>ID: {user.id}</p>
              <p>Nombre: {user.nombre}</p>
            </div>
            <div className="placas">
              <h2>Placas de Vehículos</h2>
              <div className="placa-container">
                {user.placas.map((placa, index) => (
                  <input
                    key={index}
                    type="text"
                    value={placa}
                    onChange={(e) => handlePlacaChange(index, e.target.value)}
                    className="placa-input"
                  />
                ))}
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-green-500 p-3 px-5 m-4 rounded-xl text-white font-semibold shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSave}
                disabled={loading}
              >
                Guardar Placas
              </button>
            </div>
          </>
        ) : (
          <div className="error-text">
            No se pudo cargar la información del estudiante
          </div>
        )}
      </div>
    </div>
  );
};
