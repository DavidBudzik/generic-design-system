import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-carousel')
export class GdsCarousel extends GdsBaseElement {
  @property({ type: Boolean }) loop = true;
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Number }) interval = 5000;

  private _current = 0;
  private _timer?: ReturnType<typeof setInterval>;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .carousel { position: relative; overflow: hidden; border-radius: var(--gds-radius-lg); }
      .slides { display: flex; transition: transform var(--gds-duration-slow) var(--gds-ease-default); }
      .slides::slotted(*) { flex: 0 0 100%; }
      ::slotted(*) { flex: 0 0 100%; }
      .track { display: flex; transition: transform var(--gds-duration-slow) var(--gds-ease-default); }
      .nav-btn {
        position: absolute; top: 50%; transform: translateY(-50%);
        width: 2.5rem; height: 2.5rem; border: none; border-radius: var(--gds-radius-full);
        background: rgba(0,0,0,0.4); color: #fff; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        z-index: 1; transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .nav-btn:hover { background: rgba(0,0,0,0.6); }
      .nav-prev { left: var(--gds-space-2); }
      .nav-next { right: var(--gds-space-2); }
      .dots { display: flex; gap: var(--gds-space-2); justify-content: center; padding: var(--gds-space-3); position: absolute; bottom: 0; left: 0; right: 0; }
      .dot { width: 0.5rem; height: 0.5rem; border-radius: var(--gds-radius-full); background: rgba(255,255,255,0.5); cursor: pointer; transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .dot.active { background: #fff; }
    `,
  ];

  protected render() {
    const count = this.children.length;
    return html`
      <div class="carousel">
        <button class="nav-btn nav-prev" @click=${() => this._prev()} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="track" style="transform: translateX(-${this._current * 100}%);">
          <slot></slot>
        </div>
        <button class="nav-btn nav-next" @click=${() => this._next()} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="dots">
          ${Array.from({ length: count }, (_, i) =>
            html`<div class="dot ${i === this._current ? 'active' : ''}" @click=${() => this._goTo(i)}></div>`,
          )}
        </div>
      </div>
    `;
  }

  private _prev() {
    const count = this.children.length;
    if (count === 0) return;
    this._current = this._current === 0 ? (this.loop ? count - 1 : 0) : this._current - 1;
    this.requestUpdate();
    dispatchEvent(this, 'change', { index: this._current });
  }

  private _next() {
    const count = this.children.length;
    if (count === 0) return;
    this._current = this._current === count - 1 ? (this.loop ? 0 : this._current) : this._current + 1;
    this.requestUpdate();
    dispatchEvent(this, 'change', { index: this._current });
  }

  private _goTo(i: number) {
    this._current = i;
    this.requestUpdate();
    dispatchEvent(this, 'change', { index: this._current });
  }

  protected firstUpdated() {
    if (this.autoplay) {
      this._timer = setInterval(() => this._next(), this.interval);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    if (this._timer) clearInterval(this._timer);
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-carousel': GdsCarousel; }
}