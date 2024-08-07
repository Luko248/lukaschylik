import * as stylex from "@stylexjs/stylex";
import { VARIABLES } from "./variables.stylex";

const STYLE = stylex.create({
  reference: {
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
    alignItems: "center",
    gap: "1rem",
    color: "#fff",
    paddingBlock: ".8rem",
    borderBlockEnd: "1px solid #fff",
    textTransform: "uppercase",
    ":first-child": {
      borderBlockStart: "1px solid #fff",
    },
    [VARIABLES.contentDisplay]: {
      default: "none",
      ":hover": "block",
    }
  },
  title: {
    fontSize: "2rem",
    display: "flex",
    gap: ".8rem",
    fontWeight: "500",
    letterSpacing: "0.1em",
    lineHeight: "1.5",
  },
  year: {
    fontSize: ".5em",
    translate: "0 .8em",
    lineHeight: "1",
  },
  url: {
    fontSize: "1rem",
    display: VARIABLES.contentDisplay,
  },
  picture: {
    display: VARIABLES.contentDisplay,
  },
});

export default STYLE;
