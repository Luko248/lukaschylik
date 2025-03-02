import { component$, Slot } from "@builder.io/qwik";
import { classNames } from "~/utils";
import { ListItemProps } from "./listItem.types";

const ListItem = component$(({ marker = "🔥" }: ListItemProps) => {
  return (
    <li
      data-marker={marker}
      class={classNames("ms-5 md:ms-7 ps-2", "text-xl md:text-2xl font-bold")}>
      <Slot />
    </li>
  );
});

export default ListItem;
