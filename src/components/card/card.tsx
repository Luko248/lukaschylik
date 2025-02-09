import { component$, Slot } from "@builder.io/qwik";
import { CardProps } from "./card.types";
import { Button } from "../button";

const Card = component$(({ title, description, path, src }: CardProps) => {
  return (
    <div class="card border-white border-2 text-white">
      <h3 class="text-2xl font-bold py-6 px-8 border-b-2 border-b-white">
        {title}
      </h3>
      <div class="grid gap-8 p-8 text-l lg:text-xl leading-relaxed font-light content-start">
        <Slot />
        <div>
          <Button
            variant="secondary"
            ariaLabel="Learn more"
            title="Learn more"
            href={path}>
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Card;
