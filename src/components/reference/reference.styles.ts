import * as stylex from "@stylexjs/stylex";
import { VARIABLES } from "./variables.stylex";
import {gap,  border, color } from "../../vars.stylex";

const STYLE = stylex.create({
  reference: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
    alignItems: "center",
    gap: gap.space8,
    color: color.white,
    paddingBlock: ".8rem",
    borderBlockEnd: `${border.width1} solid ${color.white}`,
    textTransform: "uppercase",
    ":first-child": {
      borderBlockStart: `${border.width1} solid ${color.white}`,
    },
    [VARIABLES.contentDisplay]: {
      default: "none",
      ":hover": "block",
    },
  },
  title: {
    fontSize: "2rem",
    display: "flex",
    gap: gap.space8,
    fontWeight: "500",
    lineHeight: "1.5",
  },
  year: {
    fontSize: ".5em",
    translate: "0 .8em",
    letterSpacing: "1",
    lineHeight: "1",
  },
  url: {
    fontSize: "1rem",
    display: VARIABLES.contentDisplay,
  },
  picture: {
    display: VARIABLES.contentDisplay,
    position: "absolute",
    inset: "50% auto auto 0",
    translate: "-100% -50%",
  },
});

export default STYLE;
 