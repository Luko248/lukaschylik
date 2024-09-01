import { component$ } from '@builder.io/qwik';
import { attrs, create } from "@stylexjs/stylex";
import Container from '../../components/container/container';
import { color, gap } from '../../vars.stylex';
import Button from '../../components/button/button';

const STYLE = create({
  header: {
    backgroundColor: color.secondary,
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
    textShadow: `3px 3px 0 #ff9cea, -3px -3px 0 #4dffef`,
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

const Intro = component$(() => {
  return <header {...attrs(STYLE.header)}>
    <Container size="lg">
      <div {...attrs(STYLE.grid)}>
        <div>
          <strong {...attrs(STYLE.strong)}>Creative web developer</strong>
          <h1 {...attrs(STYLE.h1)}>Lukáš Chylík</h1>
          <Button
            onClick$={() => { alert("Clicked") }}
            variant="primary"
            size="md">
            Get Started
          </Button>
          <br />
        </div>
        <div>
          <img src="https://lukaschylik.sk/wwwroot/images/meta/meta-image.jpg" alt="Profile photo of me" {...attrs(STYLE.img)} width="1600" height="1600" />
        </div>
      </div>
    </Container>
  </header >
});

export default Intro;