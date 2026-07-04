import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Position } from '../../utils/types.js';

@customElement('gds-tooltip')
export class GdsTooltip extends GdsBaseElement {
  @property({ type: String }) content = '';
  @property({ type: String }) placement: Position = 'top';
  @property({ type: String }) trigger: 'hover' | 'click' = 'hover';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; }
      .tip {
        position: absolute; z-index: var(--gds-z-dropdown);
        background: var(--gds-color-text); color: var(--gds-color-text-inverse);
        padding: var(--gds-space-1) var(--gds-space-2); border-radius: var(--gds-radius-sm);
        font-size: var(--gds-font-size-xs); white-space: nowrap; pointer-events: none;
        opacity: 0; transition: opacity var(--gds-duration-fast) var(--gds-ease-default);
      }
      .tip.visible { opacity: 1; }
      .tip.placement-top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: var(--gds-space-2); }
      .tip.placement-bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: var(--gds-space-2); }
      .tip.placement-left { right: 100%; top: 50%; transform: translateY(-50%); margin-right: var(--gds-space-2); }
      .tip.placement-right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: var(--gds-space-2); }
    `,
  ];

  private _visible = false;

  protected render() {
    return html`
      <span @mouseenter=${this._onEnter} @mouseleave=${this._onLeave} @click=${this._onClick}>
        <slot></slot>
      </span>
      <span class="tip placement-${this.placement} ${this._visible ? 'visible' : ''}" role="tooltip">${this.content}</span>
    `;
  }

  private _onEnter() {
    if (this.trigger === 'hover') this._show();
  }

  private _onLeave() {
    if (this.trigger === 'hover') this._hide();
  }

  private _onClick() {
    if (this.trigger === 'click') this._visible ? this._hide() : this._show();
  }

  private _show() { this._visible = true; this.requestUpdate(); }
  private _hide() { this._visible = false; this.requestUpdate(); }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-tooltip': GdsTooltip; }
}