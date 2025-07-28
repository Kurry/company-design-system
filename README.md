# The Browser Company Design System

**🎨 A comprehensive design system extracted from The Browser Company's website and implemented with Tailwind CSS v4**

[![Version](https://img.shields.io/npm/v/@browser-company/design-system.svg)](https://www.npmjs.com/package/@browser-company/design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

### Installation

```bash
npm install @browser-company/design-system
```

### Usage

```html
<!-- Import the compiled CSS -->
<link
  rel="stylesheet"
  href="node_modules/@browser-company/design-system/dist/browser-company.css"
/>
```

```css
/* Or import in your CSS */
@import '@browser-company/design-system';
```

```javascript
// Import design tokens
import tokens from '@browser-company/design-system/tokens';
```

## 🎯 What's Included

### **📁 File Structure**

```
browser-company-design-system/
├── src/
│   └── input.css                    # Tailwind v4 source
├── dist/
│   └── browser-company.css          # Compiled CSS
├── browser-company-tokens.json      # Design tokens
├── BROWSER_COMPANY_ANALYSIS.md      # Comprehensive analysis
└── README.md                        # This file
```

### **🎨 Design Tokens (200+ tokens)**

- **60+ Colors**: 12-step scales, brand colors, opacity variants
- **40+ Typography**: Custom fonts, sizes, weights, spacing
- **25+ Spacing**: 4px-based scale, layout constants
- **35+ Effects**: Shadows, animations, z-index, blur

### **🧩 Ready-to-Use Components**

#### Buttons

```html
<button class="btn-browser-primary">Primary Button</button>
<button class="btn-browser-secondary">Secondary Button</button>
<button class="btn-browser-outline">Outline Button</button>
```

#### Cards

```html
<div class="card-browser">
  <h3>Standard Card</h3>
  <p>Card content here</p>
</div>

<div class="card-browser-elevated">
  <h3>Elevated Card</h3>
  <p>Card with enhanced shadow</p>
</div>
```

#### Typography

```html
<h1 class="heading-browser-1">Main Heading</h1>
<h2 class="heading-browser-2">Section Heading</h2>
<h3 class="heading-browser-3">Subsection Heading</h3>
<p class="text-browser-body">Body text with optimal readability</p>
<p class="text-browser-small">Small supporting text</p>
<code class="text-browser-mono">Monospace code text</code>
```

#### Forms

```html
<input type="text" class="input-browser" placeholder="Enter text..." />
```

#### Layout

```html
<div class="container-browser">
  <section class="section-browser">
    <!-- Content -->
  </section>
</div>
```

### **⚡ Custom Utilities**

```html
<!-- Animations -->
<div class="animate-browser-pulse">Pulsing element</div>
<div class="animate-slide">Sliding element</div>

<!-- Effects -->
<div class="gradient-browser-rainbow">Rainbow gradient</div>
<div class="blur-browser-md">Blurred element</div>

<!-- Transforms -->
<button class="transform-button-hover">Hover transform</button>
```

## 🎨 Color System

This design system uses a sophisticated **12-step color scale**:

### Primary Colors (Red-Orange)

```css
--color-primary-1: rgb(255, 234, 231) /* Lightest */ --color-primary-6: rgb(250, 69, 49) /* Base */
  --color-primary-12: rgb(9, 2, 1) /* Darkest */;
```

### Secondary Colors (Teal-Cyan)

```css
--color-secondary-1: rgb(0, 234, 231) /* Lightest */ --color-secondary-6: rgb(0, 69, 49) /* Base */
  --color-secondary-12: rgb(0, 2, 1) /* Darkest */;
```

### Brand Colors

```css
--color-brand-blue: #3139fb /* Primary brand */ --color-purple: #5d2de6 /* Secondary brand */
  --color-brand-red: #fb3a4d /* Accent */ --color-focus-outline: #96c4ff /* Focus states */;
```

## 🔤 Typography

### Font Families

- **Marlin**: Primary brand font
- **Inter/InterVariable**: Body text for readability
- **ABC Favorit Mono**: Monospace/code text

### Font Scale

```css
--font-size-10: 10px --font-size-12: 12px --font-size-14: 14px --font-size-16: 16px
  --font-size-20: 20px --font-size-24: 24px --font-size-32: 32px --font-size-36: 36px
  --font-size-40: 40px --font-size-48: 48px;
```

## 📏 Spacing System

Based on **4px increments** for consistent spacing:

```css
--spacing-4: 4px --spacing-8: 8px --spacing-12: 12px --spacing-16: 16px --spacing-24: 24px
  --spacing-32: 32px --spacing-40: 40px --spacing-48: 48px --spacing-56: 56px --spacing-64: 64px
  --spacing-72: 72px;
```

## ⚡ Animations

Performance-optimized animations with GPU acceleration:

```css
/* Durations */
--duration-fast: 0.1s --duration-quick: 0.15s --duration-normal: 0.2s /* Easing */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1) --ease-pulse: cubic-bezier(0.4, 0, 0.6, 1);
```

## 🏗️ Development

### Build Commands

```bash
# Development build
npm run build

# Watch mode for development
npm run dev

# Production build (minified)
npm run build:minify

# Clean build artifacts
npm run clean
```

### Using Design Tokens

Access the complete token reference:

```javascript
import tokens from '@browser-company/design-system/tokens';

// Access specific token categories
const { colors, typography, spacing, animations } = tokens;

// Use in JavaScript
document.documentElement.style.setProperty('--custom-color', colors.brand.brandBlue);
```

## 📖 Documentation

- **[BROWSER_COMPANY_ANALYSIS.md](./BROWSER_COMPANY_ANALYSIS.md)** - Comprehensive design system analysis
- **[browser-company-tokens.json](./browser-company-tokens.json)** - Complete design token reference

## 🎯 Key Features

✅ **Tailwind CSS v4** - Latest framework with `@theme` directive  
✅ **200+ Design Tokens** - Comprehensive token system  
✅ **Custom Components** - Ready-to-use Browser Company styled components  
✅ **Performance Optimized** - GPU-accelerated animations  
✅ **Accessibility** - Focus indicators and contrast considerations  
✅ **TypeScript Ready** - Full type definitions included

## 🤝 Contributing

This design system is extracted from a company's public website. To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Design tokens and components extracted from a company website.
Implementation by the design system community.

---

**Made with ❤️ for the design system community**
