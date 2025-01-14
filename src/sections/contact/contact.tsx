import { component$, useStore, $ } from "@builder.io/qwik";
import Button from "~/components/button/button";
import Container from "~/components/container/container";
import FormField from "~/components/formField/formField";

const Contact = component$(() => {
  const state = useStore({
    fullname: "",
    email: "",
    subject: "",
    message: "",
    extraField: "", // Honeypot field
  });

  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    if (state.extraField) {
      // If honeypot field is filled, discard the form data
      state.fullname = "";
      state.email = "";
      state.subject = "";
      state.message = "";
      alert("Spam detected. Form submission discarded.");
    } else {
      // Handle form submission
      alert("Message Sent!");
      // Add your form submission logic here (e.g., send data to a server)
    }
  });

  return (
    <section id="contact" class="min-h-screen bg-black text-white">
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
        <form onSubmit$={handleSubmit} class="grid grid-cols-1 gap-24">
          <FormField
            type="text"
            name="extraField"
            value={state.extraField}
            onInput$={(e) =>
              (state.extraField = (e.target as HTMLInputElement).value)
            }
            className="hidden"
          />
          <FormField
            label="Your name"
            type="text"
            name="fullname"
            value={state.fullname}
            onInput$={(e) =>
              (state.fullname = (e.target as HTMLInputElement).value)
            }
            required
            className="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400"
          />
          <FormField
            label="Your email"
            type="email"
            name="email"
            value={state.email}
            onInput$={(e) =>
              (state.email = (e.target as HTMLInputElement).value)
            }
            required
            className="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400"
          />
          <FormField
            label="Subject"
            type="text"
            name="subject"
            value={state.subject}
            onInput$={(e) =>
              (state.subject = (e.target as HTMLInputElement).value)
            }
            required
            className="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400"
          />
          <FormField
            label="Your message"
            type="textarea"
            name="message"
            value={state.message}
            onInput$={(e) =>
              (state.message = (e.target as HTMLTextAreaElement).value)
            }
            required
            className="block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400"
          />
          <Button type="submit" title="sent" variant="primary">
            Sent
          </Button>
        </form>
      </Container>
    </section>
  );
});

export default Contact;
