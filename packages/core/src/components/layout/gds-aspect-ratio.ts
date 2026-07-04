import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-aspect-ratio')
export class GdsAspectRatio extends GdsBaseElement {
  @property({ type: String }) ratio: string = '1/1';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; position: relative; width: 100%; }
      .ratio-box {
        position: relative;
        width: 100%;
        padding-top: var(--gds-ar-padding, 100%);
      }
      .content {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        overflow: hidden;
        border-radius: inherit;
      }
      ::slotted(img), ::slotted(video), ::slotted(iframe) {
        width: 100%; height: 100%; object-fit: cover;
      }
    `,
  ];

  protected render() {
    const [w, h] = this.ratio.split('/').map((n) => parseFloat(n.trim()));
    const pct = h && w ? (h / w) * 100 : 100;
    return html`
      <div class="ratio-box" style="--gds-ar-padding: ${pct}%;">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-aspect-ratio': GdsAspectRatio; }
}