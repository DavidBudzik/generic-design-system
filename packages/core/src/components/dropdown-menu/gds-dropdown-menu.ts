import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Position } from '../../utils/types.js';

@customElement('gds-dropdown-menu')
export class GdsDropdownMenu extends GdsBaseElement {
  @property({ type: String }) trigger = '';
  @property({ type: String }) placement: Position = 'bottom-start';
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; }
      .trigger { display: inline-flex; cursor: pointer; }
      .menu {
        position: absolute;
        z-index: var(--gds-z-dropdown);
        min-width: 12rem;
        background: var(--gds-color-surface);
        border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md);
        box-shadow: var(--gds-shadow-lg);
        padding: var(--gds-space-1);
        display: none;
      }
      :host([open]) .menu { display: block; }
      .menu::before { content: ''; position: absolute; inset: 0; border-radius: var(--gds-radius-md); pointer-events: none; }
      ::slotted(gds-item) { display: block; }
      .backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: calc(var(--gds-z-dropdown) - 1);
        display: none;
      }
      :host([open]) .backdrop { display: block; }
    `,
  ];

  protected render() {
    return html`
      <div class="trigger" @click=${this._toggle}>
        ${this.trigger ? html`<span .innerHTML=${this.trigger}></span>` : html`<slot name="trigger"></slot>`}
      </div>
      <div class="backdrop" @click=${this._close}></div>
      <div class="menu" role="menu" @click=${this._close}>
        <slot></slot>
      </div>
    `;
  }

  private _toggle(e: Event) {
    e.stopPropagation();
    this.open = !this.open;
    dispatchEvent(this, 'gds-dropdown-change', { open: this.open });
  }

  private _close() {
    this.open = false;
    dispatchEvent(this, 'gds-dropdown-change', { open: this.open });
  }

  protected firstUpdated() {
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.open) this._close();
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-dropdown-menu': GdsDropdownMenu;
  }
}