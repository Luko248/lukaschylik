import { component$ } from "@builder.io/qwik";
import Intro from "~/components/intro/intro";
import Container from "~/components/container/container";
import stylex, { create } from '@stylexjs/stylex';
import { color } from '../vars.stylex';
import Card from "~/components/card/card";

const moveToTop = stylex.keyframes({
  'from': { translate: '-50% calc(-50svb + 100%)' },
  '30%, 70%': { opacity: 1 },
  'to': { translate: '-50% calc(50svb - 100%)' },
});

const STYLE = create({
  section: {
    minBlockSize: "100svb",
    position: "relative",
    color: color.black,
    borderBlock: "1px solid #000",
  },
  sectionTitle: {
    position: "absolute",
    inset: "50% auto auto 50%",
    fontSize: "clamp(4.5rem, 35svb, 16rem)",
    textTransform: "uppercase",
    fontWeight: "900",
    letterSpacing: "0.1em",
    color: `hsl(from ${color.black} h s l / .15)`,
    opacity: 0,
    translate: "-50% calc(-50svb + 100%)",
    animationName: moveToTop,
    animationFillMode: "forwards",
    animationTimingFunction: "linear",
    animationDuration: "5s",
    animationTimeline: "view()",
    animationRangeStart: "contain",
    animationRangeEnd: "contain",
  }
})

export default component$(() => {
  return (
    <>
      <Intro />
      <section id="skills" {...stylex.props(STYLE.section)}>
        <Container>
          <h2 {...stylex.props(STYLE.sectionTitle)}>Skills</h2>
        </Container>
      </section >
      <section id="reference" {...stylex.props(STYLE.section)}>
        <Container>
          <h2 {...stylex.props(STYLE.sectionTitle)}>Reference</h2>
          <Card src="sdsd" title="Title" description="lorem10 lorem10 lorem10 lorem10 lorem10lorem10 lorem10"/>
          <Card src="sdsd" title="Title" description="lorem10 lorem10 lorem10 lorem10 lorem10lorem10 lorem10"/>
          <Card src="sdsd" title="Title" description="lorem10 lorem10 lorem10 lorem10 lorem10lorem10 lorem10"/>
          <Card src="sdsd" title="Title" description="lorem10 lorem10 lorem10 lorem10 lorem10lorem10 lorem10"/>
        </Container>
      </section>
    </>
  );
});