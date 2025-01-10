import { component$ } from "@builder.io/qwik";
import Container from "../../components/container/container";
import Button from "~/components/button/button";

const Contact = component$(() => {
  return (
    <section id="contact" class=" min-h-screen bg-black text-white">
      <Container size="lg" className="relative z-10 isolate">
        <h2 class="text-8xl uppercase mb-56 font-bold tracking-widest">
          Contact
        </h2>
        <p class="text-xl leading-relaxed font-light mb-64">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In voluptate
          quibusdam ab accusantium reiciendis corporis nemo odio sapiente qui
          molestiae delectus animi et sed voluptas aliquam neque, natus quas
          ducimus.
        </p>
        <form action="" class="grid grid-cols-1 gap-24">
          <label>
            Your name
            <input
              type="text"
              name="fullname"
              required
              class="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16  user-valid:border-green-400"
            />
          </label>
          <label>
            Your email
            <input
              class="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400 "
              type="email"
              name="email"
              required
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              class="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 valid:border-green-400"
              required
            />
          </label>
          <label>
            Your message
            <textarea
              required
              name=""
              id=""
              class="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400"
              rows={5}></textarea>
          </label>
          <Button type="submit">Sent</Button>
        </form>
      </Container>
    </section>
  );
});

export default Contact;
