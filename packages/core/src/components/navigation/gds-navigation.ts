import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Orientation } from '../../utils/types.js';

export interface NavItem {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}

@customElement('gds-navigation')
export class GdsNavigation extends GdsBaseElement {
  @property({ type: String }) orientation: Orientation = 'horizontal';
  @property({ type: Array }) items: NavItem[] = [];

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      nav { display: flex; gap: var(--gds-space-1); }
      :host([orientation='horizontal']) nav { flex-direction: row; }
      :host([orientation='vertical']) nav { flex-direction: column; }
      .nav-item {
        display: flex; align-items: center; gap: var(--gds-space-2);
        padding: var(--gds-space-2) var(--gds-space-4); cursor: pointer;
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text-muted);
        border: none; background: transparent; border-radius: var(--gds-radius-md);
        transition: all var(--gds-duration-fast) var(--gds-ease-default); text-decoration: none;
        font-weight: var(--gds-font-weight-medium); white-space: nowrap;
      }
      .nav-item:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .nav-item.active { color: var(--gds-color-primary); background: rgba(37,99,235,0.08); }
      .nav-item:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
    `,
  ];

  protected render() {
    return html`
      <nav role="navigation">
        ${this.items.map((item) => html`
          ${item.href
            ? html`<a href=${item.href} class="nav-item ${item.active ? 'active' : ''}">${item.icon ? html`<span .innerHTML=${item.icon}></span>` : nothing}${item.label}</a>`
            : html`<button class="nav-item ${item.active ? 'active' : ''}" @click=${() => this._click(item)}>${item.icon ? html`<span .innerHTML=${item.icon}></span>` : nothing}${item.label}</button>`}
        `)}
        <slot></slot>
      </nav>
    `;
  }

  private _click(item: NavItem) {
    item.onClick?.();
    dispatchEvent(this, 'navigate', { item });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-navigation': GdsNavigation; }
}