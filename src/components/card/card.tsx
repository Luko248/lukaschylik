import { component$, Slot } from "@builder.io/qwik";
import { CardProps } from "./card.types";

export default component$(({ title, description, path, src }: CardProps) => {
  return (
    <div class="border-white border-2 p32 text-white">
      <h3>{title}</h3>
      <p>{description}</p>

      <Slot />
    </div>
  );
});
