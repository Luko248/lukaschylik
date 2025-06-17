import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Container, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";

declare global {
  interface Window {
    Cal: any;
  }
}

const loadCalcomScript = () => {
  if (window.Cal?.loaded) return;

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.innerHTML = `
    (function (C, A, L) { 
      let p = function (a, ar) { a.q.push(ar); }; 
      let d = C.document; 
      C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
          cal.ns = {}; 
          cal.q = cal.q || []; 
          d.head.appendChild(d.createElement("script")).src = A; 
          cal.loaded = true; 
        } 
        if (ar[0] === L) { 
          const api = function () { p(api, arguments); }; 
          const namespace = ar[1]; 
          api.q = api.q || []; 
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar); 
          return;
        } 
        p(cal, ar); 
      }; 
    })(window, "https://app.cal.com/embed/embed.js", "init");
    
    // Initialize Cal.com
    Cal("init", "60-min-meeting", {origin:"https://cal.com"});
    
    // Setup inline calendar
    Cal.ns["60-min-meeting"]("inline", {
      elementOrSelector: "#my-cal-inline",
      config: {"layout":"month_view"},
      calLink: "depthark/60-min-meeting",
    });
    
    // Configure UI
    Cal.ns["60-min-meeting"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
  `;

  document.head.appendChild(script);
  return script;
};

const Reservation = component$(() => {
  const hasScrolled = useSignal(false);
  const containerRef = useSignal<HTMLElement>();

  useVisibleTask$(
    ({ cleanup }) => {
      if (hasScrolled.value) return;

      const handleScroll = () => {
        if (hasScrolled.value) return;

        hasScrolled.value = true;
        const script = loadCalcomScript();

        cleanup(() => {
          if (script && document.head.contains(script)) {
            document.head.removeChild(script);
          }
        });
      };

      // Use passive event listener for better scroll performance
      const options = { passive: true } as AddEventListenerOptions;
      window.addEventListener("scroll", handleScroll, options);

      // Also trigger on touchmove for mobile devices
      window.addEventListener("touchmove", handleScroll, options);

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", handleScroll, options);
        window.removeEventListener("touchmove", handleScroll, options);
      };
    },
    { strategy: "document-ready" },
  );

  // Load immediately if user has already scrolled
  useVisibleTask$(
    ({ track }) => {
      track(() => hasScrolled);

      if (window.scrollY > 0) {
        hasScrolled.value = true;
        loadCalcomScript();
      }
    },
    { strategy: "document-idle" },
  );

  return (
    <Section id="reservation">
      <Container size="full" className="relative z-10">
        <SectionTitle text="Rezervácia" className="text-center mb-8" />
        <p class="text-l lg:text-xl text-center leading-relaxed font-light mb-8 md:mb-16 mx-auto text-gray-300 font-mono">
          Pre rezerváciu 60 minútnej konzultácie kliknite na kalendar a vyberte
          dátum a čas.
        </p>
        <div
          id="my-cal-inline"
          class="min-h-[570px] max-w-full overflow-clip"
          style={{
            "--cal-brand": "#2563eb",
            "--cal-brand-emphasis": "#1e40af",
            "--cal-brand-text": "#ffffff",
            "--cal-brand-subtle": "#dbeafe",
          }}
        />
      </Container>
    </Section>
  );
});

export default Reservation;
