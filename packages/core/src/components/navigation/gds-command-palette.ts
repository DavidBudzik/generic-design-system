import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Command } from '../../utils/types.js';

@customElement('gds-command-palette')
export class GdsCommandPalette extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) commands: Command[] = [];
  @property({ type: String }) search = '';

  private _selectedIndex = 0;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: contents; }
      .overlay {
        position: fixed; inset: 0; z-index: var(--gds-z-modal);
        background: rgba(0,0,0,0.4); display: flex; align-items: flex-start; justify-content: center;
        padding-top: 12vh; opacity: 0; pointer-events: none; transition: opacity var(--gds-duration-fast) var(--gds-ease-default);
      }
      :host([open]) .overlay { opacity: 1; pointer-events: auto; }
      .palette {
        width: 90%; max-width: 32rem; background: var(--gds-color-surface);
        border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-lg);
        box-shadow: var(--gds-shadow-xl); overflow: hidden;
      }
      .search-wrapper { display: flex; align-items: center; gap: var(--gds-space-3); padding: var(--gds-space-4); border-bottom: 1px solid var(--gds-color-border); }
      .search-input { flex: 1; border: none; outline: none; background: transparent; font-size: var(--gds-font-size-md); color: var(--gds-color-text); }
      .results { max-height: 20rem; overflow-y: auto; padding: var(--gds-space-2); }
      .cmd-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: var(--gds-space-2) var(--gds-space-3); border-radius: var(--gds-radius-md);
        cursor: pointer; font-size: var(--gds-font-size-sm); color: var(--gds-color-text);
        transition: background var(--gds-duration-fast) var(--gds-ease-default);
      }
      .cmd-item:hover, .cmd-item.selected { background: var(--gds-color-bg-muted); }
      .cmd-item .shortcut { display: flex; gap: var(--gds-space-1); }
      .cmd-item .shortcut kbd { font-family: var(--gds-font-mono); font-size: var(--gds-font-size-xs); background: var(--gds-color-bg-muted); padding: 0.125rem 0.375rem; border-radius: var(--gds-radius-sm); border: 1px solid var(--gds-color-border); }
      .empty { padding: var(--gds-space-6); text-align: center; color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm); }
    `,
  ];

  protected render() {
    const filtered = this._filterCommands();
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="palette" @click=${(e: Event) => e.stopPropagation()}>
          <div class="search-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gds-color-text-muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input class="search-input" placeholder="Type a command..." .value=${this.search} @input=${this._onSearch} @keydown=${this._onKeydown} />
          </div>
          <div class="results">
            ${filtered.length === 0
              ? html`<div class="empty">No commands found</div>`
              : filtered.map((cmd) => html`
                  <div class="cmd-item" @click=${() => this._execute(cmd)}>
                    <span>${cmd.icon ? html`<span .innerHTML=${cmd.icon}></span> ` : ''}${cmd.label}</span>
                    ${cmd.shortcut ? html`<span class="shortcut">${cmd.shortcut.map((k) => html`<kbd>${k}</kbd>`)}</span>` : nothing}
                  </div>
                `)}
          </div>
        </div>
      </div>
    `;
  }

  private _filterCommands(): Command[] {
    if (!this.search) return this.commands;
    const q = this.search.toLowerCase();
    return this.commands.filter((c) => c.label.toLowerCase().includes(q));
  }

  private _onSearch(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
  }

  private _onKeydown(e: KeyboardEvent) {
    const filtered = this._filterCommands();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._selectedIndex = Math.min(filtered.length - 1, this._selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._selectedIndex = Math.max(0, this._selectedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[this._selectedIndex]) this._execute(filtered[this._selectedIndex]);
    }
  }

  private _onOverlayClick() {
    this._close();
  }

  private _execute(cmd: Command) {
    cmd.action();
    this._close();
  }

  private _close() {
    this.open = false;
    this.search = '';
    dispatchEvent(this, 'close', {});
  }

  protected firstUpdated() {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.open = !this.open;
      }
      if (e.key === 'Escape' && this.open) this._close();
    });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-command-palette': GdsCommandPalette; }
}