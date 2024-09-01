import { create } from '@stylexjs/stylex';
import {gap, border, color } from "../../../styleX/vars.stylex";

const STYLE = create({
    nav: {
      position: "fixed",
      inset: "0 auto auto 50%",
      display: "grid",
      placeItems: "center",
      inlineSize: "100%",
      translate: "-50%",
      color: color.white,
      zIndex: 1000,
    },
    menu: {
      display: "inline-flex",
      justifyContent: "center",
      gap: gap.space16,
      listStyle: "none",
      margin: 0,
      translate: "0 5svb",
      padding: 0,
      paddingBlock: gap.space24,
      paddingInline: gap.space32,
      borderRadius: border.radiusFull,
      backgroundColor: "hsla(0, 0%, 30%, 0.5)",
      backdropFilter: "blur(8px)",
    },
    li: {
      paddingInline: gap.space8,
      textDecoration: "none",
      transition: "scale 0.3s",
      ":hover": {
        scale: "1.1",
      }
    },
    link: {
      color: color.white,
      textDecoration: "none",
      textDecorationThickness: ".15em",
      textDecorationColor: "#4dffef",
      textDecorationStyle: "solid",
      textUnderlineOffset: ".25em",
      textTransform: "uppercase",
      ":hover": {
        textDecoration: "underline",
      }
    }
  });

export default STYLE;