import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-empty-state')
export class GdsEmptyState extends GdsBaseElement {
  @property({ type: String }) icon = '';
  @property({ type: String }) title = 'Nothing here yet';
  @property({ type: String }) description = '';
  @property({ type: String }) action = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .empty {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        padding: var(--gds-space-12) var(--gds-space-6); text-align: center;
      }
      .icon { margin-bottom: var(--gds-space-4); color: var(--gds-color-text-subtle); display: inline-flex; }
      .title { font-size: var(--gds-font-size-lg); font-weight: var(--gds-font-weight-semibold); color: var(--gds-color-text); margin-bottom: var(--gds-space-2); }
      .description { font-size: var(--gds-font-size-sm); color: var(--gds-color-text-muted); max-width: 24rem; margin-bottom: var(--gds-space-6); }
      .action { display: inline-flex; }
    `,
  ];

  protected render() {
    return html`
      <div class="empty">
        ${this.icon ? html`<div class="icon" .innerHTML=${this.icon}></div>` : nothing}
        <div class="title">${this.title}</div>
        ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
        <div class="action"><slot name="action"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-empty-state': GdsEmptyState; }
}