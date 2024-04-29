import { component$ } from '@builder.io/qwik';
import { attrs, create } from "@stylexjs/stylex";
import Container from '../container/container';
import { color, gap } from '../../vars.stylex';
import Button from '../button/button';
import { numNeg } from '../../utils';

const STYLES = create({
  header: {
    paddingBlock: "8svb",
    minBlockSize: "100svb",
    backgroundColor: color.secondary,
    color: color.white,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "5fr 8fr",
  },
  h1: {
    fontSize: `clamp(${gap.xxl}, 8svb, 6rem)`,
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
          <h1 {...attrs(STYLES.h1)}>Welcome to my website</h1>
          <Button
            onClick$={() => { alert("Clicked") }}
            variant="primary"
            size="md">
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  </header>
});

export default Intro;