import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Size } from '../../utils/types.js';

@customElement('gds-segmented-control')
export class GdsSegmentedControl extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) size: Size = 'md';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        background: var(--gds-color-bg-muted);
        border-radius: var(--gds-radius-md);
        padding: var(--gds-space-1);
        gap: var(--gds-space-1);
      }
      ::slotted(gds-toggle-button) { flex: 0 0 auto; }
    `,
  ];

  protected render() {
    return html`<slot @click=${this._handleClick}></slot>`;
  }

  private _handleClick(e: Event) {
    const target = (e.target as HTMLElement).closest('gds-toggle-button') as unknown as HTMLElement & { value: string; pressed: boolean };
    if (!target) return;
    const value = target.value || target.textContent?.trim() || '';
    this.value = value;
    dispatchEvent(this, 'change', { value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-segmented-control': GdsSegmentedControl;
  }
}