import { component$, Slot } from "@builder.io/qwik";
import { CardProps } from "./card.types";
import { Button } from "../button";
import { cls } from "~/utils";
import { Link } from "@builder.io/qwik-city";

const formatPrice = (price: number) => {
  return price >= 10000
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : price.toString();
};

const Card = component$(
  ({
    title,
    subtitle,
    price,
    showVat = true,
    path,
    isBlogPost,
    date,
    author,
    description,
  }: CardProps) => {
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
            "text-3xl sm:text-4xl xl:text-6xl 2xl:text-[clamp(1.5rem,3svi,2.5rem)] 3xl:text-[clamp(2rem,4svi,3rem)]",
            "font-regular tracking-widest 3xl:tracking-[.15em]",
            "text-white group-hover:text-yellow-500",
            "transition-colors duration-300 ease-in-out",
            "py-3 sm:py-6 px-6 sm:px-8",
            "border-b-2 border-b-white",
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
            !isBlogPost && "mb-0 3xl:mb-8",
            "text-white",
            "content-start",
          )}>
          {isBlogPost && (
            <>
              {description && <p>{description}</p>}
              {(date || author) && (
                <div class="flex gap-2 items-center text-sm text-gray-300">
                  {date && <time dateTime={date}>{date}</time>}
                  {date && author && <span>•</span>}
                  {author && <span>{author}</span>}
                </div>
              )}
            </>
          )}
          <Slot />
        </div>
        <div
          class={cls(
            "flex justify-between flex-col 2xl:flex-row",
            "gap-5 p-6 sm:p-8",
            "items-stretch 2xl:items-center",
          )}>
          {isBlogPost ? (
            <Button
              variant="secondary"
              ariaLabel="Prečítať"
              title="Prečítať"
              href={path}>
              Prečítať
            </Button>
          ) : (
            <>
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
                  class="tooltip my-2 p-2 bg-white/10 font-semibold"
                  role="tooltip">
                  {`Cena bez DPH je ${formatPrice(price)} Kč`}
                </div>
              )}
              <Button
                variant="secondary"
                ariaLabel={price ? `Mám záujem` : "Nedostupné"}
                title={price ? `Mám záujem` : "Nedostupné"}
                disabled={!price}
                href={path}>
                {price ? `Mám záujem` : "Nedostupné"}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

export default Card;
