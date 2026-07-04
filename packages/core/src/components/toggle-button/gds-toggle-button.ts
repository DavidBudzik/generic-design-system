import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Size, Variant } from '../../utils/types.js';

@customElement('gds-toggle-button')
export class GdsToggleButton extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) pressed = false;
  @property({ type: String }) label = '';
  @property({ type: String }) variant: Variant = 'secondary';
  @property({ type: String }) size: Size = 'md';
  @property({ type: String }) value = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; }
      button {
        display: inline-flex; align-items: center; justify-content: center;
        gap: var(--gds-space-2); border: 1px solid transparent; border-radius: var(--gds-radius-md);
        cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default);
        background: transparent; color: var(--gds-color-text);
      }
      button.size-sm { padding: var(--gds-space-1) var(--gds-space-3); font-size: var(--gds-font-size-xs); }
      button.size-md { padding: var(--gds-space-2) var(--gds-space-4); font-size: var(--gds-font-size-sm); }
      button.size-lg { padding: var(--gds-space-3) var(--gds-space-5); font-size: var(--gds-font-size-md); }
      button.size-xl { padding: var(--gds-space-4) var(--gds-space-6); font-size: var(--gds-font-size-lg); }
      button:not(.pressed):hover { background: var(--gds-color-bg-muted); }
      button.pressed {
        background: var(--gds-color-primary); color: var(--gds-color-on-primary);
        border-color: var(--gds-color-primary);
      }
      button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
    `,
  ];

  protected render() {
    return html`
      <button
        class="size-${this.size} ${this.pressed ? 'pressed' : ''}"
        aria-pressed=${this.pressed}
        @click=${this._toggle}
      >
        ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
      </button>
    `;
  }

  private _toggle() {
    this.pressed = !this.pressed;
    dispatchEvent(this, 'change', { pressed: this.pressed, value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-toggle-button': GdsToggleButton;
  }
}