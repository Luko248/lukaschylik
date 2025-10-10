import { $, component$, useStore } from "@builder.io/qwik";
import { Button, Container, FormField, Section } from "~/components";
import Icon from "~/components/icon/icon";
import SectionTitle from "~/components/section/section.title";
import { SOCIAL_LINKS } from "~/constants/socialLinks";
import { cls } from "~/utils";

/**
 * Contact section component
 * Renders a contact form with validation and form submission handling
 */
const Contact = component$(() => {
  const state = useStore({
    fullname: "",
    email: "",
    subject: "",
    message: "",
    submitting: false,
  });

  /**
   * Handles form submission
   */
  const handleSubmit = $((event: SubmitEvent) => {
    event.preventDefault();

    if (state.submitting) return;
    state.submitting = true;

    const formData = new FormData(event.target as HTMLFormElement);

    fetch("https://formsubmit.co/ajax/chylik.lukas@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then(() => {
        state.fullname = "";
        state.email = "";
        state.subject = "";
        state.message = "";

        const url = new URL(window.location.href);
        url.search = "";
        url.searchParams.set("formSubmitted", "true");
        window.location.href = url.toString();
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        state.submitting = false;
        alert("Odoslanie správy zlyhalo. Skúste to znova, prosím.");
      })
      .finally(() => {
        state.submitting = false;
      });
  });

  /**
   * Handles fullname input change
   */
  const handleFullnameInput = $((e: Event) => {
    state.fullname = (e.target as HTMLInputElement).value;
  });

  /**
   * Handles email input change
   */
  const handleEmailInput = $((e: Event) => {
    state.email = (e.target as HTMLInputElement).value;
  });

  /**
   * Handles subject input change
   */
  const handleSubjectInput = $((e: Event) => {
    state.subject = (e.target as HTMLInputElement).value;
  });

  /**
   * Handles message input change
   */
  const handleMessageInput = $((e: Event) => {
    state.message = (e.target as HTMLTextAreaElement).value;
  });

  return (
    <Section id="contact" className="bg-black dark:bg-white">
      <Container size="full" className="relative z-10 isolate">
        <SectionTitle text="Kontakt" dark={true} />
        <p
          class={cls(
            "text-l lg:text-xl leading-relaxed font-light",
            "mb-4 sm:mb-12",
            "font-mono text-gray-800",
            "content-fade-in"
          )}
        >
          Chcete vedieť o mne viac, potrebujete poradiť alebo chcete rovno
          naviazať spoluprácu? <strong> Neváhajte ma kontaktovať.</strong>
        </p>

        <div
          class={cls(
            "flex items-center justify-start gap-3",
            "mb-10 sm:mb-18",
            "content-fade-in"
          )}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.icon}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              class={cls(
                "group flex items-center justify-center",
                "w-10 h-10 rounded-full",
                "bg-black hover:bg-gray-900",
                "transition-all duration-300 hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-black"
              )}
            >
              <Icon
                name={link.icon}
                cls={cls(
                  "w-5 h-5",
                  "text-white group-hover:text-gray-200",
                  "transition-colors duration-300"
                )}
              />
            </a>
          ))}
        </div>

        <form
          onSubmit$={handleSubmit}
          class={cls(
            "grid grid-cols-1 gap-4 md:gap-6",
            "content-fade-in content-fade-in--entry"
          )}
        >
          <input
            type="hidden"
            name="_subject"
            value="New contact form submission"
          />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_format" value="json" />
          <FormField
            label="HP"
            type="text"
            name="_honey"
            value=""
            onInput$={() => {}}
            className="hidden"
          />
          <FormField
            label="Celé meno"
            type="text"
            name="fullname"
            value={state.fullname}
            onInput$={handleFullnameInput}
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={state.email}
            onInput$={handleEmailInput}
            required
          />
          <FormField
            label="Predmet"
            type="text"
            name="subject"
            value={state.subject}
            onInput$={handleSubjectInput}
            required
          />
          <FormField
            label="Vaša správa"
            type="textarea"
            name="message"
            value={state.message}
            onInput$={handleMessageInput}
            required
          />
          <Button
            type="submit"
            title="Odoslať"
            variant="secondary"
            disabled={state.submitting}
            icon="send"
          >
            {state.submitting ? "Odosielam..." : "Odoslať"}
          </Button>
        </form>
      </Container>
    </Section>
  );
});

export default Contact;
