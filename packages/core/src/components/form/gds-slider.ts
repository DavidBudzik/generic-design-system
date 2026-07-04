import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-slider')
export class GdsSlider extends GdsBaseElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showValue = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .wrapper { display: flex; align-items: center; gap: var(--gds-space-3); }
      .slider-container { flex: 1; position: relative; }
      input[type="range"] {
        width: 100%; -webkit-appearance: none; appearance: none; height: 6px;
        background: var(--gds-color-bg-muted); border-radius: var(--gds-radius-full); outline: none;
      }
      input[type="range"]:disabled { opacity: 0.5; cursor: not-allowed; }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none; width: 1.25rem; height: 1.25rem;
        border-radius: var(--gds-radius-full); background: var(--gds-color-primary); cursor: pointer;
        border: 2px solid var(--gds-color-surface); box-shadow: var(--gds-shadow-sm);
        transition: transform var(--gds-duration-fast) var(--gds-ease-default);
      }
      input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.15); }
      input[type="range"]::-moz-range-thumb {
        width: 1.25rem; height: 1.25rem; border-radius: var(--gds-radius-full);
        background: var(--gds-color-primary); cursor: pointer; border: 2px solid var(--gds-color-surface);
      }
      input[type="range"]:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .value-display { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); font-weight: var(--gds-font-weight-semibold); min-width: 3rem; text-align: right; }
    `,
  ];

  protected render() {
    return html`
      <div class="wrapper">
        <div class="slider-container">
          <input
            type="range"
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${String(this.value)}
            ?disabled=${this.disabled}
            @input=${this._onInput}
            @change=${this._onChange}
            aria-valuenow=${this.value}
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
          />
        </div>
        ${this.showValue ? html`<span class="value-display">${this.value}</span>` : nothing}
      </div>
    `;
  }

  private _onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = parseFloat(input.value);
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onChange() {
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-slider': GdsSlider; }
}