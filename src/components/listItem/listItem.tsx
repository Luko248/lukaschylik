import { component$, Slot } from "@builder.io/qwik";
import { cls } from "~/utils";
import { ListItemProps } from "./listItem.types";

const ListItem = component$(({ marker = "🔥" }: ListItemProps) => {
  return (
    <li
      data-marker={marker}
      class={cls(
        "ms-5 md:ms-7 ps-2",
        "text-md sm:text-lg md:text-xl 3xl:text-2xl font-bold",
      )}>
      <Slot />
    </li>
  );
});

export default ListItem;
