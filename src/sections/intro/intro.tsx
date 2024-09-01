import { component$ } from '@builder.io/qwik';
import { attrs } from "@stylexjs/stylex";
import Container from '../../components/container/container';
import Button from '../../components/button/button';
import { STYLE } from './styles/intro.styles';

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