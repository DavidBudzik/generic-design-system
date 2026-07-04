/**
 * Shared TypeScript types for GDS components.
 */

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'outline';

export type Orientation = 'horizontal' | 'vertical';

export type Alignment = 'start' | 'center' | 'end' | 'stretch';

export type JustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export type StatusVariant = 'info' | 'success' | 'warning' | 'danger';

export interface Command {
  label: string;
  shortcut?: string[];
  icon?: string;
  action: () => void;
  group?: string;
}

export interface DropdownItem {
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface Column {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface TreeNode {
  label: string;
  value?: string;
  icon?: string;
  children?: TreeNode[];
  expanded?: boolean;
  selectable?: boolean;
}

export type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type Ratio = string;

