"use client";
import {useState} from "react";
import Swal from "sweetalert2";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

export default function HomePage() {
  const [puntosEllos, setPuntosEllos] = useState(0);
  const [puntosNos, setPuntosNos] = useState(0);

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

  {
    /* FALTA LÓGICA GRÁFICA (ANOTACIÓN EN CUADRADOS) */
  }

  return (
    <section className="relative m-auto mt-4 flex h-[700px] w-[580px] flex-col justify-between rounded-[60px] border-[3px] border-solid border-[#acb9c5] bg-[#efefef]">
      <div className="mt-6 flex justify-evenly">
        <section className="flex flex-col items-center">
          <Label className="relative text-3xl text-zinc-800" htmlFor="ellos">
            Ellos
          </Label>
        </section>
        <section className="flex flex-col items-center">
          <Label className=" relative text-3xl text-zinc-800" htmlFor="nosotros">
            Nosotros
          </Label>
        </section>
      </div>
      <div className="mb-8 flex items-center justify-evenly">
        <Button
          className="rounded-full bg-[#994040] text-[#f0db66]"
          id="restarEllos"
          onClick={() => handleRestar("ellos")}
        >
          -
        </Button>
        <Label className="text-lg text-zinc-800" htmlFor="puntosEllos">
          {puntosEllos}
        </Label>
        <Button
          className="rounded-full bg-[#446e41] text-[#f0db66]"
          id="sumarEllos"
          onClick={() => handleSumar("ellos")}
        >
          +
        </Button>
        <Button
          className="rounded-full bg-[#994040] text-[#f0db66]"
          id="restarNos"
          onClick={() => handleRestar("nos")}
        >
          -
        </Button>
        <Label className="text-lg text-zinc-800" htmlFor="puntosNos">
          {puntosNos}
        </Label>
        <Button
          className="rounded-full bg-[#446e41] text-[#f0db66]"
          id="sumarNos"
          onClick={() => handleSumar("nos")}
        >
          +
        </Button>
      </div>

      {/* DUDOSO, BUSCAR LA MANERA DE CREAR DOS COLUMNAS ELLOS/NOSOTROS CON UN GAP Y LAS LINEAS SEPARADORAS */}
      <style jsx>{`
        .relative::before {
          content: "";
          position: absolute;
          top: 1.5rem /* 24px */;
          bottom: 2rem /* 32px */;
          left: 50%;
          width: 3px;
          background-color: #acb9c5;
        }
        .relative::after {
          content: "";
          position: absolute;
          top: 4rem /* 64px */;
          left: 2rem /* 32px */;
          right: 2rem /* 32px */;
          height: 1px;
          background-color: #acb9c5;
        }
      `}</style>
    </section>
  );
}
