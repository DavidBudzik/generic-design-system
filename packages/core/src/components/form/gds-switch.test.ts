import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsSwitch } from './gds-switch.js';

describe('GdsSwitch', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsSwitch>(html`<gds-switch></gds-switch>`);
    expect(el).to.be.instanceof(GdsSwitch);
    expect(el.checked).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('reflects checked state', async () => {
    const el = await fixture<GdsSwitch>(html`<gds-switch checked></gds-switch>`);
    expect(el.checked).to.be.true;
    expect(el.hasAttribute('checked')).to.be.true;
  });

  it('toggles checked on click', async () => {
    const el = await fixture<GdsSwitch>(html`<gds-switch></gds-switch>`);
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.true;
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.false;
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture<GdsSwitch>(html`<gds-switch disabled></gds-switch>`);
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.false;
  });
});