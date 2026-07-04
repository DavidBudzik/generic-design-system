import type { CLICommand } from '../types.js';

interface ComponentDoc {
  name: string;
  tag: string;
  category: string;
  description: string;
  props: { name: string; type: string; default?: string; description: string }[];
  slots?: { name: string; description: string }[];
  events?: { name: string; detail: string; description: string }[];
  examples: { title: string; code: string }[];
}

const componentDocs: Record<string, ComponentDoc> = {
  Button: {
    name: 'Button',
    tag: 'gds-button',
    category: 'Action',
    description: 'A versatile button with variants, sizes, and loading state.',
    props: [
      { name: 'label', type: 'string', description: 'Button text' },
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'", default: "'primary'", description: 'Visual style' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show spinner' },
      { name: 'icon', type: 'string', description: 'SVG icon string' },
      { name: 'iconPosition', type: "'start' | 'end'", default: "'start'", description: 'Icon position' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width button' },
    ],
    events: [
      { name: 'click', detail: 'void', description: 'Fired on click (native event)' },
    ],
    examples: [
      { title: 'Basic', code: '<gds-button label="Click me"></gds-button>' },
      { title: 'Variants', code: '<gds-button label="Primary" variant="primary"></gds-button>\n<gds-button label="Secondary" variant="secondary"></gds-button>\n<gds-button label="Ghost" variant="ghost"></gds-button>\n<gds-button label="Danger" variant="danger"></gds-button>\n<gds-button label="Outline" variant="outline"></gds-button>' },
      { title: 'Loading', code: '<gds-button label="Saving..." loading></gds-button>' },
      { title: 'Full width', code: '<gds-button label="Submit" fullWidth></gds-button>' },
    ],
  },
  VStack: {
    name: 'VStack',
    tag: 'gds-vstack',
    category: 'Layout',
    description: 'Vertical stack layout with configurable gap, alignment, and wrapping.',
    props: [
      { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '0', description: 'Spacing between children (uses spacing tokens)' },
      { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'Cross-axis alignment' },
      { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", description: 'Main-axis distribution' },
      { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
    ],
    slots: [
      { name: 'default', description: 'Child elements' },
    ],
    examples: [
      { title: 'Basic', code: '<gds-vstack gap="3">\n  <gds-text>Item 1</gds-text>\n  <gds-text>Item 2</gds-text>\n</gds-vstack>' },
    ],
  },
  HStack: {
    name: 'HStack',
    tag: 'gds-hstack',
    category: 'Layout',
    description: 'Horizontal stack layout with configurable gap and alignment.',
    props: [
      { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '0', description: 'Spacing between children' },
      { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'center'", description: 'Cross-axis alignment' },
      { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", description: 'Main-axis distribution' },
      { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
    ],
    slots: [{ name: 'default', description: 'Child elements' }],
    examples: [
      { title: 'Basic', code: '<gds-hstack gap="2" align="center">\n  <gds-button label="Cancel" variant="ghost"></gds-button>\n  <gds-button label="Save"></gds-button>\n</gds-hstack>' },
    ],
  },
  Card: {
    name: 'Card',
    tag: 'gds-card',
    category: 'Container',
    description: 'A container with optional elevation, used for widgets, settings groups, and galleries.',
    props: [
      { name: 'variant', type: "'default' | 'elevated' | 'outlined'", default: "'default'", description: 'Card style' },
      { name: 'padding', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '4', description: 'Internal padding' },
      { name: 'interactive', type: 'boolean', default: 'false', description: 'Hover state for clickable cards' },
      { name: 'href', type: 'string', description: 'Makes the card a link' },
    ],
    slots: [
      { name: 'header', description: 'Card header content' },
      { name: 'default', description: 'Card body' },
      { name: 'footer', description: 'Card footer' },
    ],
    examples: [
      { title: 'Basic card', code: '<gds-card variant="elevated" padding="4">\n  <div slot="header"><gds-heading level="3">Title</gds-heading></div>\n  <div slot="body">Content here</div>\n  <div slot="footer"><gds-button label="Action" size="sm"></gds-button></div>\n</gds-card>' },
    ],
  },
  TextInput: {
    name: 'TextInput',
    tag: 'gds-text-input',
    category: 'Form',
    description: 'A controlled text input with label, supporting text, and error states.',
    props: [
      { name: 'value', type: 'string', default: "''", description: 'Input value (controlled)' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'type', type: "'text' | 'email' | 'password' | 'search' | 'url'", default: "'text'", description: 'Input type' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'hint', type: 'string', description: 'Supporting text' },
      { name: 'error', type: 'string', description: 'Error message (shows red border + error text)' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only input' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
      { name: 'icon', type: 'string', description: 'Leading icon SVG' },
    ],
    events: [
      { name: 'input', detail: '{ value: string }', description: 'Fired on each keystroke' },
      { name: 'change', detail: '{ value: string }', description: 'Fired on blur/Enter' },
    ],
    examples: [
      { title: 'Basic', code: '<gds-text-input placeholder="Enter text" .value=${value} @input=${handleChange}></gds-text-input>' },
      { title: 'With label and error', code: '<gds-text-input label="Email" type="email" placeholder="you@example.com" error="Invalid email"></gds-text-input>' },
    ],
  },
  Dialog: {
    name: 'Dialog',
    tag: 'gds-dialog',
    category: 'Overlay',
    description: 'A modal dialog with title, body, and footer slots.',
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Whether dialog is open' },
      { name: 'title', type: 'string', description: 'Dialog title' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Dialog width' },
      { name: 'dismissible', type: 'boolean', default: 'true', description: 'Close on Esc/backdrop click' },
    ],
    slots: [
      { name: 'default', description: 'Dialog body content' },
      { name: 'footer', description: 'Dialog footer (actions)' },
    ],
    events: [
      { name: 'close', detail: 'void', description: 'Fired when dialog closes' },
      { name: 'open', detail: 'void', description: 'Fired when dialog opens' },
    ],
    examples: [
      { title: 'Basic dialog', code: '<gds-dialog ?open title="Confirm" size="sm">\n  <p>Are you sure?</p>\n  <div slot="footer">\n    <gds-button label="Cancel" variant="ghost"></gds-button>\n    <gds-button label="Confirm"></gds-button>\n  </div>\n</gds-dialog>' },
    ],
  },
};

const componentList = Object.keys(componentDocs).sort();

export const componentCommand: CLICommand = {
  name: 'component',
  description: 'Browse component docs, props, and examples',
  usage: 'gds component [Name] [--list]',
  args: [
    { name: 'Name', description: 'Component name (e.g. Button, Dialog)', required: false },
  ],
  options: [
    { name: 'list', description: 'List all available components', alias: 'l' },
  ],
  run: (args, options) => {
    if (options.list || options.l) {
      console.log('\nAvailable components:\n');
      const categories: Record<string, string[]> = {};
      for (const name of componentList) {
        const doc = componentDocs[name];
        const cat = doc.category;
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(name);
      }
      for (const [cat, comps] of Object.entries(categories)) {
        console.log(`  ${cat}:`);
        for (const comp of comps) {
          console.log(`    ${comp.padEnd(20)} ${componentDocs[comp].tag}`);
        }
        console.log();
      }
      return;
    }

    const name = args[0];
    if (!name) {
      console.log('Usage: gds component <Name>');
      console.log('Run `gds component --list` for all components.');
      return;
    }

    const doc = componentDocs[name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()];
    if (!doc) {
      console.error(`Component "${name}" not found. Run \`gds component --list\` for available components.`);
      process.exit(1);
    }

    console.log(`\n${doc.name} (${doc.tag})`);
    console.log(`Category: ${doc.category}`);
    console.log(`\n${doc.description}\n`);

    console.log('Props:');
    for (const prop of doc.props) {
      const def = prop.default ? ` [default: ${prop.default}]` : '';
      console.log(`  ${prop.name.padEnd(16)} ${prop.type.padEnd(50)} ${prop.description}${def}`);
    }

    if (doc.slots?.length) {
      console.log('\nSlots:');
      for (const slot of doc.slots) {
        console.log(`  ${slot.name.padEnd(16)} ${slot.description}`);
      }
    }

    if (doc.events?.length) {
      console.log('\nEvents:');
      for (const event of doc.events) {
        console.log(`  ${event.name.padEnd(16)} ${event.detail.padEnd(30)} ${event.description}`);
      }
    }

    console.log('\nExamples:');
    for (const ex of doc.examples) {
      console.log(`\n  ${ex.title}:`);
      for (const line of ex.code.split('\n')) {
        console.log(`    ${line}`);
      }
    }
    console.log();
  },
};