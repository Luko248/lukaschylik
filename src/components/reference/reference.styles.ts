import * as stylex from "@stylexjs/stylex";

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
    ":hover": {
    // TODO display: block on url and picture 
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
    display: "none",
  },
  picture: {
    display: "none",
  },
});

export default STYLE;
