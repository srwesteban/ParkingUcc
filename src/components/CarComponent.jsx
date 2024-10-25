import React from 'react';
import car from '/public/car.png'

export const CarComponent = () => {
    return (
        <div className="image-container">
            <img src={car} alt="Descripción" className="moving-image" />
        </div>
    );
}
