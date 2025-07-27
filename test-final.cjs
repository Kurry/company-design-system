#!/usr/bin/env node

/**
 * Final Design Tokens Verification Test
 * Simple CSS parsing approach to verify Tailwind v4 utilities are generated
 */

const fs = require('fs');
const path = require('path');

class DesignTokenValidator {
    constructor(cssPath) {
        this.cssContent = fs.readFileSync(cssPath, 'utf8');
        this.results = {
            total: 0,
            passed: 0,
            failed: []
        };
    }

    // Check if a CSS class exists in the compiled output
    hasUtilityClass(className) {
        // Handle slash syntax - CSS escapes / as \/
        const escapedClassName = className.replace(/\//g, '\\/');
        
        // Look for class definition - more flexible pattern matching
        const patterns = [
            new RegExp(`\\.${this.escapeRegex(escapedClassName)}\\s*\\{`, 'g'),
            new RegExp(`\\.${this.escapeRegex(escapedClassName)}\\s*,`, 'g'),
            new RegExp(`\\.${this.escapeRegex(escapedClassName)}\\s*:`, 'g')
        ];
        
        return patterns.some(pattern => pattern.test(this.cssContent));
    }

    // Check if a CSS variable is defined
    hasCSSVariable(variableName) {
        const pattern = new RegExp(`${this.escapeRegex(variableName)}\\s*:`, 'g');
        return pattern.test(this.cssContent);
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    test(type, name, description) {
        this.results.total++;
        
        let exists = false;
        if (type === 'class') {
            exists = this.hasUtilityClass(name);
        } else if (type === 'variable') {
            exists = this.hasCSSVariable(name);
        }
        
        if (exists) {
            this.results.passed++;
            return true;
        } else {
            this.results.failed.push({ type, name, description });
            return false;
        }
    }

    runTests() {
        console.log('🧪 Design Tokens Final Verification\n');

        // Test CSS Variables
        console.log('✓ Testing CSS Variables...');
        this.test('variable', '--color-black', 'Primary black color');
        this.test('variable', '--color-white', 'Primary white color');
        this.test('variable', '--color-red', 'Primary red color');
        this.test('variable', '--color-blue', 'Primary blue color');
        this.test('variable', '--color-black-90', 'Black 90% opacity');
        this.test('variable', '--color-black-50', 'Black 50% opacity');

        // Test Essential Utility Classes
        console.log('✓ Testing Core Utilities...');
        this.test('class', 'bg-black', 'Black background');
        this.test('class', 'bg-white', 'White background');
        this.test('class', 'bg-red', 'Red background');
        this.test('class', 'bg-blue', 'Blue background');
        this.test('class', 'text-black', 'Black text');
        this.test('class', 'text-white', 'White text');

        // Test Opacity Scale
        console.log('✓ Testing Black Scale...');
        this.test('class', 'bg-black-90', 'Black 90% background');
        this.test('class', 'bg-black-50', 'Black 50% background');
        this.test('class', 'bg-black-10', 'Black 10% background');

        // Test Extended Colors
        console.log('✓ Testing Extended Colors...');
        this.test('class', 'bg-yellow', 'Yellow background');
        this.test('class', 'bg-green', 'Green background');
        this.test('class', 'bg-purple', 'Purple background');

        // Test Semantic Colors
        console.log('✓ Testing Semantic Colors...');
        this.test('class', 'bg-primary', 'Primary semantic background');
        this.test('class', 'bg-success', 'Success semantic background');
        this.test('class', 'bg-warning', 'Warning semantic background');
        this.test('class', 'bg-error', 'Error semantic background');

        // Test Modern Slash Syntax (Tailwind v4)
        console.log('✓ Testing Modern Syntax...');
        this.test('class', 'bg-black/10', 'Modern opacity syntax');
        this.test('class', 'bg-black/50', 'Modern opacity syntax');
        this.test('class', 'text-black/60', 'Modern text opacity');

        this.reportResults();
        return this.results.passed === this.results.total;
    }

    reportResults() {
        console.log('\n📊 Final Test Results');
        console.log('=====================');
        console.log(`Total Tests: ${this.results.total}`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed.length}`);
        
        const passRate = ((this.results.passed / this.results.total) * 100).toFixed(1);
        console.log(`📈 Pass Rate: ${passRate}%`);

        if (this.results.failed.length > 0) {
            console.log('\n❌ Missing Utilities:');
            this.results.failed.forEach(({ type, name, description }) => {
                console.log(`   • ${type === 'class' ? '.' : ''}${name} - ${description}`);
            });
        }

        if (passRate >= 90) {
            console.log('\n🎉 Excellent! Design tokens are working correctly.');
            console.log('✨ Your Tailwind CSS v4 implementation is solid.');
        } else if (passRate >= 70) {
            console.log('\n✅ Good! Most design tokens are working.');
            console.log('🔧 Some utilities may need attention.');
        } else {
            console.log('\n⚠️  Design tokens need work.');
            console.log('🔧 Check @theme directive and CSS compilation.');
        }

        // Show sample of what IS working
        console.log('\n📋 Sample of Generated Utilities:');
        const samples = [
            'bg-black', 'bg-white', 'bg-red', 'bg-blue', 'bg-yellow',
            'text-black', 'text-white', 'bg-black-90', 'bg-black/50'
        ];
        
        samples.forEach(className => {
            if (this.hasUtilityClass(className)) {
                console.log(`   ✅ .${className}`);
            }
        });
    }
}

// Main execution
function main() {
    const cssPath = path.join(__dirname, 'dist', 'browser-company.css');
    
    if (!fs.existsSync(cssPath)) {
        console.error('❌ CSS file not found:', cssPath);
        console.log('Run "npm run build" first to generate the CSS file.');
        process.exit(1);
    }

    try {
        const validator = new DesignTokenValidator(cssPath);
        const success = validator.runTests();
        process.exit(success ? 0 : 1);
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { DesignTokenValidator };