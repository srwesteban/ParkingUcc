import React from "react";
import ucclogo from '/public/ucclogo.png'

export const NavbarComponent = () => {
  return (
    <nav className="bg-light border-b-2 border-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-32 flex items-center">
        <img
          className="h-20 w-20"
          src={ucclogo}
          alt="Logo UCC"
        />
        <a
          href="#"
          className="ml-4 text-5xl font-bold text-dark" // Usa font-bold para el peso 700
          aria-current="page"
        >
          Parking Ucc
        </a>
      </div>
    </nav>
  );
};
