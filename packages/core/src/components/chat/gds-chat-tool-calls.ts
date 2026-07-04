import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
  result?: unknown;
}

@customElement('gds-chat-tool-calls')
export class GdsChatToolCalls extends GdsBaseElement {
  @property({ type: Array }) calls: ToolCall[] = [];

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .tool-call { border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md); margin-bottom: var(--gds-space-2); overflow: hidden; font-size: var(--gds-font-size-xs); }
      .header { display: flex; align-items: center; gap: var(--gds-space-2); padding: var(--gds-space-2) var(--gds-space-3); background: var(--gds-color-bg-muted); color: var(--gds-color-text-muted); cursor: pointer; }
      .header:hover { color: var(--gds-color-text); }
      .tool-name { font-family: var(--gds-font-mono); font-weight: var(--gds-font-weight-semibold); }
      .icon { display: inline-flex; transition: transform var(--gds-duration-fast) var(--gds-ease-default); }
      .icon.expanded { transform: rotate(90deg); }
      .details { padding: var(--gds-space-3); border-top: 1px solid var(--gds-color-border); display: none; }
      .details.open { display: block; }
      .section { margin-bottom: var(--gds-space-2); }
      .section-label { font-weight: var(--gds-font-weight-semibold); color: var(--gds-color-text-muted); margin-bottom: var(--gds-space-1); }
      pre { margin: 0; padding: var(--gds-space-2); background: var(--gds-color-bg-muted); border-radius: var(--gds-radius-sm); font-family: var(--gds-font-mono); font-size: var(--gds-font-size-xs); color: var(--gds-color-text); overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
    `,
  ];

  private _expanded: Set<number> = new Set();

  protected render() {
    return html`
      ${this.calls.map((call, i) => html`
        <div class="tool-call">
          <div class="header" @click=${() => this._toggle(i)}>
            <span class="icon ${this._expanded.has(i) ? 'expanded' : ''}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
            <span class="tool-name">${call.name}</span>
          </div>
          <div class="details ${this._expanded.has(i) ? 'open' : ''}">
            <div class="section">
              <div class="section-label">Arguments</div>
              <pre>${JSON.stringify(call.args, null, 2)}</pre>
            </div>
            ${call.result !== undefined ? html`
              <div class="section">
                <div class="section-label">Result</div>
                <pre>${typeof call.result === 'string' ? call.result : JSON.stringify(call.result, null, 2)}</pre>
              </div>
            ` : nothing}
          </div>
        </div>
      `)}
    `;
  }

  private _toggle(index: number) {
    if (this._expanded.has(index)) this._expanded.delete(index);
    else this._expanded.add(index);
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-chat-tool-calls': GdsChatToolCalls; }
}