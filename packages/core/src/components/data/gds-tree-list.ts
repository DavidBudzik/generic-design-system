import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { TreeNode } from '../../utils/types.js';

@customElement('gds-tree-list')
export class GdsTreeList extends GdsBaseElement {
  @property({ type: Array }) data: TreeNode[] = [];
  @property({ type: Array }) expanded: string[] = [];
  @property({ type: Boolean }) selectable = false;
  @property({ type: String }) selectedValue = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .tree { font-size: var(--gds-font-size-sm); }
      .node { display: flex; align-items: center; gap: var(--gds-space-1); padding: var(--gds-space-1) var(--gds-space-2); border-radius: var(--gds-radius-sm); cursor: pointer; transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .node:hover { background: var(--gds-color-bg-muted); }
      .node.selected { background: rgba(37,99,235,0.08); color: var(--gds-color-primary); }
      .chevron { display: inline-flex; transition: transform var(--gds-duration-fast) var(--gds-ease-default); width: 1rem; flex-shrink: 0; }
      .chevron.expanded { transform: rotate(90deg); }
      .chevron.leaf { visibility: hidden; }
      .label { flex: 1; }
      .icon { display: inline-flex; color: var(--gds-color-text-muted); flex-shrink: 0; }
      .children { margin-left: var(--gds-space-5); }
    `,
  ];

  protected render() {
    return html`<div class="tree">${this._renderNodes(this.data, 0)}</div>`;
  }

  private _renderNodes(nodes: TreeNode[], level: number): unknown {
    return nodes.map((node) => {
      const isExpanded = this.expanded.includes(node.value || node.label);
      const isSelected = this.selectable && this.selectedValue === (node.value || node.label);
      const hasChildren = node.children && node.children.length > 0;
      return html`
        <div class="node ${isSelected ? 'selected' : ''}" @click=${(e: Event) => this._onNodeClick(e, node)}>
          <span class="chevron ${isExpanded ? 'expanded' : ''} ${!hasChildren ? 'leaf' : ''}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
          ${node.icon ? html`<span class="icon" .innerHTML=${node.icon}></span>` : nothing}
          <span class="label">${node.label}</span>
        </div>
        ${hasChildren && isExpanded ? html`<div class="children">${this._renderNodes(node.children!, level + 1)}</div>` : nothing}
      `;
    });
  }

  private _onNodeClick(e: Event, node: TreeNode) {
    e.stopPropagation();
    const val = node.value || node.label;
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      if (this.expanded.includes(val)) {
        this.expanded = this.expanded.filter((v) => v !== val);
      } else {
        this.expanded = [...this.expanded, val];
      }
      dispatchEvent(this, 'toggle', { node, expanded: this.expanded.includes(val) });
    }
    if (this.selectable) {
      this.selectedValue = val;
      dispatchEvent(this, 'select', { node });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-tree-list': GdsTreeList; }
}