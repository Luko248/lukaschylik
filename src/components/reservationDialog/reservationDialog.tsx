import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Button, Icon } from "~/components";
import "./reservationDialog.types";

const loadCalcomScript = () => {
  if (window.Cal?.loaded) return null;

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

export const ReservationDialog = component$(() => {
  useVisibleTask$(
    ({ cleanup }) => {
      const script = loadCalcomScript();

      cleanup(() => {
        if (script && document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    },
    { strategy: "document-ready" },
  );

  return (
    <dialog
      id="reservationModal"
      closedby="any"
      class="bg-black-800 mx-auto my-auto max-w-full px-4 md:px-8 pt-8 md:pt-16 pb-8 rounded-lg">
      <Button
        className="absolute top-4 right-4 text-white p-0 scale-95 hover:scale-100 opacity-90 hover:opacity-100"
        variant="plain"
        title="Zatvoriť rezerváciu"
        aria-label="Zatvoriť rezerváciu"
        command="close"
        commandfor="reservationModal">
        <Icon name="close" size="1.5rem" aria-hidden="true" />
      </Button>
      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 text-white">
        Rezervácia
      </h3>
      <p class="text-l lg:text-xl text-center leading-relaxed font-light mb-8 md:mb-16 mx-auto text-gray-300 font-mono content-fade-in content-fade-in--bottom text-pretty">
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
    </dialog>
  );
});
