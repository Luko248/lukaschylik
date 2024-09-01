import { create } from '@stylexjs/stylex';
import {gap, media } from "../../../styleX/vars.stylex";

export const STYLE = create({
    default: {
      marginInline: gap.auto,
      position: "relative",
      isolation: "isolate",
    }
  });
  
export const SIZES = create({
    sm: {
      inlineSize: `min(calc(${media.widthDesktopS} - 2rem), 100%)`
    },
    md: {
      inlineSize: `min(calc(${media.widthDesktopHd} - 2rem), 100%)`
    },
    lg: {
      inlineSize: `min(calc(${media.widthDesktopFullHd} - 2rem), 100%)`
    }
  });
