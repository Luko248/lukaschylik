import { component$ } from "@builder.io/qwik";
import SkillItem from "./skills.item";

const Skills = component$(() => {
  const skills = [
    "HTML",
    "CSS",
    "SVG",
    "JavaScript",
    "TypeScript",
    "React",
    "Astro",
    "Qwik",
    "AMP",
    "Tailwind",
    "Stylex",
    "SCSS",
    "Less",
    "Web AR",
    "pnpm",
    "Rollup",
    "Vite",
    "Webpack",
  ];

  return (
    <div class="skills relative z-20 grid gap-y-4 lg:gap-y-8 overflow-clip bg-black">
      <ul class="flex flex-row flex-nowrap gap-x-4 lg:gap-x-8 overflow-clip skills__scroller text-white">
        {skills.map((skill) => (
          <SkillItem key={skill} text={skill} />
        ))}
      </ul>
      <ul class="flex flex-row flex-nowrap gap-x-4 lg:gap-x-8 overflow-clip skills__scroller text-white">
        {skills.map((skill) => (
          <SkillItem key={skill} text={skill} />
        ))}
      </ul>
    </div>
  );
});

export default Skills;
