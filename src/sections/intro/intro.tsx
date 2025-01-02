import { component$ } from '@builder.io/qwik';
import Container from '../../components/container/container';
import Button from '../../components/button/button';

const Intro = component$(() => {
  return (
    <header class="bg-bg text-white">
      <Container size="lg">
        <div class="grid py-[8svb] min-h-screen grid-cols-[minmax(1.5rem,8fr)_minmax(1.5rem,5fr)] items-center">
          <div>
            <strong class="block mb-4 tracking-widest text-[clamp(1.5rem,3.5svb,2.5rem)]">Creative web developer</strong>
            <h1 class="text-[clamp(2rem,10svb,8rem)] font-bold uppercase leading-[1.5] text-shadow-[0_0_3px_hsl(313_100%_81%),-1px_-1px_0_hsl(175_100%_65%)] tracking-widest">Lukáš Chylík</h1>
            <Button
              onClick$={() => { alert("Clicked") }}
              variant="primary"
              size="md">
              Get Started
            </Button>
            <br />
          </div>
          <div>
            <img
              src="https://lukaschylik.sk/wwwroot/images/meta/meta-image.jpg"
              alt="Profile photo of me"
              width="1600"
              height="1600"
              class="block max-w-full h-auto rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] grayscale opacity-80"
            />
          </div>
        </div>
      </Container>
    </header>
  );
});

export default Intro;