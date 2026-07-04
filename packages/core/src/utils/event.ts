/**
 * Event helper utilities for GDS components.
 */

/**
 * Dispatch a custom event from the given element with
 * composed and bubbling by default (typical for component events).
 */
export function dispatchEvent<T = unknown>(
  el: EventTarget,
  name: string,
  detail?: T,
  options: CustomEventInit = {},
): boolean {
  const event = new CustomEvent<T>(name, {
    detail,
    bubbles: true,
    composed: true,
    ...options,
  });
  return el.dispatchEvent(event);
}

/**
 * Add an event listener with automatic cleanup tracking.
 * Returns a cleanup function that removes the listener.
 */
export function addEventListener(
  el: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions,
): () => void {
  el.addEventListener(type, listener, options);
  return () => el.removeEventListener(type, listener, options);
}

export default { dispatchEvent, addEventListener };