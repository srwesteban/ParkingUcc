import React from "react";
import '../styles/Loading.css'

export const LoadingComponent = () => {
  console.log('cargando...');

  return (
    <>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Enviando correo...</p>
      </div>
    </>
  );
};
