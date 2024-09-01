import { create } from '@stylexjs/stylex';
import {gap, color, boxShadow } from "../../../styleX/vars.stylex";

export const STYLE = create({
    header: {
      backgroundColor: color.bg,
      color: color.white
    },
    grid: {
      display: "grid",
      paddingBlock: "8svb",
      minBlockSize: "100svb",
      gridTemplateColumns: `minmax(${gap.space24}, 8fr) minmax(${gap.space24}, 5fr)`,
      alignItems: "center",
    },
    container: {
      display: "contents"
    },
    strong: {
      display: "block",
      marginBlockEnd: gap.space16,
      letterSpacing: "0.1em",
      fontSize: {
        default: `clamp(${gap.space24}, 3.5svb, ${gap.space40})`
      },
    },
    h1: {
      fontSize: {
        default: `clamp(${gap.space32}, 10svb, 8rem)`
      },
      fontWeight: "bold",
      textTransform: "uppercase",
      textWrap: "pretty",
      lineHEight: "1.5",
      textShadow: 
        `${boxShadow.radius3} ${boxShadow.radius3} 0 ${color.shadowPink}, 
        calc(-1 * ${boxShadow.radius3}) calc(-1 * ${boxShadow.radius3}) 0 ${color.shadowTorquoise}`,
      letterSpacing: "0.1em",
    },
    img: {
      display: "block",
      maxInlineSize: "100%",
      blockSize: "auto",
      borderRadius: "50%",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      filter: "grayscale(100%)",
      opacity: "0.8",
    }
  });