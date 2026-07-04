import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Position } from '../../utils/types.js';

@customElement('gds-hovercard')
export class GdsHovercard extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placement: Position = 'top';
  @property({ type: Number }) delay = 200;

  private _timer?: ReturnType<typeof setTimeout>;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; }
      .card {
        position: absolute; z-index: var(--gds-z-dropdown);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg);
        padding: var(--gds-space-4); min-width: 16rem; display: none;
      }
      :host([open]) .card { display: block; }
      .card.placement-top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: var(--gds-space-2); }
      .card.placement-bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: var(--gds-space-2); }
      .card.placement-left { right: 100%; top: 50%; transform: translateY(-50%); margin-right: var(--gds-space-2); }
      .card.placement-right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: var(--gds-space-2); }
    `,
  ];

  protected render() {
    return html`
      <span @mouseenter=${this._onEnter} @mouseleave=${this._onLeave}>
        <slot name="trigger"></slot>
      </span>
      <div class="card placement-${this.placement}" @mouseenter=${this._onEnter} @mouseleave=${this._onLeave}>
        <slot></slot>
      </div>
    `;
  }

  private _onEnter() {
    this._timer = setTimeout(() => { this.open = true; }, this.delay);
  }

  private _onLeave() {
    if (this._timer) clearTimeout(this._timer);
    this.open = false;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-hovercard': GdsHovercard; }
}