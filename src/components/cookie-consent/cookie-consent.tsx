import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Container } from "~/components";

type ConsentPrefs = {
  analytics: boolean;
};

const STORAGE_KEY = "cookie-consent-v1";

const readPrefs = (): ConsentPrefs | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === "boolean") {
      return { analytics: parsed.analytics } as ConsentPrefs;
    }
    return null;
  } catch {
    return null;
  }
};

const persistPrefs = (prefs: ConsentPrefs) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...prefs, ts: Date.now() })
    );
  } catch {}
};

export default component$(() => {
  const showBanner = useSignal(false);
  const prefsDialogRef = useSignal<HTMLDialogElement>();
  const analytics = useSignal(false);

  const applyConsent = $((prefs: ConsentPrefs) => {
    if (typeof window === "undefined") return;
    const w = window as any;
    const gtag =
      w.gtag || ((...args: any[]) => w.dataLayer && w.dataLayer.push(args));
    const update = {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: prefs.analytics ? "granted" : "denied",
    } as const;
    try {
      gtag("consent", "update", update);
    } catch {}
  });

  const acceptAll = $(async () => {
    analytics.value = true;
    const prefs = { analytics: true };
    persistPrefs(prefs);
    await applyConsent(prefs);
    showBanner.value = false;
    prefsDialogRef.value?.close();
  });

  const denyAll = $(async () => {
    analytics.value = false;
    const prefs = { analytics: false };
    persistPrefs(prefs);
    await applyConsent(prefs);
    showBanner.value = false;
    prefsDialogRef.value?.close();
  });

  const savePrefs = $(async () => {
    const prefs = { analytics: analytics.value };
    persistPrefs(prefs);
    await applyConsent(prefs);
    showBanner.value = false;
    prefsDialogRef.value?.close();
  });

  useVisibleTask$(
    () => {
      const stored = readPrefs();
      if (stored) {
        analytics.value = stored.analytics;
        // Re-apply consent on hydration (no-op if already applied)
        applyConsent(stored);
        showBanner.value = false;
      } else {
        showBanner.value = true;
      }

      const listener = () => {
        prefsDialogRef.value?.showModal();
      };
      window.addEventListener("open-cookie-preferences", listener);
      return () =>
        window.removeEventListener("open-cookie-preferences", listener);
    },
    { strategy: "document-ready" }
  );

  return (
    <>
      {showBanner.value && (
        <div class="fixed inset-x-0 bottom-0 z-[300]">
          <div class="relative bg-neutral-900/95 border-t border-neutral-800 text-neutral-100">
            <Container size="md" className="py-4">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div class="text-sm leading-relaxed text-neutral-300">
                  <strong class="text-neutral-100">Súbory cookie</strong>
                  <span class="mx-2">—</span>
                  Používam iba analytické cookies (Google Analytics) na meranie
                  návštevnosti a zlepšenie webu. Môžete prijať všetky, odmietnuť
                  alebo upraviť nastavenia.
                </div>
                <div class="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick$={denyAll}
                    class="px-3 py-2 text-xs md:text-sm rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
                  >
                    Odmietnuť
                  </button>
                  <button
                    type="button"
                    onClick$={() => prefsDialogRef.value?.showModal()}
                    class="px-3 py-2 text-xs md:text-sm rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
                  >
                    Nastavenia
                  </button>
                  <button
                    type="button"
                    onClick$={acceptAll}
                    class="px-3 py-2 text-xs md:text-sm rounded-md bg-white text-black hover:bg-neutral-200"
                  >
                    Prijať všetko
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}

      <dialog
        ref={prefsDialogRef}
        class="bg-neutral-900 text-neutral-100 w-[min(92vw,640px)] max-w-[92vw] md:max-w-[640px] rounded-xl border border-neutral-800 p-0 mx-auto my-auto"
      >
        <div class="p-5 md:p-6 border-b border-neutral-800">
          <h2 class="text-lg font-semibold">Nastavenia súborov cookie</h2>
          <p class="mt-1 text-sm text-neutral-300">
            Vyberte, ktoré typy cookies chcete povoliť. Nevyhnutné cookies sú
            vždy povolené.
          </p>
        </div>
        <div class="p-5 md:p-6 flex flex-col gap-4">
          <div class="flex items-start gap-3">
            <input
              id="necessary"
              type="checkbox"
              checked
              disabled
              class="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-800"
            />
            <div class="text-sm">
              <label for="necessary" class="font-medium text-neutral-100">
                Nevyhnutné
              </label>
              <p class="text-neutral-300">
                Potrebné na správne fungovanie webu. Nemožno vypnúť.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <input
              id="analytics"
              type="checkbox"
              checked={analytics.value}
              onInput$={(e, t) =>
                (analytics.value = (e.target as HTMLInputElement).checked)
              }
              class="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-800"
            />
            <div class="text-sm">
              <label for="analytics" class="font-medium text-neutral-100">
                Analytické (Google Analytics)
              </label>
              <p class="text-neutral-300">
                Pomáhajú pochopiť, ako je web používaný. Bez reklamných cookies.
              </p>
            </div>
          </div>
        </div>
        <div class="p-5 md:p-6 flex items-center justify-end gap-2 border-t border-neutral-800">
          <button
            type="button"
            onClick$={() => prefsDialogRef.value?.close()}
            class="px-3 py-2 text-sm rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
          >
            Zatvoriť
          </button>
          <button
            type="button"
            onClick$={denyAll}
            class="px-3 py-2 text-sm rounded-md border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
          >
            Odmietnuť všetko
          </button>
          <button
            type="button"
            onClick$={savePrefs}
            class="px-3 py-2 text-sm rounded-md bg-white text-black hover:bg-neutral-200"
          >
            Uložiť nastavenia
          </button>
        </div>
      </dialog>
    </>
  );
});
