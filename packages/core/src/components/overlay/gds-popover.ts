import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Position } from '../../utils/types.js';

@customElement('gds-popover')
export class GdsPopover extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placement: Position = 'top';
  @property({ type: String }) trigger: 'hover' | 'click' = 'click';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; position: relative; }
      .content {
        position: absolute; z-index: var(--gds-z-dropdown);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); box-shadow: var(--gds-shadow-lg);
        padding: var(--gds-space-4); min-width: 12rem; display: none;
      }
      :host([open]) .content { display: block; }
      .content.placement-top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: var(--gds-space-2); }
      .content.placement-bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: var(--gds-space-2); }
      .content.placement-left { right: 100%; top: 50%; transform: translateY(-50%); margin-right: var(--gds-space-2); }
      .content.placement-right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: var(--gds-space-2); }
      .backdrop { position: fixed; inset: 0; z-index: calc(var(--gds-z-dropdown) - 1); display: none; }
      :host([open]) .backdrop { display: block; }
    `,
  ];

  protected render() {
    return html`
      <span @click=${this._onClick} @mouseenter=${this._onEnter} @mouseleave=${this._onLeave}>
        <slot name="trigger"></slot>
      </span>
      <div class="backdrop" @click=${this._close}></div>
      <div class="content placement-${this.placement}">
        <slot></slot>
      </div>
    `;
  }

  private _onClick() { if (this.trigger === 'click') this.open ? this._close() : this._show(); }
  private _onEnter() { if (this.trigger === 'hover') this._show(); }
  private _onLeave() { if (this.trigger === 'hover') this._close(); }
  private _show() { this.open = true; }
  private _close() { this.open = false; }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-popover': GdsPopover; }
}