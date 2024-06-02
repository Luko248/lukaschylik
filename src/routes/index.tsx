import { component$ } from "@builder.io/qwik";
import Intro from "~/components/intro/intro";
import Container from "~/components/container/container";
import stylex, { create } from '@stylexjs/stylex';

const STYLE = create({
  default: {
    minBlockSize: "100svb"
  }
})

export default component$(() => {
  return (
    <>
      <Intro />
      <section id="skills" {...stylex.props(STYLE.default)}>
        <Container>
          <h2>Skills</h2>
        </Container>
      </section >
      <section id="reference" {...stylex.props(STYLE.default)}>
        <Container>
          <h2>Reference</h2>
        </Container>
      </section>
    </>
  );
});