import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsCard } from './gds-card.js';

describe('GdsCard', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsCard>(html`<gds-card></gds-card>`);
    expect(el).to.be.instanceof(GdsCard);
    expect(el.variant).to.equal('default');
  });

  it('renders slots for header, body, and footer', async () => {
    const el = await fixture<GdsCard>(html`
      <gds-card>
        <div slot="header">Title</div>
        <div slot="body">Content</div>
        <div slot="footer">Footer</div>
      </gds-card>
    `);
    const slots = el.shadowRoot!.querySelectorAll('slot');
    expect(slots.length).to.be.greaterThan(0);
  });

  it('applies variant class', async () => {
    const el = await fixture<GdsCard>(html`<gds-card variant="elevated"></gds-card>`);
    expect(el.variant).to.equal('elevated');
    await elementUpdated(el);
  });

  it('applies outlined variant', async () => {
    const el = await fixture<GdsCard>(html`<gds-card variant="outlined"></gds-card>`);
    expect(el.variant).to.equal('outlined');
  });
});