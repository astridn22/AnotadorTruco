"use client";
import Swal from "sweetalert2";
import {Tillana} from "next/font/google";
import {MinusIcon, PlusIcon} from "lucide-react";

import {useCounter} from "./hooks/useCounter";
import {useSquareCounter} from "./hooks/useSquareCounter";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export const tillana = Tillana({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

type Ganador = "Ellos" | "Nosotros";

export default function HomePage() {
  const counterEllos = useCounter(() => handleWinners("Ellos"));
  const counterNos = useCounter(() => handleWinners("Nosotros"));
  const squareCounterEllos = useSquareCounter();
  const squareCounterNos = useSquareCounter();

  const handleWinners = (ganador: Ganador) => {
    Swal.fire({
      title: `Ganaron ${ganador}!`,
      confirmButtonText: "Reiniciar",
    }).then(() => {
      counterEllos.reset();
      counterNos.reset();
    });
  };

  return (
    <section className=" m-auto mt-4 flex h-full w-[550px] items-center justify-center gap-14 rounded-3xl bg-[#efefef]">
      <div className="flex w-auto flex-col items-center">
        <h1 className={cn("relative text-3xl font-medium text-zinc-800", tillana.className)}>
          Ellos
        </h1>
        <div className="flex h-[500px] w-[150px] flex-col items-center">
          {squareCounterEllos.renderCuadrado(counterEllos.count)}
        </div>
        <div className=" mt-8 flex items-center space-x-8">
          <Button
            className="size-12 rounded-full bg-[#994040] text-[#f0db66] hover:bg-[#7c3434]"
            id="restarEllos"
            onClick={counterEllos.decrement}
          >
            <MinusIcon />
          </Button>
          <p className={cn("text-lg font-semibold text-zinc-800", tillana.className)}>
            {counterEllos.count}
          </p>
          <Button
            className="size-12 rounded-full bg-[#446e41] text-[#f0db66] hover:bg-[#385c36]"
            id="sumarEllos"
            onClick={counterEllos.increment}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="relative flex h-[650px] w-[2px] translate-y-[-5px] items-center justify-center rounded bg-[#acb9c5]" />
      <div className="flex w-auto flex-col items-center">
        <h2 className={cn("relative text-3xl font-medium text-zinc-800", tillana.className)}>
          Nosotros
        </h2>
        <div className="flex h-[500px] w-[150px] flex-col items-center">
          {squareCounterNos.renderCuadrado(counterNos.count)}
        </div>
        <div className="mt-8 flex items-center space-x-8">
          <Button
            className="size-12 rounded-full bg-[#994040] text-[#f0db66] hover:bg-[#7c3434]"
            id="restarNos"
            onClick={counterNos.decrement}
          >
            <MinusIcon />
          </Button>
          <p className={cn("text-lg font-semibold text-zinc-800", tillana.className)}>
            {counterNos.count}
          </p>
          <Button
            className="size-12 rounded-full bg-[#446e41] text-[#f0db66] hover:bg-[#385c36]"
            id="sumarNos"
            onClick={counterNos.increment}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
