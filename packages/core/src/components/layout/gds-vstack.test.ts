import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsVStack } from './gds-vstack.js';

describe('GdsVStack', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsVStack>(html`<gds-vstack></gds-vstack>`);
    expect(el).to.be.instanceof(GdsVStack);
  });

  it('renders children in a column', async () => {
    const el = await fixture<GdsVStack>(html`
      <gds-vstack gap="3">
        <span>A</span>
        <span>B</span>
      </gds-vstack>
    `);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
    const assigned = slot!.assignedNodes({ flatten: true });
    expect(assigned.length).to.be.greaterThan(0);
  });

  it('applies gap property', async () => {
    const el = await fixture<GdsVStack>(html`<gds-vstack gap="4"></gds-vstack>`);
    expect(el.gap).to.equal('4');
    await elementUpdated(el);
  });
});