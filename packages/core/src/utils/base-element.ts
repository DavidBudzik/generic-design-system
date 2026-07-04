import { LitElement, adoptStyles } from 'lit';
import { resetStyles } from '../styles/reset-styles.js';
import { tokenStyles } from '../styles/token-styles.js';

/**
 * Base element for all GDS components.
 * Provides shared styles (reset + tokens) and theme utilities.
 *
 * Components extending this class should combine their own styles
 * with `GdsBaseElement.sharedStyles`:
 *
 * ```ts
 * static styles = [
 *   ...GdsBaseElement.styles,
 *   css`...component-specific styles...`
 * ];
 * ```
 */
export class GdsBaseElement extends LitElement {
  /**
   * Shared styles applied to every GDS component.
   * Includes the reset and all design tokens so that
   * each component in shadow DOM has access to tokens.
   */
  static styles = [resetStyles, tokenStyles];

  /**
   * Returns the active theme name by inspecting the document
   * for a `data-theme` attribute or falling back to 'light'.
   */
  getTheme(): string {
    return (
      document.documentElement.getAttribute('data-theme') ||
      'light'
    );
  }

  /**
   * Apply shared styles to a given document/ShadowRoot.
   * Useful for adopting token CSS into documents that
   * need the variables outside shadow DOM.
   */
  static applySharedStyles(root: DocumentOrShadowRoot): void {
    adoptStyles(root as ShadowRoot, [tokenStyles]);
  }
}

export default GdsBaseElement;