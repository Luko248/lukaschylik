import * as stylex from "@stylexjs/stylex";
import {gap,  border, color, transition} from "../../../styleX/vars.stylex";

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
    isolation: "isolate",
    
    ":hover": {
      zIndex: 1,
    }
    ,
    ":first-child": {
      borderBlockStart: `${border.width1} solid ${color.white}`,
    },
    "--picture_opacity": {
      default: 0,
      ":hover": 1,
    },
    "--url_opacity": {
      default: 0,
      ":hover": 1,
    },
    "--title-pseudo_translate-y": {
      default: "0%",
      ":hover": "-100%",
    },
  },
  titleWrrapper: {
    fontSize: "2rem",
    display: "flex",
    gap: gap.space8,
    fontWeight: "500",
    lineHeight: "1.5",
    maxBlockSize: "3rem",
    overflow: "hidden",
    zIndex: 2,
    position: "relative",
  },
  title:{
    ":before, :after": {
      content: "attr(aria-label)",
      display: "flex",
      flexflow: "column",
      fontSize: "1em",
      color: color.white,
      transition: `translate ${transition.duration} ${transition.fnc}`,
      translate: `0 var(--title-pseudo_translate-y)`,
    },
  },
  year: {
    fontSize: ".5em",
    translate: "0 .8em",
    letterSpacing: "1",
    lineHeight: "1",
  },
  url: {
    fontSize: "1rem",
    opacity: "var(--url_opacity)",
  },
  pictureWrapper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    opacity: "var(--picture_opacity)",
    inset: "50% auto auto 0",
    translate: "-80% -50%",
    backgroundColor: "hsl(from #55550f h s l)",
    padding: "10svb",
    aspectRatio: "1",
    borderRadius: border.radiusFull,
    isolation: "isolate",
    zIndex: 1,
  },
  picture: {
   display: "block",
  },
});

export default STYLE;
 