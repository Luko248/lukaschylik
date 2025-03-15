import { component$, Slot } from "@builder.io/qwik";
import { CardProps } from "./card.types";
import { Button } from "../button";
import { cls } from "~/utils";

const formatPrice = (price: number) => {
  return price >= 10000
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : price.toString();
};

const Card = component$(({ title, price, showVat = true, path }: CardProps) => {
  return (
    <div
      class={cls(
        "card",
        "group",
        "grid grid-rows-subgrid row-span-4",
        "border-2 border-white",
        "text-white",
      )}>
      <h3
        class={cls(
          "text-2xl md:text-6xl font-regular tracking-[0.35em]",
          "text-white group-hover:text-yellow-500",
          "transition-colors duration-300 ease-in-out",
          "py-6 px-8",
          "border-b-2 border-b-white",
          "uppercase",
        )}>
        {title}
      </h3>
      <div class="grid grid-rows-subgrid row-span-2 gap-8 p-8 text-l lg:text-xl leading-relaxed font-light content-start">
        <Slot />
      </div>
      <div class="flex justify-between p-8 items-center mt-8">
        <strong class="font-bold text-5xl group cursor-help">
          {price ? `${formatPrice(price * 1.21)} Kč` : "Individuálne"}
          {showVat && (
            <small class="block text-base font-light opacity-80">
              Cena s DPH / 1h
            </small>
          )}
        </strong>
        {showVat && price && (
          <div
            class="tooltip my-2 p-2 bg-white/10 font-semibold"
            role="tooltip">
            {`Cena bez DPH je ${formatPrice(price)} Kč`}
          </div>
        )}
        <Button
          variant="secondary"
          ariaLabel="Mám záujem"
          title="Mám záujem"
          href={path}>
          Mám záujem
        </Button>
      </div>
    </div>
  );
});

export default Card;
