import { css } from 'lit';

/**
 * Lit CSS template containing the GDS reset rules.
 * Embedded directly so no runtime CSS import is needed.
 */
export const resetStyles = css`
  :host {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  slot {
    display: contents;
  }
  [hidden] {
    display: none !important;
  }
  :focus-visible {
    outline: 2px solid var(--gds-color-primary);
    outline-offset: 2px;
  }
`;