// src/hooks/useRenderCuadrado.ts
import React from "react";

const puntosPorCubo = 5; // Cada cubo puede tener hasta 5 puntos

/* setLados y setCubos ??*/

export const useSquareCounter = () => {
  const renderCuadrado = (puntos: number) => {
    const cubos = [];
    const numCubos = Math.ceil(puntos / puntosPorCubo); // Número de cubos necesarios

    for (let i = 0; i < numCubos; i++) {
      const puntosEnCubo = Math.min(puntos - i * puntosPorCubo, puntosPorCubo); // Puntos en este cubo

      cubos.push(
        <div
          key={i}
          className={`${i === 2 ? "m-2 mb-5" : "m-2"} relative h-11 w-11 lg:h-16 lg:w-16`}
        >
          {renderLineas(puntosEnCubo)}
        </div>,
      );
    }

    return cubos;
  };

  const renderLineas = (puntosEnCubo: number) => {
    const lados = [];

    if (puntosEnCubo >= 1) {
      lados.push(<div key="top" className="absolute left-0 top-0 h-[3px] w-full bg-[#d6c772]" />);
    }
    if (puntosEnCubo >= 2) {
      lados.push(
        <div key="right" className="absolute right-0 top-0 h-full w-[3px] bg-[#d6c772]" />,
      );
    }
    if (puntosEnCubo >= 3) {
      lados.push(
        <div key="bottom" className="absolute bottom-0 left-0 h-[3px] w-full bg-[#d6c772]" />,
      );
    }
    if (puntosEnCubo >= 4) {
      lados.push(<div key="left" className="absolute left-0 top-0 h-full w-[3px] bg-[#d6c772]" />);
    }
    if (puntosEnCubo === 5) {
      lados.push(
        <div key="diagonal" className="absolute left-0 top-0 h-full w-full">
          <div
            className="absolute h-[3px] w-full rounded bg-[#d6c772]"
            style={{
              transform: "rotate(130deg)",
              top: "50%",
              left: "0",
            }}
          />
        </div>,
      );
    }

    return lados;
  };

  return {renderCuadrado};
};
