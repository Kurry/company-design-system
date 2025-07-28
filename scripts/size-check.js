#!/usr/bin/env node

/**
 * Professional CSS Bundle Size Analysis
 * Monitors build performance and enforces size budgets
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSize } from 'gzip-size';
import { filesize } from 'filesize';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BundleSizeAnalyzer {
    constructor() {
        this.cssPath = path.join(__dirname, '..', 'dist', 'browser-company.css');
        this.sizeThresholds = {
            css: {
                warning: 200 * 1024,  // 200KB
                error: 300 * 1024     // 300KB
            },
            gzipped: {
                warning: 50 * 1024,   // 50KB
                error: 75 * 1024      // 75KB
            }
        };
    }

    async analyzeBundleSize() {
        const spinner = ora('Analyzing bundle size...').start();

        try {
            if (!fs.existsSync(this.cssPath)) {
                spinner.fail('CSS bundle not found. Run npm run build first.');
                process.exit(1);
            }

            const cssContent = fs.readFileSync(this.cssPath);
            const cssSize = cssContent.length;
            const gzippedSize = await gzipSize(cssContent);

            spinner.succeed('Bundle size analysis complete');

            // Display results
            console.log('\n📊 Bundle Size Analysis');
            console.log('========================');
            console.log(`CSS Bundle: ${this.formatSize(cssSize, this.sizeThresholds.css)}`);
            console.log(`Gzipped:    ${this.formatSize(gzippedSize, this.sizeThresholds.gzipped)}`);
            console.log(`Compression: ${chalk.cyan(((1 - gzippedSize / cssSize) * 100).toFixed(1) + '%')}`);

            // Size breakdown
            this.analyzeCSSContent(cssContent.toString());

            // Check thresholds
            const warnings = [];
            const errors = [];

            if (cssSize > this.sizeThresholds.css.warning) {
                const message = `CSS bundle size (${filesize(cssSize)}) exceeds warning threshold (${filesize(this.sizeThresholds.css.warning)})`;
                if (cssSize > this.sizeThresholds.css.error) {
                    errors.push(message);
                } else {
                    warnings.push(message);
                }
            }

            if (gzippedSize > this.sizeThresholds.gzipped.warning) {
                const message = `Gzipped size (${filesize(gzippedSize)}) exceeds warning threshold (${filesize(this.sizeThresholds.gzipped.warning)})`;
                if (gzippedSize > this.sizeThresholds.gzipped.error) {
                    errors.push(message);
                } else {
                    warnings.push(message);
                }
            }

            // Report issues
            if (warnings.length > 0) {
                console.log('\n⚠️  Size Warnings:');
                warnings.forEach(warning => console.log(`   ${chalk.yellow('•')} ${warning}`));
            }

            if (errors.length > 0) {
                console.log('\n❌ Size Errors:');
                errors.forEach(error => console.log(`   ${chalk.red('•')} ${error}`));
                console.log('\n💡 Consider optimizing unused CSS or purging unused utilities');
                process.exit(1);
            }

            if (warnings.length === 0 && errors.length === 0) {
                console.log('\n✅ Bundle size is within acceptable limits');
            }

        } catch (error) {
            spinner.fail(`Size analysis failed: ${error.message}`);
            process.exit(1);
        }
    }

    formatSize(bytes, thresholds) {
        const size = filesize(bytes);
        if (bytes > thresholds.error) {
            return chalk.red(size);
        } else if (bytes > thresholds.warning) {
            return chalk.yellow(size);
        } else {
            return chalk.green(size);
        }
    }

    analyzeCSSContent(cssContent) {
        console.log('\n📋 CSS Content Analysis');
        console.log('========================');

        // Count different types of rules
        const customProps = (cssContent.match(/--[\w-]+:/g) || []).length;
        const utilityClasses = (cssContent.match(/\.[a-z-]+[a-z0-9\/%-]*\s*{/g) || []).length;
        const mediaQueries = (cssContent.match(/@media[^{]+{/g) || []).length;
        const keyframes = (cssContent.match(/@keyframes[^{]+{/g) || []).length;

        console.log(`CSS Custom Properties: ${chalk.cyan(customProps)}`);
        console.log(`Utility Classes: ${chalk.cyan(utilityClasses)}`);
        console.log(`Media Queries: ${chalk.cyan(mediaQueries)}`);
        console.log(`Keyframe Animations: ${chalk.cyan(keyframes)}`);

        // Estimate breakdown
        const lines = cssContent.split('\n').length;
        console.log(`Total Lines: ${chalk.cyan(lines)}`);
    }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const analyzer = new BundleSizeAnalyzer();
    analyzer.analyzeBundleSize().catch(console.error);
}

export { BundleSizeAnalyzer };