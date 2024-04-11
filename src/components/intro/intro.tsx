import { component$ } from '@builder.io/qwik';
import { attrs, create } from "@stylexjs/stylex";
import Container from '../container/container';

const styles = create({
  header: {
    paddingBlock: "8svb",
  },
});

const Intro = component$(() => {
  return <header {...attrs(styles.header)}>
    <Container>
      <h1>Welcome to my website</h1>
    </Container>
  </header>
});

export default Intro;