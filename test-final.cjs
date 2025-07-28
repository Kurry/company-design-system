#!/usr/bin/env node

/**
 * Final Design Tokens Test for Optimized System
 * Validates core functionality after "less is more" optimization
 */

const fs = require('fs');
const path = require('path');

class OptimizedTokenValidator {
    constructor() {
        this.cssPath = path.join(__dirname, 'dist', 'browser-company.css');
        this.cssContent = '';
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    loadCSS() {
        if (!fs.existsSync(this.cssPath)) {
            throw new Error(`CSS file not found: ${this.cssPath}`);
        }
        this.cssContent = fs.readFileSync(this.cssPath, 'utf8');
    }

    hasUtilityClass(className) {
        const escapedClassName = className.replace(/\//g, '\\/').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        const patterns = [
            new RegExp(`\\.${this.escapeRegex(escapedClassName)}\\s*\\{`, 'g'),
            new RegExp(`\\.${this.escapeRegex(escapedClassName)}:`, 'g'),
            new RegExp(`\\.${this.escapeRegex(escapedClassName)},`, 'g')
        ];
        return patterns.some(pattern => pattern.test(this.cssContent));
    }

    hasCSSVariable(varName) {
        const pattern = new RegExp(`--${this.escapeRegex(varName.replace('--', ''))}\\s*:`, 'g');
        return pattern.test(this.cssContent);
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    addTest(name, testFn) {
        this.tests.push({ name, testFn });
    }

    runTests() {
        console.log('🧪 Design Tokens Final Verification\n');

        // Core CSS Variables Tests
        console.log('✓ Testing CSS Variables...');
        this.addTest('--color-black', () => this.hasCSSVariable('color-black'));
        this.addTest('--color-white', () => this.hasCSSVariable('color-white'));
        this.addTest('--color-red', () => this.hasCSSVariable('color-red'));
        this.addTest('--color-blue', () => this.hasCSSVariable('color-blue'));
        this.addTest('--color-brand-primary', () => this.hasCSSVariable('color-brand-primary'));

        // Core Utility Classes Tests
        console.log('✓ Testing Core Utilities...');
        this.addTest('.bg-black', () => this.hasUtilityClass('bg-black'));
        this.addTest('.bg-white', () => this.hasUtilityClass('bg-white'));
        this.addTest('.text-black', () => this.hasUtilityClass('text-black'));
        this.addTest('.text-white', () => this.hasUtilityClass('text-white'));

        // Color Scale Tests
        console.log('✓ Testing Black Scale...');
        this.addTest('.bg-red', () => this.hasUtilityClass('bg-red'));
        this.addTest('.bg-blue', () => this.hasUtilityClass('bg-blue'));
        this.addTest('.bg-yellow', () => this.hasUtilityClass('bg-yellow'));
        this.addTest('.bg-green', () => this.hasUtilityClass('bg-green'));
        this.addTest('.bg-purple', () => this.hasUtilityClass('bg-purple'));

        // Extended Colors
        console.log('✓ Testing Extended Colors...');
        this.addTest('.bg-black-90', () => this.hasUtilityClass('bg-black-90'));
        this.addTest('.bg-black-50', () => this.hasUtilityClass('bg-black-50'));
        this.addTest('.bg-black-10', () => this.hasUtilityClass('bg-black-10'));

        // Semantic Colors
        console.log('✓ Testing Semantic Colors...');
        this.addTest('.bg-primary', () => this.hasUtilityClass('bg-primary'));
        this.addTest('.bg-error', () => this.hasUtilityClass('bg-error'));

        // Modern Syntax (slash notation)
        console.log('✓ Testing Modern Syntax...');
        this.addTest('.bg-black/50', () => this.hasUtilityClass('bg-black/50'));

        // Run all tests
        this.tests.forEach(test => {
            try {
                const result = test.testFn();
                if (result) {
                    this.results.passed++;
                } else {
                    this.results.failed++;
                    this.results.errors.push(`${test.name} - Missing or not generated correctly`);
                }
            } catch (error) {
                this.results.failed++;
                this.results.errors.push(`${test.name} - Error: ${error.message}`);
            }
        });

        this.reportResults();
    }

    reportResults() {
        const total = this.results.passed + this.results.failed;
        const passRate = ((this.results.passed / total) * 100).toFixed(1);

        console.log('\n📊 Final Test Results');
        console.log('=====================');
        console.log(`Total Tests: ${total}`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📈 Pass Rate: ${passRate}%`);

        if (this.results.failed > 0) {
            console.log('\n❌ Missing Utilities:');
            this.results.errors.forEach(error => {
                console.log(`   • ${error}`);
            });
            console.log('\n⚠️  Design tokens need work.');
            console.log('🔧 Check @theme directive and CSS compilation.');
        } else {
            console.log('\n🎉 Excellent! Design tokens are working correctly.');
            console.log('✨ Your optimized Tailwind CSS v4 implementation is solid.');
        }

        console.log('\n📋 Sample of Generated Utilities:');
        const sampleUtilities = ['.bg-black', '.bg-white', '.bg-red', '.bg-blue', '.bg-yellow', '.text-black', '.text-white', '.bg-black-90', '.bg-black/50'];
        sampleUtilities.forEach(utility => {
            const exists = this.hasUtilityClass(utility.replace('.', ''));
            console.log(`   ${exists ? '✅' : '❌'} ${utility}`);
        });

        // Exit with error code if tests failed
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run the validation
const validator = new OptimizedTokenValidator();
try {
    validator.loadCSS();
    validator.runTests();
} catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
}