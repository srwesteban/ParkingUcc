import { useCallback } from "react";

function useFormSubmit(email, setPopupMessage, setShowPopup, setLoading, setIsError) {

  const LOCAL_API_URL = "http://127.0.0.1:8000/api/enviar-correo/";

  const PRODUCTION_API_URL = "https://envio-de-correo.onrender.com/api/enviar-correo/"

  return useCallback(
    async (e) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(LOCAL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setPopupMessage(email);
          setIsError(false);
        } else {
          const errorMessage = `Error al enviar el correo: ${response.status} - ${response.statusText}`;
          setPopupMessage(errorMessage);
          setIsError(true);
        }

        setShowPopup(true);
        console.log(response);

      } catch (error) {
        console.error("Error al enviar el correo:", error);
        setPopupMessage("Hubo un error al enviar el correo.");
        setIsError(true);
        setShowPopup(true);
      } finally {
        setLoading(false);
      }
    },
    [email, setPopupMessage, setShowPopup, setLoading, setIsError]
  );
}

export default useFormSubmit;
