import { component$ } from '@builder.io/qwik';
import { attrs, create } from "@stylexjs/stylex";
import Container from '../container/container';
import { color, gap } from '../../vars.stylex';

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
  }
});

const Intro = component$(() => {
  return <header {...attrs(STYLES.header)}>
    <Container size="lg" >
      <div {...attrs(STYLES.grid)}>
        <h1 {...attrs(STYLES.h1)}>Welcome to my website</h1>
      </div>
    </Container>
  </header>
});

export default Intro;