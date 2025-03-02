import { component$, Slot } from "@builder.io/qwik";
import { CardProps } from "./card.types";
import { Button } from "../button";
import { classNames } from "~/utils";

const formatPrice = (price: number) => {
  return price >= 10000
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : price.toString();
};

const Card = component$(({ title, price, path }: CardProps) => {
  return (
    <div
      class={classNames(
        "card",
        "group",
        "grid grid-rows-subgrid row-span-4",
        "border-2 border-white",
        "text-white",
      )}>
      <h3
        class={classNames(
          "text-2xl md:text-6xl font-semibold tracking-widest",
          "text-white group-hover:text-yellow-500",
          "transition-colors duration-300 ease-in-out",
          "py-6 px-8",
          "border-b-2 border-b-white",
        )}>
        {title}
      </h3>
      <div class="grid grid-rows-subgrid row-span-2 gap-8 p-8 text-l lg:text-xl leading-relaxed font-light content-start">
        <Slot />
      </div>
      <div class="flex justify-between p-8 items-center">
        <strong class="font-bold text-5xl">
          {price ? `${formatPrice(price)} Kč` : "Individuálne"}
        </strong>
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
