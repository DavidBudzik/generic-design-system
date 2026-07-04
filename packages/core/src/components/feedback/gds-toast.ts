import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { StatusVariant } from '../../utils/types.js';

type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

interface ToastOptions {
  message: string;
  variant?: StatusVariant;
  duration?: number;
  position?: ToastPosition;
  title?: string;
}

@customElement('gds-toast')
export class GdsToast extends GdsBaseElement {
  @property({ type: String }) variant: StatusVariant = 'info';
  @property({ type: Number }) duration = 4000;
  @property({ type: String }) position: ToastPosition = 'top-right';
  @property({ type: String }) title = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .toast {
        display: flex; align-items: flex-start; gap: var(--gds-space-3);
        padding: var(--gds-space-4) var(--gds-space-5); border-radius: var(--gds-radius-md);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border);
        box-shadow: var(--gds-shadow-lg); min-width: 18rem; max-width: 24rem;
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text);
        animation: slideIn var(--gds-duration-normal) var(--gds-ease-default);
      }
      @keyframes slideIn { from { opacity: 0; transform: translateY(-0.5rem); } to { opacity: 1; transform: translateY(0); } }
      .toast.variant-info { border-left: 4px solid var(--gds-color-info); }
      .toast.variant-success { border-left: 4px solid var(--gds-color-success); }
      .toast.variant-warning { border-left: 4px solid var(--gds-color-warning); }
      .toast.variant-danger { border-left: 4px solid var(--gds-color-danger); }
      .content { flex: 1; }
      .title { font-weight: var(--gds-font-weight-semibold); margin-bottom: var(--gds-space-1); }
      .close-btn { border: none; background: transparent; cursor: pointer; color: var(--gds-color-text-muted); padding: 0; line-height: 0; }
      .close-btn:hover { color: var(--gds-color-text); }
    `,
  ];

  protected render() {
    return html`
      <div class="toast variant-${this.variant}" role="alert">
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          <slot></slot>
        </div>
        <button class="close-btn" @click=${this._dismiss} aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `;
  }

  private _dismiss() {
    dispatchEvent(this, 'dismiss', {});
    this.remove();
  }

  protected firstUpdated() {
    if (this.duration > 0) {
      setTimeout(() => this._dismiss(), this.duration);
    }
  }

  /**
   * Static method to show a toast programmatically.
   * Creates a toast container and appends a toast element.
   */
  static show(options: ToastOptions): GdsToast {
    let container = document.querySelector('gds-toast-container') as HTMLElement | null;
    if (!container) {
      container = document.createElement('div');
      container.style.cssText = `position:fixed;z-index:var(--gds-z-toast,1200);display:flex;flex-direction:column;gap:0.5rem;padding:1rem;pointer-events:none;`;
      container.setAttribute('data-gds-toast-container', '');
      document.body.appendChild(container);
    }
    // position
    const pos = options.position || 'top-right';
    const posMap: Record<string, string> = {
      'top-left': 'top:0;left:0', 'top-right': 'top:0;right:0',
      'top-center': 'top:0;left:50%;transform:translateX(-50%)',
      'bottom-left': 'bottom:0;left:0', 'bottom-right': 'bottom:0;right:0',
      'bottom-center': 'bottom:0;left:50%;transform:translateX(-50%)',
    };
    container.style.cssText += `;${posMap[pos] || posMap['top-right']}`;
    container.style.pointerEvents = 'none';

    const toast = document.createElement('gds-toast') as GdsToast;
    toast.variant = options.variant || 'info';
    toast.duration = options.duration ?? 4000;
    toast.position = pos;
    toast.title = options.title || '';
    toast.textContent = options.message;
    toast.style.pointerEvents = 'auto';
    container.appendChild(toast);
    return toast;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-toast': GdsToast; }
}