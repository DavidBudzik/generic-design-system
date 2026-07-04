import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-dialog')
export class GdsDialog extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: Boolean }) dismissible = true;
  @property({ type: String }) title = '';
  @property({ type: String }) footer = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: contents; }
      dialog {
        border: none; border-radius: var(--gds-radius-lg); padding: 0;
        background: var(--gds-color-surface); box-shadow: var(--gds-shadow-xl);
        max-width: 90vw; max-height: 90vh; overflow: hidden;
        color: var(--gds-color-text); font-family: var(--gds-font-sans);
      }
      dialog::backdrop { background: rgba(0,0,0,0.5); }
      dialog.size-sm { width: 24rem; }
      dialog.size-md { width: 32rem; }
      dialog.size-lg { width: 48rem; }
      dialog.size-xl { width: 64rem; }
      .header {
        display: flex; align-items: center; justify-content: space-between;
        padding: var(--gds-space-5) var(--gds-space-6); border-bottom: 1px solid var(--gds-color-border);
      }
      .title { font-size: var(--gds-font-size-lg); font-weight: var(--gds-font-weight-semibold); }
      .close-btn { border: none; background: transparent; cursor: pointer; color: var(--gds-color-text-muted); padding: 0; line-height: 0; border-radius: var(--gds-radius-sm); }
      .close-btn:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .body { padding: var(--gds-space-6); overflow-y: auto; max-height: calc(90vh - 10rem); }
      .footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--gds-space-3); padding: var(--gds-space-4) var(--gds-space-6); border-top: 1px solid var(--gds-color-border); }
    `,
  ];

  protected render() {
    return html`
      <dialog class="size-${this.size}" ?open=${this.open} @close=${this._onClose} @click=${this._onBackdrop}>
        <div class="header">
          <span class="title">${this.title || html`<slot name="title"></slot>`}</span>
          ${this.dismissible ? html`<button class="close-btn" @click=${this._close} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>` : nothing}
        </div>
        <div class="body"><slot></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </dialog>
    `;
  }

  private _onBackdrop(e: Event) {
    const dlg = e.target as HTMLDialogElement;
    if (e.target === dlg && this.dismissible) this._close();
  }

  private _close() {
    this.open = false;
    dispatchEvent(this, 'close', {});
  }

  private _onClose() {
    this.open = false;
    dispatchEvent(this, 'close', {});
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-dialog': GdsDialog; }
}