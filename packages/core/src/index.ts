/**
 * @gds/core — Core components, theme system, and utilities for Generic Design System
 *
 * This entry point exports all components, utilities, and types.
 */

// ─── Utilities ──────────────────────────────────────────────────
export { GdsBaseElement } from './utils/base-element.js';
export { dispatchEvent, addEventListener } from './utils/event.js';
export type {
  Size,
  Variant,
  Orientation,
  Alignment,
  JustifyContent,
  Position,
  StatusVariant,
  Command,
  DropdownItem,
  Column,
  TreeNode,
  MaxWidth,
  Ratio,
} from './utils/types.js';

// ─── Action components ───────────────────────────────────────────
export { GdsButton } from './components/button/gds-button.js';
export { GdsButtonGroup } from './components/button-group/gds-button-group.js';
export { GdsIconButton } from './components/icon-button/gds-icon-button.js';
export { GdsLink } from './components/link/gds-link.js';
export { GdsDropdownMenu } from './components/dropdown-menu/gds-dropdown-menu.js';
export { GdsMoreMenu } from './components/more-menu/gds-more-menu.js';
export { GdsSegmentedControl } from './components/segmented-control/gds-segmented-control.js';
export { GdsToggleButton } from './components/toggle-button/gds-toggle-button.js';
export { GdsToggleButtonGroup } from './components/toggle-button-group/gds-toggle-button-group.js';
export { GdsToolbar } from './components/toolbar/gds-toolbar.js';

// ─── Layout components ──────────────────────────────────────────
export * from './components/layout/index.js';

// ─── Content components ─────────────────────────────────────────
export { GdsAvatar } from './components/avatar/gds-avatar.js';
export { GdsAvatarGroup } from './components/avatar/gds-avatar-group.js';
export { GdsBadge } from './components/badge/gds-badge.js';
export { GdsBlockquote } from './components/blockquote/gds-blockquote.js';
export { GdsCitation } from './components/citation/gds-citation.js';
export { GdsIcon } from './components/icon/gds-icon.js';
export { GdsThumbnail } from './components/thumbnail/gds-thumbnail.js';
export { GdsHeading } from './components/heading/gds-heading.js';
export { GdsText } from './components/text/gds-text.js';
export { GdsCode } from './components/code/gds-code.js';

// ─── Container components ────────────────────────────────────────
export { GdsCard } from './components/card/gds-card.js';
export { GdsClickableCard } from './components/card/gds-clickable-card.js';
export { GdsSelectableCard } from './components/card/gds-selectable-card.js';
export { GdsCollapsible } from './components/collapsible/gds-collapsible.js';
export { GdsCarousel } from './components/carousel/gds-carousel.js';
export { GdsBanner } from './components/banner/gds-banner.js';

// ─── Form components ────────────────────────────────────────────
export * from './components/form/index.js';

// ─── Feedback components ────────────────────────────────────────
export * from './components/feedback/index.js';

// ─── Navigation components ──────────────────────────────────────
export * from './components/navigation/index.js';

// ─── Overlay components ─────────────────────────────────────────
export * from './components/overlay/index.js';

// ─── Data components ─────────────────────────────────────────────
export * from './components/data/index.js';

// ─── Chat components ─────────────────────────────────────────────
export * from './components/chat/index.js';

// ─── Utility components ───────────────────────────────────────────
export * from './components/utility/index.js';