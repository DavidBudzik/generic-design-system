import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { DropdownItem } from '../../utils/types.js';

@customElement('gds-context-menu')
export class GdsContextMenu extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;
  @property({ type: Array }) items: DropdownItem[] = [];

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: contents; }
      .menu {
        position: fixed; z-index: var(--gds-z-dropdown);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg);
        padding: var(--gds-space-1); min-width: 12rem; display: none;
      }
      :host([open]) .menu { display: block; }
      .menu-item {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); border-radius: var(--gds-radius-sm);
        cursor: pointer; color: var(--gds-color-text); font-size: var(--gds-font-size-sm);
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .menu-item:hover { background: var(--gds-color-bg-muted); }
      .menu-item.disabled { opacity: 0.5; cursor: not-allowed; }
      .divider { height: 1px; background: var(--gds-color-border); margin: var(--gds-space-1) 0; }
      .backdrop { position: fixed; inset: 0; z-index: calc(var(--gds-z-dropdown) - 1); display: none; }
      :host([open]) .backdrop { display: block; }
    `,
  ];

  protected render() {
    return html`
      <div class="backdrop" @click=${this._close}></div>
      <div class="menu" style="left: ${this.x}px; top: ${this.y}px;">
        ${this.items.map((item) =>
          item.divider
            ? html`<div class="divider"></div>`
            : html`<div
                class="menu-item ${item.disabled ? 'disabled' : ''}"
                @click=${() => this._handleClick(item)}
              >
                ${item.icon ? html`<span .innerHTML=${item.icon}></span>` : nothing}
                <span>${item.label}</span>
              </div>`,
        )}
      </div>
    `;
  }

  private _handleClick(item: DropdownItem) {
    if (item.disabled) return;
    item.onClick?.();
    this._close();
  }

  private _close() {
    this.open = false;
    dispatchEvent(this, 'close', {});
  }

  protected firstUpdated() {
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.open) this._close();
    });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-context-menu': GdsContextMenu; }
}