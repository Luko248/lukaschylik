import type { QRL } from "@builder.io/qwik";

/**
 * Checks URL parameters for form submission flags and shows appropriate alerts
 * 
 * @description This service checks URL parameters for specific flags and triggers 
 * appropriate alert messages. It handles:
 * - formSubmitted: Contact form submissions
 * - newsletterSubscribed: Newsletter subscriptions
 * 
 * @param location - Current location object from useLocation()
 * @param showAlert - Function to display an alert message
 */
export const checkUrlForAlerts = (
  location: URL, 
  showAlert: QRL<(message: string) => void>
): void => {
  // Contact form submission
  if (location.searchParams.has("formSubmitted")) {
    showAlert("Vaša správa bola úspešne odoslaná. Ďakujeme!");
    
    // Clean URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete("formSubmitted");
    window.history.replaceState({}, document.title, url.toString());
  }
  
  // Newsletter subscription
  if (location.searchParams.has("newsletterSubscribed")) {
    showAlert("Úspešne ste sa prihlásili na odber noviniek. Ďakujeme!");
    
    // Clean URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete("newsletterSubscribed");
    window.history.replaceState({}, document.title, url.toString());
  }
};
