import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-chat-composer')
export class GdsChatComposer extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Type a message...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) sendOnEnter = true;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .composer { display: flex; align-items: flex-end; gap: var(--gds-space-2); padding: var(--gds-space-2); border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-lg); background: var(--gds-color-surface); transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default); }
      .composer:focus-within { border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .composer.disabled { opacity: 0.5; }
      textarea { flex: 1; border: none; outline: none; resize: none; background: transparent; font-family: var(--gds-font-sans); font-size: var(--gds-font-size-sm); color: var(--gds-color-text); padding: var(--gds-space-2); min-height: 1.5rem; max-height: 8rem; }
      textarea::placeholder { color: var(--gds-color-text-subtle); }
      .send-btn { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border: none; border-radius: var(--gds-radius-md); background: var(--gds-color-primary); color: var(--gds-color-on-primary); cursor: pointer; transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .send-btn:hover { background: var(--gds-color-primary-hover); }
      .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    `,
  ];

  protected render() {
    return html`
      <div class="composer ${this.disabled ? 'disabled' : ''}">
        <textarea
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          rows="1"
          @input=${this._onInput}
          @keydown=${this._onKey}
        ></textarea>
        <button class="send-btn" @click=${this._send} ?disabled=${this.disabled || !this.value.trim()} aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    `;
  }

  private _onInput(e: Event) {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    // auto-resize
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && this.sendOnEnter) {
      e.preventDefault();
      this._send();
    }
  }

  private _send() {
    if (this.disabled || !this.value.trim()) return;
    dispatchEvent(this, 'send', { value: this.value });
    this.value = '';
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-chat-composer': GdsChatComposer; }
}