import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Orientation } from '../../utils/types.js';

@customElement('gds-toggle-button-group')
export class GdsToggleButtonGroup extends GdsBaseElement {
  @property({ type: Array }) value: string[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) orientation: Orientation = 'horizontal';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; gap: var(--gds-space-2); }
      :host([orientation='horizontal']) { flex-direction: row; }
      :host([orientation='vertical']) { flex-direction: column; }
    `,
  ];

  protected render() {
    return html`<slot @click=${this._handleClick}></slot>`;
  }

  private _handleClick(e: Event) {
    const target = (e.target as HTMLElement).closest('gds-toggle-button') as unknown as HTMLElement & { value: string; pressed: boolean };
    if (!target) return;
    const val = target.value || target.textContent?.trim() || '';
    if (this.multiple) {
      const idx = this.value.indexOf(val);
      if (idx >= 0) {
        this.value = [...this.value.slice(0, idx), ...this.value.slice(idx + 1)];
      } else {
        this.value = [...this.value, val];
      }
    } else {
      this.value = this.value.includes(val) ? [] : [val];
      // update children pressed state
      this.querySelectorAll('gds-toggle-button').forEach((btn) => {
        (btn as unknown as { pressed: boolean }).pressed = this.value.includes((btn as unknown as { value: string }).value || (btn as HTMLElement).textContent?.trim() || '');
      });
    }
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-toggle-button-group': GdsToggleButtonGroup;
  }
}