import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-selectable-card')
export class GdsSelectableCard extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; cursor: pointer; }
      :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
      .card {
        display: block; background: var(--gds-color-surface);
        border: 2px solid var(--gds-color-border); border-radius: var(--gds-radius-lg);
        padding: var(--gds-space-6); position: relative;
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .card:hover { border-color: var(--gds-color-primary); }
      :host([selected]) .card { border-color: var(--gds-color-primary); background: rgba(37,99,235,0.04); }
      .check {
        position: absolute; top: var(--gds-space-4); right: var(--gds-space-4);
        width: 1.25rem; height: 1.25rem; border-radius: var(--gds-radius-full);
        border: 2px solid var(--gds-color-border-strong); display: none;
        align-items: center; justify-content: center;
      }
      :host([selected]) .check { display: flex; background: var(--gds-color-primary); border-color: var(--gds-color-primary); color: var(--gds-color-on-primary); }
      :host([selected]) .check svg { display: block; }
      .check svg { display: none; }
    `,
  ];

  protected render() {
    return html`
      <div class="card" @click=${this._toggle} role="option" aria-selected=${this.selected} ?aria-disabled=${this.disabled}>
        <div class="check">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <slot></slot>
      </div>
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.selected = !this.selected;
    dispatchEvent(this, 'change', { selected: this.selected, value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-selectable-card': GdsSelectableCard; }
}