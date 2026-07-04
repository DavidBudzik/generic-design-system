import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@customElement('gds-breadcrumbs')
export class GdsBreadcrumbs extends GdsBaseElement {
  @property({ type: Array }) items: BreadcrumbItem[] = [];

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      nav { display: flex; align-items: center; gap: var(--gds-space-1); font-size: var(--gds-font-size-sm); }
      a { color: var(--gds-color-text-muted); text-decoration: none; transition: color var(--gds-duration-fast) var(--gds-ease-default); }
      a:hover { color: var(--gds-color-primary); }
      .current { color: var(--gds-color-text); font-weight: var(--gds-font-weight-medium); }
      .sep { color: var(--gds-color-text-subtle); user-select: none; }
    `,
  ];

  protected render() {
    return html`
      <nav aria-label="Breadcrumb">
        <ol style="display:flex;align-items:center;gap:var(--gds-space-1);list-style:none;">
          ${this.items.map((item, i) => html`
            <li style="display:flex;align-items:center;gap:var(--gds-space-1);">
              ${i > 0 ? html`<span class="sep">/</span>` : nothing}
              ${item.href && i < this.items.length - 1
                ? html`<a href=${item.href}>${item.label}</a>`
                : html`<span class="current" aria-current="page">${item.label}</span>`}
            </li>
          `)}
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-breadcrumbs': GdsBreadcrumbs; }
}