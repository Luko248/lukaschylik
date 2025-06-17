import type { LinkProps } from "@builder.io/qwik-city";

export interface NavigationLinkProps extends LinkProps {
  icon?: string;
}

export interface NavigationProps {
  small?: boolean;
  links?: NavigationLinkProps[];
}
