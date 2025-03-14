
/**
 * Utility function to add a delay to animations
 * @param delay - The delay in milliseconds
 * @returns A CSS class string with the appropriate delay
 */
export const animateWithDelay = (delay: number): string => {
  return `transition-all duration-500 ease-out delay-[${delay}ms]`;
};

/**
 * Utility function to check if an element is in the viewport
 * @param el - The element to check
 * @param offset - Optional offset to trigger animation before element is fully visible
 * @returns Boolean indicating if element is visible
 */
export const isElementInViewport = (el: Element, offset = 0): boolean => {
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
    rect.right >= 0
  );
};
