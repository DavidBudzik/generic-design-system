import { expect } from '@open-wc/testing';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { GdsButton } from './gds-button.js';

describe('GdsButton', () => {
  it('renders with default props', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Click me"></gds-button>`);
    expect(el).to.be.instanceof(GdsButton);
    expect(el.label).to.equal('Click me');
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
  });

  it('renders the label text', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Submit"></gds-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button).to.exist;
    expect(button!.textContent).to.include('Submit');
  });

  it('applies variant classes', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Test" variant="danger"></gds-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button!.classList.contains('variant-danger')).to.be.true;
  });

  it('applies size classes', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Test" size="lg"></gds-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button!.classList.contains('size-lg')).to.be.true;
  });

  it('disables the button when disabled prop is set', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Test" disabled></gds-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button!.disabled).to.be.true;
  });

  it('shows spinner when loading', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Test" loading></gds-button>`);
    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).to.exist;
  });

  it('supports full-width attribute', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Test" full-width></gds-button>`);
    expect(el.hasAttribute('full-width')).to.be.true;
  });

  it('updates label reactively', async () => {
    const el = await fixture<GdsButton>(html`<gds-button label="Before"></gds-button>`);
    el.label = 'After';
    await elementUpdated(el);
    const button = el.shadowRoot!.querySelector('button');
    expect(button!.textContent).to.include('After');
  });
});