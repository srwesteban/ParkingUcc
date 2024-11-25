import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const LOCAL_API_URL = "http://127.0.0.1:8000";
  const PRODUCTION_API_URL = "https://parking-ucc.vercel.app";

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    const code = searchParams.get("code");

    const verifyCode = async () => {
      if (code) {
        try {
          const response = await fetch(`${LOCAL_API_URL}/api/verificar-token/?code=${code}`);
          const data = await response.json();
          console.log("Respuesta de la API:", data);
          console.log("correo", data.correo);

          if (data.message === "Token válido") {
            const userResponse = await fetch(`${LOCAL_API_URL}/api/verificar-correo/?correo=${data.correo}`);
            const userData = await userResponse.json();
            console.log("Datos de usuario:", userData);

            if (userData.exists) {
              setUser(userData);
              navigate("/dashboard", { state: { user: userData } });
            } else {
              setError("No se encuentra en la base de datos");
            }
          } else {
            setError("Error en autentificación, intentalo nuevamente");
          }
        } catch (error) {
          setError("Error en la comunicación con el servidor");
        }
      }
    };

    verifyCode();
  }, [searchParams, navigate]);

  return (
    <>
      <div className="verificacion">
        {error ? (
          <div className="error">
            <p>{error}</p>
            <button
              className="text-slate-700 underline"
              onClick={handleNavigate}
            >
              Aqui
            </button>
          </div>
        ) : user ? (
          <div>
            <h1>Bienvenido, {user.name}!</h1>
          </div>
        ) : (
          <div>
            <p className="loading">Verificando código...</p>
          </div>
        )}
      </div>
    </>
  );
};
