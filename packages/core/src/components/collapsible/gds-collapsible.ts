import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-collapsible')
export class GdsCollapsible extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) header = '';
  @property({ type: Boolean }) disabled = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .collapsible { border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md); overflow: hidden; }
      .header {
        display: flex; align-items: center; justify-content: space-between;
        padding: var(--gds-space-3) var(--gds-space-4); cursor: pointer;
        background: var(--gds-color-surface); font-weight: var(--gds-font-weight-semibold);
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text);
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .header:hover { background: var(--gds-color-surface-hover); }
      .header:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      :host([disabled]) .header { cursor: not-allowed; opacity: 0.5; }
      .chevron { transition: transform var(--gds-duration-normal) var(--gds-ease-default); }
      :host([open]) .chevron { transform: rotate(180deg); }
      .content {
        display: none; padding: var(--gds-space-4);
        border-top: 1px solid var(--gds-color-border);
      }
      :host([open]) .content { display: block; }
    `,
  ];

  protected render() {
    return html`
      <div class="collapsible">
        <div
          class="header"
          @click=${this._toggle}
          role="button"
          tabindex="0"
          aria-expanded=${this.open}
          ?aria-disabled=${this.disabled}
          @keydown=${this._onKey}
        >
          <span>${this.header || html`<slot name="header"></slot>`}</span>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    dispatchEvent(this, 'change', { open: this.open });
  }

  private _onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._toggle(); }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-collapsible': GdsCollapsible; }
}