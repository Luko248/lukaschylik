import { component$ } from "@builder.io/qwik";
import { cls } from "~/utils";
import type { SkillItemProps } from "./skills.types";

const SkillItem = component$<SkillItemProps>(({ text }) => {
  return (
    <li
      class={cls(
        "inline-block",
        "border border-black dark:border-white rounded-lg",
        "leading-normal text-nowrap",
        "text-sm sm:text-lg md:text-xl lg:text-xl xl:text-lg",
        "px-4 lg:px-6 xl:px-5 py-2 lg:py-2 xl:py-1.5 3xl:py-3",
      )}>
      {text}
    </li>
  );
});

export default SkillItem;
