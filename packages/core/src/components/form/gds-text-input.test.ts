import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsTextInput } from './gds-text-input.js';

describe('GdsTextInput', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsTextInput>(html`<gds-text-input></gds-text-input>`);
    expect(el).to.be.instanceof(GdsTextInput);
    expect(el.value).to.equal('');
    expect(el.type).to.equal('text');
    expect(el.disabled).to.be.false;
  });

  it('renders an input element in shadow DOM', async () => {
    const el = await fixture<GdsTextInput>(html`<gds-text-input placeholder="Test"></gds-text-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input).to.exist;
    expect(input!.placeholder).to.equal('Test');
  });

  it('reflects value to the input', async () => {
    const el = await fixture<GdsTextInput>(html`<gds-text-input .value=${'hello'}></gds-text-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input!.value).to.equal('hello');
  });

  it('shows error styling when error is set', async () => {
    const el = await fixture<GdsTextInput>(html`<gds-text-input error="Invalid"></gds-text-input>`);
    expect(el.error).to.equal('Invalid');
    await elementUpdated(el);
    const errorEl = el.shadowRoot!.querySelector('.error');
    expect(errorEl).to.exist;
  });

  it('disables input when disabled is true', async () => {
    const el = await fixture<GdsTextInput>(html`<gds-text-input disabled></gds-text-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input!.disabled).to.be.true;
  });
});