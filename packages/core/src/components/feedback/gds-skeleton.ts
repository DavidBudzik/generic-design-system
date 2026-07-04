import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-skeleton')
export class GdsSkeleton extends GdsBaseElement {
  @property({ type: String }) variant: 'text' | 'circle' | 'rect' = 'text';
  @property({ type: String }) width = '';
  @property({ type: String }) height = '';
  @property({ type: String }) animation: 'pulse' | 'wave' | 'none' = 'pulse';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .skeleton {
        background: var(--gds-color-bg-muted);
        position: relative; overflow: hidden;
      }
      .skeleton.variant-text { height: 1em; border-radius: var(--gds-radius-sm); width: 100%; }
      .skeleton.variant-circle { border-radius: var(--gds-radius-full); }
      .skeleton.variant-rect { border-radius: var(--gds-radius-md); }
      .skeleton.animation-pulse { animation: gds-pulse 1.5s ease-in-out infinite; }
      @keyframes gds-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .skeleton.animation-wave::after {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: gds-wave 1.5s infinite;
      }
      @keyframes gds-wave { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
    `,
  ];

  protected render() {
    const styleParts: string[] = [];
    if (this.width) styleParts.push(`width: ${this.width}`);
    if (this.height) styleParts.push(`height: ${this.height}`);
    return html`
      <div class="skeleton variant-${this.variant} animation-${this.animation}" style="${styleParts.join('; ')}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-skeleton': GdsSkeleton; }
}