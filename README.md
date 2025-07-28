# Company Design System

**⚠️ Internal Implementation - Not for Public Distribution**

This repository contains an internal design system implementation built with Tailwind CSS v4. This is a private tool for internal company use only.

## 🚨 Important Notice

This design system is:
- **Internal use only** - Not intended for open source distribution
- **Company proprietary** - Contains design patterns and tokens for internal projects
- **Reference implementation** - Extracted and adapted for internal development workflows

## 🚀 Development Setup

### Installation

```bash
# Clone the repository (internal access required)
git clone https://github.com/Kurry/company-design-system.git
cd company-design-system

# Install dependencies
npm install
```

### Usage

```bash
# Development build with watch
npm run dev

# Production build
npm run build

# Preview documentation
npm run preview
```

## 🎯 What's Included

### **📁 File Structure**

```
company-design-system/
├── src/
│   └── input.css                    # Design system source
├── dist/
│   └── browser-company.css          # Compiled CSS output
├── preview/                         # Internal documentation site
├── design-system-tokens.json       # Design tokens
├── CLAUDE.md                        # Development guidelines
└── README.md                        # This file
```

### **🎨 Design Tokens**

- **Colors**: Brand colors, purple/blue systems, neutrals, accent colors
- **Typography**: Custom fonts (Marlin, Inter, ABC Favorit Mono), sizes, weights
- **Layout**: 4px-based spacing scale, container widths, layout constants
- **Effects**: Shadows, border radius, animations, z-index layers

### **🧩 Component System**

The design system includes pre-built components:

- **Buttons**: `.btn` with variants (primary, secondary, purple, danger)
- **Navigation**: `.nav-link` with hover effects  
- **Cards**: `.card` with optional hover animations
- **Forms**: `.input` with focus states and error variants
- **Badges**: `.badge` with semantic color variants
- **Layout**: `.container`, `.safe-area`, responsive utilities

## 📖 Documentation

Internal documentation and component showcase: **[Preview Site](https://kurry.github.io/company-design-system/)**

## 🛠️ Technical Details

- **Tailwind CSS v4** with `@theme` directive
- **CSS custom properties** for design tokens  
- **Performance-optimized** animations with GPU acceleration
- **4px spacing scale** for consistent layout
- **Accessibility** features with focus indicators

## 🛠️ Build Commands

```bash
# Development build and watch mode
npm run dev
npm run build:watch

# Production builds  
npm run build
npm run build:minify

# Preview documentation
npm run preview

# Linting and code quality
npm run lint
npm run lint:fix

# Clean build artifacts
npm run clean
```

## 📋 Usage Guidelines

This design system is intended for **internal company projects only**. 

### Design Token Access

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

## 🔒 Access & Support

This is an internal tool for company development workflows. For questions about usage or implementation, refer to the internal development team.

---

*Internal company design system - Not for public distribution*
