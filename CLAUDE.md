# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive design system extracted from The Browser Company's website and implemented with Tailwind CSS v4. It provides design tokens, components, and utilities for building consistent user interfaces.

## Build Commands

```bash
# Development build and watch mode
npm run dev
npm run build:watch

# Production builds
npm run build
npm run build:minify

# Preview
npm run preview  # Opens preview/index.html

# Linting
npm run lint
npm run lint:fix

# Clean build artifacts
npm run clean
```

## Project Architecture

### File Structure
```
company-design-system/
├── src/
│   └── input.css              # Tailwind v4 source with @theme directive
├── dist/
│   └── browser-company.css    # Compiled CSS output
├── preview/
│   ├── index.html             # Component showcase
│   └── components.html        # Additional component examples
├── design-system-tokens.json  # Design tokens in JSON format
├── DESIGN_SYSTEM_ANALYSIS.md  # Comprehensive analysis
└── package.json               # Dependencies and scripts
```

### Key Dependencies
- **@tailwindcss/cli**: Version 4.1.11 (Tailwind CSS v4 with @theme directive)
- **@html-eslint/eslint-plugin**: HTML linting for preview files
- **eslint-plugin-better-tailwindcss**: Enhanced Tailwind CSS linting

## CSS Architecture

### Design Token System
The design system is built on comprehensive design tokens organized in categories:

- **Colors (60+ tokens)**: Brand colors, purple/blue systems, neutrals, accent colors, opacity variants
- **Typography (40+ tokens)**: Custom fonts (Marlin, Inter, ABC Favorit Mono), sizes, weights, spacing
- **Layout (25+ tokens)**: 4px-based spacing scale, container widths, layout constants
- **Effects (35+ tokens)**: Shadows, border radius, animations, z-index layers

### CSS Organization
The `src/input.css` file follows this structure:

1. **@theme directive**: All design tokens as CSS custom properties
2. **@layer base**: Base HTML element styles
3. **@layer components**: Reusable component classes (buttons, cards, inputs, etc.)
4. **@layer utilities**: Utility classes for colors, typography, layout, animations

### Component System
Pre-built components include:

- **Buttons**: `.btn` with variants (primary, secondary, purple, danger, pink)
- **Navigation**: `.nav-link` with hover effects
- **Cards**: `.card` with optional hover animations
- **Forms**: `.input` with focus states and error variants
- **Badges**: `.badge` with semantic color variants
- **Layout**: `.container`, `.safe-area`, responsive utilities

## Development Guidelines

### Tailwind CSS v4 Features
- Uses the new `@theme` directive for design tokens
- Custom properties are automatically generated from tokens
- Compatible with standard Tailwind utility classes
- Extended with custom component and utility layers

### Design System Conventions
- **4px spacing scale**: All spacing values are multiples of 4px
- **12-step color scales**: Similar to Radix UI color system for optimal contrast
- **Performance-first animations**: Transform-based with GPU acceleration
- **Consistent naming**: Clear, semantic token names following brand-{color} pattern

### ESLint Configuration
- Focuses on critical Tailwind CSS issues only
- Enforces no conflicting/duplicate/deprecated classes
- Disables formatting rules for large showcase files
- Uses HTML parser for .html files

## Token Usage

Access design tokens in multiple ways:

```css
/* CSS custom properties */
color: var(--color-brand-blue);
background: var(--gradient-conic-rainbow);

/* Tailwind utilities */
.bg-brand-blue
.text-purple
.shadow-md
```

```javascript
// JSON import
import tokens from './design-system-tokens.json';
const primaryColor = tokens.colors.brand.blue;
```

## Testing and Quality

- Run `npm run lint` before commits to catch Tailwind CSS issues
- Preview files serve as visual regression tests
- Focus on component consistency and design token adherence
- Verify accessibility with focus indicators and contrast ratios

## Key Design Principles

1. **Systematic Approach**: Every value follows logical scales and naming conventions
2. **Performance Optimization**: GPU-accelerated animations, efficient CSS architecture
3. **Brand Consistency**: Custom fonts and distinctive color palette
4. **Accessibility**: Focus indicators, contrast considerations, semantic HTML
5. **Maintainability**: Clear token organization, modular component system