import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-chat-message')
export class GdsChatMessage extends GdsBaseElement {
  @property({ type: String }) role: 'user' | 'assistant' | 'system' = 'user';
  @property({ type: String }) author = '';
  @property({ type: String }) timestamp = '';
  @property({ type: String }) avatar = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .msg { display: flex; gap: var(--gds-space-3); padding: var(--gds-space-3) var(--gds-space-4); }
      .msg.role-user { flex-direction: row-reverse; }
      .avatar { flex-shrink: 0; width: 2rem; height: 2rem; border-radius: var(--gds-radius-full); background: var(--gds-color-bg-muted); display: inline-flex; align-items: center; justify-content: center; font-size: var(--gds-font-size-xs); font-weight: var(--gds-font-weight-semibold); color: var(--gds-color-text-muted); overflow: hidden; }
      .avatar img { width: 100%; height: 100%; object-fit: cover; }
      .bubble-wrap { max-width: 75%; display: flex; flex-direction: column; }
      .msg.role-user .bubble-wrap { align-items: flex-end; }
      .meta { display: flex; gap: var(--gds-space-2); align-items: center; font-size: var(--gds-font-size-xs); color: var(--gds-color-text-subtle); margin-bottom: var(--gds-space-1); }
      .bubble { padding: var(--gds-space-3) var(--gds-space-4); border-radius: var(--gds-radius-lg); font-size: var(--gds-font-size-sm); line-height: var(--gds-line-height-normal); color: var(--gds-color-text); word-wrap: break-word; }
      .msg.role-user .bubble { background: var(--gds-color-primary); color: var(--gds-color-on-primary); border-bottom-right-radius: var(--gds-radius-sm); }
      .msg.role-assistant .bubble { background: var(--gds-color-bg-muted); border-bottom-left-radius: var(--gds-radius-sm); }
      .msg.role-system .bubble { background: var(--gds-color-bg-muted); font-style: italic; color: var(--gds-color-text-muted); }
    `,
  ];

  protected render() {
    return html`
      <div class="msg role-${this.role}">
        <div class="avatar">
          ${this.avatar ? html`<img src=${this.avatar} alt=${this.author} />` : this.author?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div class="bubble-wrap">
          <div class="meta">
            ${this.author ? html`<span class="author">${this.author}</span>` : nothing}
            ${this.timestamp ? html`<span class="time">${this.timestamp}</span>` : nothing}
          </div>
          <div class="bubble"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-chat-message': GdsChatMessage; }
}