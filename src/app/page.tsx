"use client";
import {useState} from "react";
import Swal from "sweetalert2";
import {Tillana} from "next/font/google";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";

export const tillana = Tillana({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export default function HomePage() {
  const [puntosEllos, setPuntosEllos] = useState(0);
  const [puntosNos, setPuntosNos] = useState(0);

  const puntosPorCubo = 5; // Cada cubo puede tener hasta 5 puntos

  const renderCuadrado = (puntos: number) => {
    const cubos = [];
    const numCubos = Math.ceil(puntos / puntosPorCubo); // Número de cubos necesarios

    for (let i = 0; i < numCubos; i++) {
      const puntosEnCubo = Math.min(puntos - i * puntosPorCubo, puntosPorCubo); // Puntos en este cubo

      cubos.push(
        <div
          key={i}
          className={`${i === 2 ? "m-2 mb-5" : "m-2"} relative  h-12 w-12 border-[#26619C] lg:h-16 lg:w-16`}
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

  const handleSumar = (equipo: string) => {
    if (equipo === "ellos") {
      const nuevosPuntos = puntosEllos + 1;

      setPuntosEllos(nuevosPuntos);
      if (nuevosPuntos >= 30) {
        handleWinners("Ellos");
      }
    } else if (equipo === "nos") {
      const nuevosPuntos = puntosNos + 1;

      setPuntosNos(nuevosPuntos);
      if (nuevosPuntos >= 30) {
        handleWinners("Nosotros");
      }
    }
  };

  const handleRestar = (equipo: string) => {
    if (equipo === "ellos") {
      if (puntosEllos === 0) return;
      setPuntosEllos(puntosEllos - 1);
    } else if (equipo === "nos") {
      if (puntosNos === 0) return;
      setPuntosNos(puntosNos - 1);
    }
  };

  const handleWinners = (ganador: string) => {
    Swal.fire({
      title: `Ganaron ${ganador}!`,
      confirmButtonText: "Reiniciar",
    }).then(() => {
      setPuntosEllos(0);
      setPuntosNos(0);
    });
  };

  return (
    <section className=" m-auto mt-4 flex h-[700px] w-[550px] items-center justify-center gap-16 rounded-[60px] bg-[#efefef]">
      <div className="flex w-auto flex-col items-center">
        <Label
          className={cn("relative text-3xl font-normal text-zinc-800", tillana.className)}
          htmlFor="ellos"
        >
          Ellos
        </Label>
        <div className="flex h-[500px] w-[150px] flex-col items-center">
          {renderCuadrado(puntosEllos)}
        </div>
        <div className=" mt-8 flex items-center space-x-8">
          <Button
            className="rounded-full bg-[#994040] text-[#f0db66] hover:bg-[#7c3434]"
            id="restarEllos"
            onClick={() => handleRestar("ellos")}
          >
            -
          </Button>
          <Label className={cn("text-lg text-zinc-800", tillana.className)} htmlFor="puntosEllos">
            {puntosEllos}
          </Label>
          <Button
            className="rounded-full bg-[#446e41] text-[#f0db66] hover:bg-[#385c36]"
            id="sumarEllos"
            onClick={() => handleSumar("ellos")}
          >
            +
          </Button>
        </div>
      </div>
      <div className="relative flex h-[650px] w-[2px] translate-y-[-5px] items-center justify-center rounded bg-[#acb9c5]" />
      <div className="flex w-auto flex-col items-center">
        <Label
          className={cn("relative text-3xl font-normal text-zinc-800", tillana.className)}
          htmlFor="nosotros"
        >
          Nosotros
        </Label>
        <div className="flex h-[500px] w-[150px] flex-col items-center">
          {renderCuadrado(puntosNos)}
        </div>
        <div className="mt-8 flex items-center space-x-8">
          <Button
            className="rounded-full bg-[#994040] text-[#f0db66] hover:bg-[#7c3434]"
            id="restarNos"
            onClick={() => handleRestar("nos")}
          >
            -
          </Button>
          <Label className={cn("text-lg text-zinc-800", tillana.className)} htmlFor="puntosNos">
            {puntosNos}
          </Label>
          <Button
            className="rounded-full bg-[#446e41] text-[#f0db66] hover:bg-[#385c36]"
            id="sumarNos"
            onClick={() => handleSumar("nos")}
          >
            +
          </Button>
        </div>
      </div>
    </section>
  );
}
