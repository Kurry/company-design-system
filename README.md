# Design System

A design system built with Tailwind CSS v4.

## Development

```bash
npm install
npm run build
npm run dev
```

## What's Included

- **Colors**: Brand colors, purple/blue systems, neutrals, accent colors
- **Typography**: Custom fonts, sizes, weights
- **Layout**: 4px-based spacing scale, container widths, layout constants
- **Effects**: Shadows, border radius, animations, z-index layers

## Components

- Buttons with variants (primary, secondary, purple, danger)
- Navigation with hover effects  
- Cards with optional hover animations
- Forms with focus states and error variants
- Badges with semantic color variants
- Layout containers and responsive utilities

## Usage

```css
/* CSS custom properties */
color: var(--color-brand-blue);
background: var(--gradient-conic-rainbow);
```

```javascript
// JSON import for build tools
import tokens from './design-system-tokens.json';
const primaryColor = tokens.colors.brand.blue;
```
