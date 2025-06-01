/**
 * Checks if the browser supports CSS scroll-driven animations
 * @returns boolean indicating if scroll-driven animations are supported
 */
export const supportsScrollTimeline = () => {
  if (typeof window === "undefined") return false;

  if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
    return (
      CSS.supports("animation-timeline: scroll()") ||
      CSS.supports("animation-timeline: scroll(block)")
    );
  }

  return false;
};
