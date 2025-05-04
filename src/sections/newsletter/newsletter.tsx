import { component$, useSignal, $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Button, Container, FormField, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";

const Newsletter = component$(() => {
  const email = useSignal("");
  const formState = useStore({
    submitting: false,
    error: "",
    alreadySubscribed: false
  });
  
  // Check if user has already subscribed
  useVisibleTask$(() => {
    const subscribed = localStorage.getItem("newsletter_subscribed") === "true";
    if (subscribed) {
      formState.alreadySubscribed = true;
      email.value = localStorage.getItem("newsletter_email") || "";
    }
  });

  const handleSubmit = $((event: SubmitEvent) => {
    event.preventDefault();
    
    if (!email.value || formState.submitting) return;
    
    formState.submitting = true;
    formState.error = "";

    // Store in localStorage as a backup/fallback
    localStorage.setItem("newsletter_subscribed", "true");
    localStorage.setItem("newsletter_email", email.value);

    // Use the provided Google Apps Script URL
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwIGzmIRjtsm5K5xtgcsRS99kEGgwxJjqjcps7umTuJwyW2d8o87v_AtPQVp4VcWY3g/exec";
    
    fetch(googleScriptUrl, {
      method: "POST",
      mode: "no-cors", // Important for cross-origin requests to Google Scripts
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email.value,
        source: "Website Newsletter",
        timestamp: new Date().toISOString()
      }),
    })
      .then(() => {
        // Because we're using no-cors, we can't actually check the response
        // Just assume success and show the success message
        
        // Clear the form field
        email.value = "";
        
        // Add URL parameter to show success message and redirect
        window.location.href = `${window.location.pathname}?newsletterSubscribed=true`;
      })
      .catch((error) => {
        console.error("Subscription error:", error);
        formState.error = "Nepodarilo sa prihlásiť na odber. Skúste to prosím znova.";
        
        // Even if there's an error, store that they attempted to subscribe
        localStorage.setItem("newsletter_attempted", "true");
      })
      .finally(() => {
        formState.submitting = false;
      });
  });

  return (
    <Section id="contact" className="bg-white">
      <Container size="sm" className="relative z-10 isolate">
        <SectionTitle text="Newsletter" size="sm" center dark />
        
        {formState.alreadySubscribed ? (
          <div class="text-center">
            <p class="text-green-600 font-medium mb-2">Už ste prihlásený na odber noviniek.</p>
            <p class="text-sm mb-4">Email: {email.value}</p>
            <Button 
              type="button" 
              title=" Odhlásiť sa z odberu" 
              variant="primary"
              onClick$={() => {
                localStorage.removeItem("newsletter_subscribed");
                localStorage.removeItem("newsletter_email");
                formState.alreadySubscribed = false;
                email.value = "";
              }}
            >
              Odhlásiť sa z odberu
            </Button>
          </div>
        ) : (
          <>
            <form onSubmit$={handleSubmit} method="post" class="flex flex-row gap-4 sm:gap-6 items-end">
              <FormField
                className="flex-1"
                label="Váš email"
                type="email"
                name="newsletter_email"
                placeholder="john.doe@email.com"
                value={email.value}
                onInput$={(e: any) => { email.value = e.target.value; }}
                required
              />
              <Button 
                type="submit" 
                title="Odoberať" 
                variant="primary"
                disabled={formState.submitting}
              >
                {formState.submitting ? "Odosielam..." : "Odoberať"}
              </Button>
            </form>
            {formState.error && (
              <p class="mt-2 text-red-500 text-sm">{formState.error}</p>
            )}
          </>
        )}
        
        <small className="mt-4 text-center block">Stay updated with our newsletter!</small>
      </Container>
    </Section>
  );
});

export default Newsletter;
