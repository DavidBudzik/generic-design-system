import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Column } from '../../utils/types.js';

@customElement('gds-table')
export class GdsTable extends GdsBaseElement {
  @property({ type: Array }) columns: Column[] = [];
  @property({ type: Array }) rows: Record<string, unknown>[] = [];
  @property({ type: Boolean }) sortable = false;
  @property({ type: Boolean }) selectable = false;
  @property({ type: Boolean }) stickyHeader = false;
  @property({ type: String }) _sortKey = '';
  @property({ type: String }) _sortDir: 'asc' | 'desc' = 'asc';
  @property({ type: Number }) _selectedRow = -1;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .table-wrapper { overflow-x: auto; border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md); }
      table { width: 100%; border-collapse: collapse; font-size: var(--gds-font-size-sm); }
      thead { background: var(--gds-color-bg-muted); }
      :host([sticky-header]) thead th { position: sticky; top: 0; z-index: 1; }
      th { padding: var(--gds-space-3) var(--gds-space-4); text-align: left; font-weight: var(--gds-font-weight-semibold); color: var(--gds-color-text); border-bottom: 1px solid var(--gds-color-border); white-space: nowrap; }
      th.sortable { cursor: pointer; user-select: none; }
      th.sortable:hover { color: var(--gds-color-primary); }
      td { padding: var(--gds-space-3) var(--gds-space-4); color: var(--gds-color-text); border-bottom: 1px solid var(--gds-color-border); }
      tr:last-child td { border-bottom: none; }
      tr.row-selectable { cursor: pointer; }
      tr.row-selectable:hover td { background: var(--gds-color-surface-hover); }
      tr.selected td { background: rgba(37,99,235,0.04); }
      .empty { padding: var(--gds-space-8); text-align: center; color: var(--gds-color-text-muted); }
    `,
  ];

  protected render() {
    const sortedRows = this._getSortedRows();
    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              ${this.columns.map((col) => html`
                <th
                  class=${this.sortable && col.sortable !== false ? 'sortable' : ''}
                  style=${col.width ? `width: ${col.width}` : ''}${col.align ? `;text-align: ${col.align}` : ''}
                  @click=${() => this._sort(col.key)}
                >
                  ${col.label}
                  ${this._sortKey === col.key ? html`<span>${this._sortDir === 'asc' ? '↑' : '↓'}</span>` : nothing}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${sortedRows.length === 0
              ? html`<tr><td class="empty" colspan=${this.columns.length}>No data</td></tr>`
              : sortedRows.map((row, i) => html`
                  <tr
                    class=${this.selectable ? 'row-selectable' : ''} ${i === this._selectedRow ? 'selected' : ''}
                    @click=${() => this._selectRow(i, row)}
                  >
                    ${this.columns.map((col) => html`<td style=${col.align ? `text-align: ${col.align}` : ''}>${String(row[col.key] ?? '')}</td>`)}
                  </tr>
                `)}
          </tbody>
        </table>
      </div>
    `;
  }

  private _getSortedRows() {
    if (!this._sortKey) return this.rows;
    const dir = this._sortDir === 'asc' ? 1 : -1;
    return [...this.rows].sort((a, b) => {
      const av = a[this._sortKey] as string | number | undefined;
      const bv = b[this._sortKey] as string | number | undefined;
      if (av === bv) return 0;
      return ((av as string | number) > (bv as string | number) ? 1 : -1) * dir;
    });
  }

  private _sort(key: string) {
    if (!this.sortable) return;
    if (this._sortKey === key) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortKey = key;
      this._sortDir = 'asc';
    }
    dispatchEvent(this, 'sort', { key: this._sortKey, direction: this._sortDir });
  }

  private _selectRow(index: number, row: Record<string, unknown>) {
    if (!this.selectable) return;
    this._selectedRow = index;
    dispatchEvent(this, 'select', { index, row });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-table': GdsTable; }
}