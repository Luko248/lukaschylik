// ... existing code ...

/**
 * Initializes a header flag by adding a data-initialize attribute to the header element
 * after a 500ms delay. This function only runs in the browser environment.
 *
 * @example
 * // Usage in a Qwik component
 * const headerRef = useSignal<Element>();
 *
 * useVisibleTask$(() => {
 *   initializeHeaderFlag(headerRef.value);
 * });
 *
 * return <header ref={headerRef}>...</header>
 *
 * @param element - The header element reference
 * @returns {void}
 */
export function initializeHeaderFlag(element: Element | undefined) {
  if (typeof window === 'undefined' || !element) return

  const timeoutId = setTimeout(() => {
    requestAnimationFrame(() => {
      element.setAttribute('data-initialize', 'true')
    })
  }, 1000)

  return () => {
    clearTimeout(timeoutId)
  }
}

// ... existing code ...
