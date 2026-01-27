import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button, Container, FormField, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";
import { cls } from "~/utils";

const MAILCHIMP_STORAGE_KEY = "newsletter_subscribed";
const MAILCHIMP_EMAIL_KEY = "newsletter_email";
const MAILCHIMP_FORM_URL =
  "https://lukaschylik.us6.list-manage.com/subscribe/post?u=e4c1b2f028f9fc3c28ad28630&id=90b3c6481a&f_id=00d309e3f0";
const MAILCHIMP_HONEYPOT_FIELD =
  "b_e4c1b2f028f9fc3c28ad28630_90b3c6481a";

/**
 * Newsletter subscription component
 * Handles subscribe/unsubscribe with localStorage persistence
 */
const Newsletter = component$(() => {
  const nav = useNavigate();
  const state = useStore({
    email: "",
    subscribedEmail: "",
    isSubscribed: false,
    submitting: false,
    error: "",
  });

  /**
   * Check localStorage for existing subscription on mount
   */
  useVisibleTask$(() => {
    const subscribed = localStorage.getItem(MAILCHIMP_STORAGE_KEY) === "true";
    const savedEmail = localStorage.getItem(MAILCHIMP_EMAIL_KEY) || "";

    if (subscribed && savedEmail) {
      state.isSubscribed = true;
      state.subscribedEmail = savedEmail;
    }
  });

  /**
   * Handles email input change
   */
  const handleEmailInput = $((e: Event) => {
    state.email = (e.target as HTMLInputElement).value;
  });

  /**
   * Handles newsletter subscription
   */
  const handleSubscribe = $(async (event: SubmitEvent) => {
    event.preventDefault();

    if (!state.email || state.submitting) return;

    state.submitting = true;
    state.error = "";

    try {
      const formData = new FormData();
      formData.append("EMAIL", state.email);
      // Bot trap required by Mailchimp.
      formData.append(MAILCHIMP_HONEYPOT_FIELD, "");

      await fetch(MAILCHIMP_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      localStorage.setItem(MAILCHIMP_STORAGE_KEY, "true");
      localStorage.setItem(MAILCHIMP_EMAIL_KEY, state.email);

      state.email = "";

      const url = new URL(window.location.href);
      url.searchParams.set("newsletterSubscribed", "true");
      await nav(`${url.pathname}?${url.searchParams.toString()}`);

      state.isSubscribed = true;
      state.subscribedEmail = localStorage.getItem(MAILCHIMP_EMAIL_KEY) || "";
    } catch (error) {
      console.error("Subscription error:", error);
      state.error = "Nepodarilo sa prihlásiť na odber. Skúste to prosím znova.";
    } finally {
      state.submitting = false;
    }
  });

  /**
   * Handles newsletter unsubscription
   */
  const handleUnsubscribe = $(async () => {
    localStorage.removeItem(MAILCHIMP_STORAGE_KEY);
    localStorage.removeItem(MAILCHIMP_EMAIL_KEY);

    state.isSubscribed = false;
    state.subscribedEmail = "";
    state.email = "";

    const url = new URL(window.location.href);
    url.searchParams.set("newsletterUnsubscribed", "true");
    await nav(`${url.pathname}?${url.searchParams.toString()}`);
  });

  return (
    <Section id="newsletter" fullHeight={false}>
      <Container size="sm" className="relative z-10 isolate">
        <SectionTitle text="Newsletter" size="sm" center />

        {state.isSubscribed ? (
          <div class="text-center">
            <p
              class={cls(
                "font-medium mb-2",
                "text-green-600 dark:text-green-400"
              )}
            >
              Už ste prihlásený na odber noviniek.
            </p>
            <p class={cls("text-sm mb-6", "text-gray-600 dark:text-gray-400")}>
              Email: <strong>{state.subscribedEmail}</strong>
            </p>
            <Button
              type="button"
              title="Odhlásiť sa z odberu"
              variant="secondary"
              onClick$={handleUnsubscribe}
            >
              Odhlásiť sa z odberu
            </Button>
          </div>
        ) : (
          <>
            <form
              preventdefault:submit
              onSubmit$={handleSubscribe}
              method="post"
              class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-end"
            >
              <div aria-hidden="true" style="position:absolute; left:-5000px;">
                <input
                  type="text"
                  name={MAILCHIMP_HONEYPOT_FIELD}
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>
              <FormField
                className="flex-1"
                label="Váš email"
                type="email"
                name="newsletter_email"
                placeholder="john.doe@email.com"
                value={state.email}
                onInput$={handleEmailInput}
                required
              />
              <Button
                type="submit"
                title="Odoberať"
                variant="secondary"
                disabled={state.submitting}
              >
                {state.submitting ? "Odosielam..." : "Odoberať"}
              </Button>
            </form>
            {state.error && (
              <p class="mt-2 text-red-500 dark:text-red-400 text-sm">
                {state.error}
              </p>
            )}
          </>
        )}

        <small
          class={cls(
            "mt-6 text-center block",
            "text-gray-500 dark:text-gray-400"
          )}
        >
          Buďte informovaní o novinkách a článkoch!
        </small>
      </Container>
    </Section>
  );
});

export default Newsletter;
