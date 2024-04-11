import { ClassList, Signal } from "@builder.io/qwik";

export interface ContainerProps {
  className?: ClassList | Signal<ClassList>;
}