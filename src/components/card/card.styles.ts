import * as stylex from "@stylexjs/stylex";

const STYLE = stylex.create({
    card: {
      containerType: "inline-size",
      position: "relative",
      aspectRatio: "16 / 9",
      perspective: "100svb",
    },
    inner: {
      position: "absolute",
      inset: 0,
      transformStyle: "preserve-3d",
      transition: "rotate .5s ease-in-out",
      rotate: "x 0deg", 
      borderRadius: "1em",
      ":hover": {
        rotate: "x 180deg", 
      }
    },
    face: {
      position: "absolute",
      display: "grid",
      placeItems: "center",
      backfaceVisibility: "hidden",
      color: "white",
      fontFamily: "system-ui",
      fontSize: "10cqi",
      inset: 0,
      letterSpacing: ".1em",
      fontWeight: "900",
      backgroundColor: "hsla(0, 0%, 50%, .25)",
      backdropFilter: "blur(.5rem)",
      borderRadius: "inherit",
      overflow: "clip",
      cursor: "pointer",
    },
    faceFront: {
      zIndex: 2,
      ":after": {
        content: "",
        position: "inherit",
        inset: 0,
      }
    },
    faceBack: {
      zIndex: 1,
      rotate: "x 180deg",
      textTransform: "uppercase",
    }
  });

  export default STYLE;