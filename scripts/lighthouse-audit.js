#!/usr/bin/env node

/**
 * Lighthouse Performance Audit for Design System
 * Monitors CSS performance impact and loading metrics
 */

import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PerformanceAuditor {
    constructor() {
        this.previewPath = path.join(__dirname, '..', 'preview', 'index.html');
        this.reportPath = path.join(__dirname, '..', 'reports', 'lighthouse-report.html');
        this.scoreThresholds = {
            performance: 90,
            accessibility: 95,
            bestPractices: 90,
            seo: 85
        };
    }

    async runAudit() {
        const spinner = ora('Starting Lighthouse performance audit...').start();

        try {
            // Ensure reports directory exists
            const reportsDir = path.dirname(this.reportPath);
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir, { recursive: true });
            }

            // Check if preview file exists
            if (!fs.existsSync(this.previewPath)) {
                spinner.fail('Preview file not found. Cannot run performance audit.');
                process.exit(1);
            }

            spinner.text = 'Launching browser...';
            const browser = await puppeteer.launch({ headless: 'new' });

            try {
                spinner.text = 'Running Lighthouse audit...';
                const { lhr, report } = await lighthouse(
                    `file://${this.previewPath}`,
                    {
                        port: (new URL(browser.wsEndpoint())).port,
                        output: 'html',
                        logLevel: 'error',
                        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
                    }
                );

                // Save detailed HTML report
                fs.writeFileSync(this.reportPath, report);

                spinner.succeed('Lighthouse audit completed');

                // Analyze results
                this.analyzeResults(lhr);

            } finally {
                await browser.close();
            }

        } catch (error) {
            spinner.fail(`Performance audit failed: ${error.message}`);
            process.exit(1);
        }
    }

    analyzeResults(lhr) {
        console.log('\n🚀 Performance Audit Results');
        console.log('=============================');

        const categories = lhr.categories;
        const scores = {
            performance: Math.round(categories.performance.score * 100),
            accessibility: Math.round(categories.accessibility.score * 100),
            bestPractices: Math.round(categories['best-practices'].score * 100),
            seo: Math.round(categories.seo.score * 100)
        };

        // Display scores with color coding
        Object.entries(scores).forEach(([category, score]) => {
            const threshold = this.scoreThresholds[category];
            const color = score >= threshold ? 'green' : score >= threshold - 10 ? 'yellow' : 'red';
            const icon = score >= threshold ? '✅' : score >= threshold - 10 ? '⚠️' : '❌';
            
            console.log(`${icon} ${this.capitalize(category.replace(/([A-Z])/g, ' $1'))}: ${chalk[color](score)}/100`);
        });

        // CSS-specific metrics
        console.log('\n📊 CSS Performance Metrics');
        console.log('===========================');

        const audits = lhr.audits;
        
        // Render blocking resources
        if (audits['render-blocking-resources']) {
            const rbr = audits['render-blocking-resources'];
            console.log(`Render Blocking: ${rbr.score === 1 ? chalk.green('✅ Optimized') : chalk.yellow('⚠️ ' + rbr.displayValue)}`);
        }

        // Unused CSS
        if (audits['unused-css-rules']) {
            const unusedCSS = audits['unused-css-rules'];
            if (unusedCSS.details && unusedCSS.details.items.length > 0) {
                const wastedBytes = unusedCSS.details.items.reduce((total, item) => total + item.wastedBytes, 0);
                console.log(`Unused CSS: ${chalk.yellow('⚠️ ' + this.formatBytes(wastedBytes) + ' could be removed')}`);
            } else {
                console.log(`Unused CSS: ${chalk.green('✅ Minimal unused CSS')}`);
            }
        }

        // First Contentful Paint
        if (audits['first-contentful-paint']) {
            const fcp = audits['first-contentful-paint'];
            const fcpMs = Math.round(fcp.numericValue);
            const fcpColor = fcpMs < 1500 ? 'green' : fcpMs < 2500 ? 'yellow' : 'red';
            console.log(`First Contentful Paint: ${chalk[fcpColor](fcpMs + 'ms')}`);
        }

        // Largest Contentful Paint
        if (audits['largest-contentful-paint']) {
            const lcp = audits['largest-contentful-paint'];
            const lcpMs = Math.round(lcp.numericValue);
            const lcpColor = lcpMs < 2500 ? 'green' : lcpMs < 4000 ? 'yellow' : 'red';
            console.log(`Largest Contentful Paint: ${chalk[lcpColor](lcpMs + 'ms')}`);
        }

        // Report location
        console.log(`\n📋 Detailed report: ${chalk.blue(this.reportPath)}`);

        // Check if any scores are below threshold
        const failedScores = Object.entries(scores).filter(([category, score]) => 
            score < this.scoreThresholds[category]
        );

        if (failedScores.length > 0) {
            console.log('\n❌ Performance Issues Detected:');
            failedScores.forEach(([category, score]) => {
                console.log(`   • ${this.capitalize(category.replace(/([A-Z])/g, ' $1'))}: ${score}/100 (threshold: ${this.scoreThresholds[category]})`);
            });
            console.log('\n💡 Review the detailed Lighthouse report for optimization recommendations');
            process.exit(1);
        } else {
            console.log('\n🎉 All performance metrics passed! CSS performance is excellent.');
        }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const auditor = new PerformanceAuditor();
    auditor.runAudit().catch(console.error);
}

export { PerformanceAuditor };