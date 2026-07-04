import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsDialog } from './gds-dialog.js';

describe('GdsDialog', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsDialog>(html`<gds-dialog></gds-dialog>`);
    expect(el).to.be.instanceof(GdsDialog);
    expect(el.open).to.be.false;
  });

  it('has a title property', async () => {
    const el = await fixture<GdsDialog>(html`<gds-dialog title="Test Dialog"></gds-dialog>`);
    expect(el.title).to.equal('Test Dialog');
  });

  it('has size property with default md', async () => {
    const el = await fixture<GdsDialog>(html`<gds-dialog></gds-dialog>`);
    expect(el.size).to.equal('md');
  });

  it('is dismissible by default', async () => {
    const el = await fixture<GdsDialog>(html`<gds-dialog></gds-dialog>`);
    expect(el.dismissible).to.be.true;
  });

  it('renders slot content', async () => {
    const el = await fixture<GdsDialog>(html`
      <gds-dialog title="Test">
        <p>Body content</p>
      </gds-dialog>
    `);
    const slots = el.shadowRoot!.querySelectorAll('slot');
    expect(slots.length).to.be.greaterThan(0);
  });
});