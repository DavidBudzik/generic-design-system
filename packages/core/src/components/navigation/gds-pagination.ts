import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-pagination')
export class GdsPagination extends GdsBaseElement {
  @property({ type: Number }) page = 1;
  @property({ type: Number }) totalPages = 1;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: flex; align-items: center; gap: var(--gds-space-2); }
      button {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 2rem; height: 2rem; border: 1px solid var(--gds-color-border);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface);
        color: var(--gds-color-text); font-size: var(--gds-font-size-sm); cursor: pointer;
        transition: all var(--gds-duration-fast) var(--gds-ease-default); padding: 0 var(--gds-space-2);
      }
      button:hover:not(:disabled) { border-color: var(--gds-color-primary); color: var(--gds-color-primary); }
      button:disabled { opacity: 0.4; cursor: not-allowed; }
      button.active { background: var(--gds-color-primary); color: var(--gds-color-on-primary); border-color: var(--gds-color-primary); }
      button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .ellipsis { color: var(--gds-color-text-subtle); padding: 0 var(--gds-space-1); }
    `,
  ];

  protected render() {
    const pages = this._getPageNumbers();
    return html`
      <button @click=${() => this._go(this.page - 1)} ?disabled=${this.page <= 1} aria-label="Previous page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      ${pages.map((p) =>
        p === '...'
          ? html`<span class="ellipsis">...</span>`
          : html`<button class=${p === this.page ? 'active' : ''} @click=${() => this._go(p as number)}>${p}</button>`,
      )}
      <button @click=${() => this._go(this.page + 1)} ?disabled=${this.page >= this.totalPages} aria-label="Next page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    `;
  }

  private _go(p: number) {
    if (p < 1 || p > this.totalPages || p === this.page) return;
    this.page = p;
    dispatchEvent(this, 'change', { page: this.page });
  }

  private _getPageNumbers(): (number | string)[] {
    const result: (number | string)[] = [];
    const tp = this.totalPages;
    const cp = this.page;
    if (tp <= 7) {
      for (let i = 1; i <= tp; i++) result.push(i);
    } else {
      result.push(1);
      if (cp > 3) result.push('...');
      for (let i = Math.max(2, cp - 1); i <= Math.min(tp - 1, cp + 1); i++) result.push(i);
      if (cp < tp - 2) result.push('...');
      result.push(tp);
    }
    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-pagination': GdsPagination; }
}