import { html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

// A minimal built-in icon set for common UI icons.
const ICON_PATHS: Record<string, string> = {
  'check': 'M20 6L9 17l-5-5',
  'close': 'M18 6L6 18M6 6l12 12',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-up': 'M18 15l-6-6-6 6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
  'arrow-right': 'M5 12h14M12 5l7 7-7 7',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
  'plus': 'M12 5v14M5 12h14',
  'minus': 'M5 12h14',
  'search': 'M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z',
  'menu': 'M3 12h18M3 6h18M3 18h18',
  'settings': 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z',
  'trash': 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2',
  'copy': 'M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.602A2 2 0 0014.685 2H10a2 2 0 00-2 2z M16 18v2a4 4 0 01-4 4H6a4 4 0 01-4-4V10a4 4 0 014-4v0',
  'edit': 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z',
  'info': 'M12 16v-4M12 8h.01 M12 22a10 10 0 100-20 10 10 0 000 20z',
  'warning': 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4M12 17h.01',
  'error': 'M12 22a10 10 0 100-20 10 10 0 000 20z M15 9l-6 6M9 9l6 6',
  'user': 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
  'mail': 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z M22 7l-10 7L2 7',
  'calendar': 'M3 4h18v18H3z M3 10h18 M8 2v4 M16 2v4',
  'clock': 'M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2',
  'download': 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  'upload': 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'heart': 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.84-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  'eye': 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z',
  'lock': 'M5 11h14v10H5z M8 11V7a4 4 0 018 0v4',
  'home': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
  'folder': 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z',
  'file': 'M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z M13 2v7h7',
  'bell': 'M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0',
  'send': 'M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z',
  'external': 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3',
  'grip': 'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
};

@customElement('gds-icon')
export class GdsIcon extends GdsBaseElement {
  @property({ type: String }) name = '';
  @property({ type: String }) size: string = 'md';
  @property({ type: String }) color = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; justify-content: center; }
      svg { display: block; }
    `,
  ];

  protected render() {
    const sizeMap: Record<string, number> = { sm: 16, md: 20, lg: 24, xl: 32 };
    const s = sizeMap[this.size] || 20;
    const stroke = this.color || 'currentColor';
    const path = ICON_PATHS[this.name];
    if (!path && !this.name.startsWith('<svg')) {
      return html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>`;
    }
    return path
      ? svg`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${path} /></svg>`
      : html`<span .innerHTML=${this.name} style="display:inline-flex"></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-icon': GdsIcon; }
}