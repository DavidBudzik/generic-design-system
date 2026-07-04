import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-file-input')
export class GdsFileInput extends GdsBaseElement {
  @property({ type: String }) accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) dragAndDrop = true;
  @property({ type: String }) label = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); }
      .drop-zone {
        border: 2px dashed var(--gds-color-border-strong); border-radius: var(--gds-radius-md);
        padding: var(--gds-space-8); text-align: center; cursor: pointer; transition: all var(--gds-duration-fast) var(--gds-ease-default);
        color: var(--gds-color-text-muted); font-size: var(--gds-font-size-sm);
      }
      .drop-zone:hover { border-color: var(--gds-color-primary); color: var(--gds-color-text); }
      .drop-zone.dragover { border-color: var(--gds-color-primary); background: rgba(37,99,235,0.04); }
      .drop-zone.disabled { opacity: 0.5; cursor: not-allowed; }
      input { display: none; }
      .file-list { margin-top: var(--gds-space-3); display: flex; flex-direction: column; gap: var(--gds-space-2); }
      .file-item { display: flex; align-items: center; justify-content: space-between; padding: var(--gds-space-2) var(--gds-space-3); background: var(--gds-color-bg-muted); border-radius: var(--gds-radius-sm); font-size: var(--gds-font-size-sm); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <input type="file" accept=${this.accept} ?multiple=${this.multiple} ?disabled=${this.disabled} @change=${this._onChange} id="file-input" />
      ${this.dragAndDrop
        ? html`<div
            class="drop-zone ${this.disabled ? 'disabled' : ''}"
            @click=${() => (this.shadowRoot?.getElementById('file-input') as HTMLInputElement)?.click()}
            @dragover=${this._onDragOver}
            @dragleave=${this._onDragLeave}
            @drop=${this._onDrop}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div>Click or drag files here to upload</div>
          </div>`
        : html`<button @click=${() => (this.shadowRoot?.getElementById('file-input') as HTMLInputElement)?.click()} ?disabled=${this.disabled}>Choose files</button>`}
    `;
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
    (e.currentTarget as HTMLElement).classList.add('dragover');
  }

  private _onDragLeave(e: DragEvent) {
    (e.currentTarget as HTMLElement).classList.remove('dragover');
  }

  private _onDrop(e: DragEvent) {
    e.preventDefault();
    (e.currentTarget as HTMLElement).classList.remove('dragover');
    if (this.disabled) return;
    const files = e.dataTransfer?.files;
    if (files) dispatchEvent(this, 'change', { files: Array.from(files) });
  }

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) dispatchEvent(this, 'change', { files: Array.from(input.files) });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-file-input': GdsFileInput; }
}