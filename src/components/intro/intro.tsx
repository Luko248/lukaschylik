import { component$ } from '@builder.io/qwik';
import { attrs, create } from "@stylexjs/stylex";
import Container from '../container/container';
import { color, gap } from '../../vars.stylex';
import Button from '../button/button';

const STYLES = create({
  header: {

    backgroundColor: color.secondary,
    color: color.white
  },
  grid: {
    display: "grid",
    paddingBlock: "8svb",
    minBlockSize: "100svb",
    gridTemplateColumns: `minmax(${gap.xl}, 8fr) minmax(${gap.xl}, 5fr)`,
    alignItems: "center",
  },
  container: {
    display: "contents"
  },
  strong: {
    display: "block",
    marginBlockEnd: gap.l,
    letterSpacing: "0.1em",
    fontSize: {
      default: `clamp(${gap.xl}, 3.5svb, ${gap.xxxl})`
    },
  },
  h1: {
    fontSize: {
      default: `clamp(${gap.xxl}, 10svb, 8rem)`
    },
    fontWeight: "bold",
    textTransform: "uppercase",
    textWrap: "pretty",
    lineHEight: "1.5",
    textShadow: `3px 3px 0 #ff9cea, -3px -3px 0 #4dffef`,
    letterSpacing: "0.1em",
  },
});

const Intro = component$(() => {
  return <header {...attrs(STYLES.header)}>
    <Container size="lg">
      <div {...attrs(STYLES.grid)}>
        <div>
          <strong {...attrs(STYLES.strong)}>Creative web developer</strong>
          <h1 {...attrs(STYLES.h1)}>Lukáš Chylík</h1>
          <Button
            onClick$={() => { alert("Clicked") }}
            variant="primary"
            size="md">
            Get Started
          </Button>
          <br />
        </div>
      </div>
    </Container>
  </header >
});

export default Intro;