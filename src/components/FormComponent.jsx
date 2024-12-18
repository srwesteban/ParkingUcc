import React, { useState, useEffect, useRef } from "react";
import useFormSubmit from "../hooks/useFormSubmit";
import { PopupComponent } from "../components/PopupComponent";
import { LoadingComponent } from "./LoadingComponent";
import flecha from '/public/arrowcircle.svg';

export const FormComponent = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const [isError, setIsError] = useState(false);  // Estado para manejar si es error
  const inputRef = useRef(null);

  const handleSubmit = useFormSubmit(email, setPopupMessage, setShowPopup, setLoading, setIsError);

  const onSubmit = (e) => {
    handleSubmit(e);
    if (showPopup) return;
    setEmail("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="flex items-center justify-center h-[74vh]">
        <div className="bg-light p-8 rounded shadow-lg w-full max-w-md m-10">
          <h1 className="text-4xl font-bold text-dark text-center mb-4">
            ¡Bienvenido!
          </h1>
          <p className="text-dark text-center mb-6">
            Para continuar, ingresar tu correo institucional:
          </p>
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            <input
              ref={inputRef}
              type="email"
              id="email"
              className="border border-gray-400 p-2 rounded w-5/6 mb-4 px-4"
              value={email}
              placeholder="estudiante.ucc@campusucc.edu.co"
              onChange={(e) => setEmail(e.target.value)}
              maxLength={50}
              required
            />
            <button
              id="btn-form"
              type="submit"
              className="bg-gradient-primary text-white rounded w-3/6 py-2 flex items-center justify-center"
            >
              <span className="font-bold">Continuar</span>
              <img
                src={flecha}
                alt="->"
                className="ml-2 w-4 h-4"
                id="flecha"
              />
            </button>
          </form>
        </div>
        {showPopup && (
          <PopupComponent
            message={popupMessage}
            onClose={handlePopupClose}
            isError={isError}  // Pasar el estado de error
          />
        )}
        {loading && <LoadingComponent />} {/* Mostrar el componente de carga */}
      </div>
    </>
  );
};
