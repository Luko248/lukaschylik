import { component$ } from '@builder.io/qwik';
import Container from '../../components/container/container';
import Button from '../../components/button/button';

const Intro = component$(() => {
  return <header >
    <Container size="lg">
      <div >
        <div>
          <strong>Creative web developer</strong>
          <h1>Lukáš Chylík</h1>
          <Button
            onClick$={() => { alert("Clicked") }}
            variant="primary"
            size="md">
            Get Started
          </Button>
          <br />
        </div>
        <div>
          <img src="https://lukaschylik.sk/wwwroot/images/meta/meta-image.jpg" alt="Profile photo of me" width="1600" height="1600" />
        </div>
      </div>
    </Container>
  </header >
});

export default Intro;