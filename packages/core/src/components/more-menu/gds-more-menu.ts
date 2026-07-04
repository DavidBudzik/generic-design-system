import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { DropdownItem, Position } from '../../utils/types.js';

@customElement('gds-more-menu')
export class GdsMoreMenu extends GdsBaseElement {
  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: String }) placement: Position = 'bottom-end';
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; }
      .trigger-btn {
        display: inline-flex; align-items: center; justify-content: center;
        width: 2rem; height: 2rem; border: none; border-radius: var(--gds-radius-md);
        background: transparent; color: var(--gds-color-text-muted); cursor: pointer;
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .trigger-btn:hover { background: var(--gds-color-bg-muted); color: var(--gds-color-text); }
      .trigger-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .menu {
        position: absolute; z-index: var(--gds-z-dropdown); min-width: 12rem;
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg);
        padding: var(--gds-space-1); display: none;
        right: 0;
      }
      :host([open]) .menu { display: block; }
      .backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: calc(var(--gds-z-dropdown) - 1); display: none; }
      :host([open]) .backdrop { display: block; }
      .menu-item {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-3); border-radius: var(--gds-radius-sm);
        cursor: pointer; color: var(--gds-color-text); font-size: var(--gds-font-size-sm);
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .menu-item:hover { background: var(--gds-color-bg-muted); }
      .menu-item.disabled { opacity: 0.5; cursor: not-allowed; }
      .menu-item .icon { display: inline-flex; flex-shrink: 0; }
      .divider { height: 1px; background: var(--gds-color-border); margin: var(--gds-space-1) 0; }
    `,
  ];

  protected render() {
    return html`
      <button class="trigger-btn" @click=${this._toggle} aria-label="More options" aria-haspopup="menu" ?aria-expanded=${this.open}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
      </button>
      <div class="backdrop" @click=${this._close}></div>
      <div class="menu" role="menu">
        ${this.items.map((item) =>
          item.divider
            ? html`<div class="divider"></div>`
            : html`<div
                class="menu-item ${item.disabled ? 'disabled' : ''}"
                role="menuitem"
                @click=${() => this._handleClick(item)}
              >
                ${item.icon ? html`<span class="icon" .innerHTML=${item.icon}></span>` : nothing}
                <span>${item.label}</span>
              </div>`,
        )}
      </div>
    `;
  }

  private _toggle(e: Event) {
    e.stopPropagation();
    this.open = !this.open;
    dispatchEvent(this, 'gds-more-menu-change', { open: this.open });
  }

  private _close() {
    this.open = false;
    dispatchEvent(this, 'gds-more-menu-change', { open: this.open });
  }

  private _handleClick(item: DropdownItem) {
    if (item.disabled) return;
    item.onClick?.();
    this._close();
  }

  protected firstUpdated() {
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.open) this._close();
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-more-menu': GdsMoreMenu;
  }
}