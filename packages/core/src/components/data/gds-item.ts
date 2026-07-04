import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-item')
export class GdsItem extends GdsBaseElement {
  @property({ type: String }) icon = '';
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: String }) meta = '';
  @property({ type: Boolean }) interactive = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .item { display: flex; align-items: center; gap: var(--gds-space-3); padding: var(--gds-space-3) var(--gds-space-4); cursor: default; transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .item.interactive { cursor: pointer; }
      .item.interactive:hover { background: var(--gds-color-surface-hover); }
      .icon { flex-shrink: 0; display: inline-flex; color: var(--gds-color-text-muted); }
      .content { flex: 1; min-width: 0; }
      .label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); font-weight: var(--gds-font-weight-medium); }
      .description { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
      .meta { font-size: var(--gds-font-size-xs); color: var(--gds-color-text-subtle); flex-shrink: 0; }
    `,
  ];

  protected render() {
    return html`
      <div class="item ${this.interactive ? 'interactive' : ''}" @click=${this._onClick}>
        ${this.icon ? html`<span class="icon" .innerHTML=${this.icon}></span>` : nothing}
        <div class="content">
          <div class="label">${this.label || html`<slot></slot>`}</div>
          ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
        </div>
        ${this.meta ? html`<span class="meta">${this.meta}</span>` : nothing}
      </div>
    `;
  }

  private _onClick() {
    if (!this.interactive) return;
    dispatchEvent(this, 'select', { label: this.label });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-item': GdsItem; }
}