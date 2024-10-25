import { useCallback } from "react";

function useFormSubmit(email, setPopupMessage, setShowPopup) {
  return useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return;
      }
      console.log(`Correo enviado: ${email}`);
      // Envía HTML para el mensaje
      setPopupMessage(email);
      setShowPopup(true);
    },
    [email, setPopupMessage, setShowPopup]
  );
}

export default useFormSubmit;
