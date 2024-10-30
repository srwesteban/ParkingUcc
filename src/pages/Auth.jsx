import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    const code = searchParams.get("code");

    const simulateBackendVerification = async (code) => {
      const validCode = "123";
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return code === validCode;
    };

    const verifyCode = async () => {
      if (code) {
        const isValid = await simulateBackendVerification(code);

        if (isValid) {
          setUser({ name: "Usuario Simulado" });
          navigate("/dashboard");
        } else {
          setError("Error en autentificacion, intentalo nuevamente");
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
