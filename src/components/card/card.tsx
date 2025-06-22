import { component$, Slot } from "@builder.io/qwik";
import { cls } from "~/utils";
import { Button } from "../button";
import type { CardProps } from "./card.types";

const formatPrice = (price: number) => {
  return price >= 10000
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : price.toString();
};

/**
 * Card component that displays content in a card format
 */
const Card = component$(
  ({ title, subtitle, price, showVat = true, onClick$ }: CardProps) => {
    // Card content that will be wrapped by either div or anchor
    const CardContent = (
      <>
        <h3
          class={cls(
            "text-3xl sm:text-4xl xl:text-6xl 2xl:text-[clamp(1.5rem,3svi,2.5rem)] 3xl:text-[clamp(2rem,4svi,3rem)]",
            "font-regular tracking-widest 3xl:tracking-[.15em]",
            "text-black dark:text-white group-hover:bg-yellow-500 group-hover:text-black",
            "transition-colors duration-300 ease-in-out",
            "py-3 sm:py-6 px-6 sm:px-8",
            "border-b-2 border-b-black dark:border-b-white",
            "uppercase",
          )}>
          {title}
          {subtitle && (
            <small class="block text-md sm:text-lg mt-2">{subtitle}</small>
          )}
        </h3>
        <div
          class={cls(
            "grid grid-rows-subgrid row-span-2",
            "gap-inherit",
            "p-6 pt-0 sm:p-8 sm:pt-0",
            "text-base lg:text-xl font-mono",
            "leading-relaxed font-light",
            "mb-0 3xl:mb-8",
            "text-black dark:text-white",
            "content-start",
          )}>
          <Slot />
        </div>
        <div
          class={cls(
            "flex justify-between flex-col 2xl:flex-row",
            "gap-5 p-6 sm:p-8",
            "items-stretch 2xl:items-center",
          )}>
          <strong
            class={cls(
              "group cursor-help",
              "inline-block",
              "text-center 2xl:text-start",
              "font-bold text-3xl sm:text-4xl 3xl:text-5xl",
            )}>
            {price ? `${formatPrice(price * 1.21)} Kč` : "Na mieru"}
            {showVat && (
              <small class="block text-sm sm:text-base font-light opacity-80">
                Cena s DPH / 1h
              </small>
            )}
          </strong>
          {showVat && price && (
            <div
              class="tooltip my-2 p-2 bg-white/90 dark:bg-white/10 font-semibold"
              role="tooltip">
              {`Cena bez DPH je ${formatPrice(price)} Kč`}
            </div>
          )}
          <Button
            variant="secondary"
            ariaLabel={price ? `Mám záujem` : "Nedostupné"}
            title={price ? `Mám záujem` : "Nedostupné"}
            disabled={!price}
            onClick$={onClick$}>
            {price ? `Mám záujem` : "Nedostupné"}
          </Button>
        </div>
      </>
    );

    // For non-blog cards, use the regular div wrapper
    return (
      <div
        class={cls(
          "card",
          "group",
          "grid grid-rows-subgrid row-span-4",
          "border-2 border-black dark:border-white",
          "text-black dark:text-white",
        )}>
        {CardContent}
      </div>
    );
  },
);

export default Card;
