import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Orientation } from '../../utils/types.js';

@customElement('gds-tabs')
export class GdsTabs extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) orientation: Orientation = 'horizontal';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .tabs { display: flex; }
      :host([orientation='vertical']) .tabs { flex-direction: column; }
      .tab-list {
        display: flex; gap: var(--gds-space-1); padding: var(--gds-space-1);
        border-bottom: 1px solid var(--gds-color-border);
      }
      :host([orientation='vertical']) .tab-list { flex-direction: column; border-bottom: none; border-right: 1px solid var(--gds-color-border); }
      .tab-trigger {
        padding: var(--gds-space-2) var(--gds-space-4); cursor: pointer;
        font-size: var(--gds-font-size-sm); color: var(--gds-color-text-muted);
        border: none; background: transparent; border-radius: var(--gds-radius-md);
        transition: all var(--gds-duration-fast) var(--gds-ease-default);
        font-weight: var(--gds-font-weight-medium);
      }
      .tab-trigger:hover { color: var(--gds-color-text); background: var(--gds-color-bg-muted); }
      .tab-trigger.active { color: var(--gds-color-primary); background: rgba(37,99,235,0.08); }
      .tab-trigger:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .tab-panel { padding: var(--gds-space-4); display: none; }
      .tab-panel.active { display: block; }
    `,
  ];

  protected render() {
    const tabs = Array.from(this.querySelectorAll('[slot="tab"]')) as HTMLElement[];
    const panels = Array.from(this.querySelectorAll('[slot="panel"]')) as HTMLElement[];
    return html`
      <div class="tab-list" role="tablist" aria-orientation=${this.orientation}>
        ${tabs.map((tab, i) => {
          const tabValue = tab.getAttribute('value') || tab.textContent?.trim() || '';
          const isActive = tabValue === this.value || (!this.value && i === 0);
          return html`<button
            class="tab-trigger ${isActive ? 'active' : ''}"
            role="tab"
            aria-selected=${isActive}
            @click=${() => this._select(tabValue)}
          >${tab.textContent}</button>`;
        })}
      </div>
      ${panels.map((panel, i) => {
        const tab = tabs[i];
        const tabValue = tab?.getAttribute('value') || tab?.textContent?.trim() || '';
        const isActive = tabValue === this.value || (!this.value && i === 0);
        return html`<div class="tab-panel ${isActive ? 'active' : ''}" role="tabpanel">${panel.innerHTML}</div>`;
      })}
    `;
  }

  private _select(value: string) {
    this.value = value;
    dispatchEvent(this, 'change', { value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-tabs': GdsTabs; }
}