import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

export interface ListItemData {
  icon?: string;
  label: string;
  description?: string;
  meta?: string;
  interactive?: boolean;
}

@customElement('gds-list')
export class GdsList extends GdsBaseElement {
  @property({ type: Array }) items: ListItemData[] = [];
  @property({ type: Boolean }) divided = true;
  @property({ type: Boolean }) interactive = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      ul { list-style: none; padding: 0; margin: 0; border-radius: var(--gds-radius-md); overflow: hidden; background: var(--gds-color-surface); }
      li { display: flex; align-items: center; gap: var(--gds-space-3); padding: var(--gds-space-3) var(--gds-space-4); cursor: default; transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      li.divided { border-bottom: 1px solid var(--gds-color-border); }
      li:last-child.divided { border-bottom: none; }
      li.interactive { cursor: pointer; }
      li.interactive:hover { background: var(--gds-color-surface-hover); }
      .icon { flex-shrink: 0; display: inline-flex; color: var(--gds-color-text-muted); }
      .content { flex: 1; min-width: 0; }
      .label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); font-weight: var(--gds-font-weight-medium); }
      .description { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
      .meta { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-subtle); flex-shrink: 0; }
    `,
  ];

  protected render() {
    return html`
      <ul>
        ${this.items.map((item, i) => html`
          <li
            class=${`${this.divided ? 'divided' : ''} ${item.interactive || this.interactive ? 'interactive' : ''}`}
            @click=${() => this._onClick(item, i)}
          >
            ${item.icon ? html`<span class="icon" .innerHTML=${item.icon}></span>` : nothing}
            <div class="content">
              <div class="label">${item.label}</div>
              ${item.description ? html`<div class="description">${item.description}</div>` : nothing}
            </div>
            ${item.meta ? html`<span class="meta">${item.meta}</span>` : nothing}
          </li>
        `)}
      </ul>
    `;
  }

  private _onClick(item: ListItemData, index: number) {
    if (!(item.interactive || this.interactive)) return;
    dispatchEvent(this, 'select', { item, index });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-list': GdsList; }
}