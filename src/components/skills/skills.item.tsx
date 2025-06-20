import { component$ } from "@builder.io/qwik";
import { cls } from "~/utils";
import type { SkillItemProps } from "./skills.types";

const SkillItem = component$<SkillItemProps>(({ text }) => {
  return (
    <li
      class={cls(
        "inline-block",
        "border-2 border-white rounded-lg",
        "leading-normal text-nowrap",
        "text-sm sm:text-lg md:text-xl lg:text-2xl",
        "px-4 lg:px-8 py-2 lg:py-3 3xl:py-4",
      )}>
      {text}
    </li>
  );
});

export default SkillItem;
