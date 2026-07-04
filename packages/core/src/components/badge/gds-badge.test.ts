import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsBadge } from './gds-badge.js';

describe('GdsBadge', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsBadge>(html`<gds-badge label="New"></gds-badge>`);
    expect(el).to.be.instanceof(GdsBadge);
  });

  it('renders the label text', async () => {
    const el = await fixture<GdsBadge>(html`<gds-badge label="Active"></gds-badge>`);
    const text = el.shadowRoot!.textContent;
    expect(text).to.include('Active');
  });

  it('applies variant class', async () => {
    const el = await fixture<GdsBadge>(html`<gds-badge label="Test" variant="success"></gds-badge>`);
    expect(el.variant).to.equal('success');
    await elementUpdated(el);
  });
});