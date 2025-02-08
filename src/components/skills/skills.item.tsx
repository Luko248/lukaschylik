import { component$ } from "@builder.io/qwik";
import { classNames } from "~/utils";
import { SkillItemProps } from "./skills.types";

const SkillItem = component$<SkillItemProps>(({ text }) => {
  return (
    <li
      class={classNames(
        "inline-block",
        "border-2 border-white",
        "leading-normal text-nowrap",
        "text-xl lg:text-2xl",
        "px-4 lg:px-8 py-2 lg:py-4",
      )}>
      {text}
    </li>
  );
});

export default SkillItem;
