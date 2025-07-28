#!/usr/bin/env node

/**
 * Package Export Validation
 * Ensures all package.json exports are valid and accessible
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ExportValidator {
  constructor() {
    this.packagePath = path.join(__dirname, '..', 'package.json');
    this.packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
  }

  async validateExports() {
    const spinner = ora('Validating package exports...').start();

    try {
      const exports = this.packageJson.exports || {};
      const results = [];

      console.log('\n📦 Package Export Validation');
      console.log('=============================');

      // Validate each export
      for (const [exportKey, exportPath] of Object.entries(exports)) {
        const result = await this.validateExport(exportKey, exportPath);
        results.push(result);
      }

      // Validate main field
      if (this.packageJson.main) {
        const mainResult = await this.validateExport('main', this.packageJson.main);
        results.push(mainResult);
      }

      // Validate files field
      if (this.packageJson.files) {
        const filesResult = await this.validateFiles();
        results.push(filesResult);
      }

      spinner.succeed('Export validation completed');

      // Summary
      const passed = results.filter(r => r.valid).length;
      const total = results.length;

      console.log(`\n📊 Validation Summary: ${chalk.green(passed)}/${total} exports valid`);

      const failed = results.filter(r => !r.valid);
      if (failed.length > 0) {
        console.log('\n❌ Failed validations:');
        failed.forEach(result => {
          console.log(`   • ${result.export}: ${chalk.red(result.error)}`);
        });
        process.exit(1);
      } else {
        console.log('\n✅ All package exports are valid and accessible');
      }
    } catch (error) {
      spinner.fail(`Export validation failed: ${error.message}`);
      process.exit(1);
    }
  }

  async validateExport(exportKey, exportPath) {
    const fullPath = path.resolve(__dirname, '..', exportPath);

    try {
      const exists = fs.existsSync(fullPath);
      const stats = exists ? fs.statSync(fullPath) : null;

      if (!exists) {
        console.log(`❌ ${exportKey}: ${chalk.red('File not found')} (${exportPath})`);
        return { export: exportKey, valid: false, error: 'File not found' };
      }

      if (stats.isFile()) {
        // Validate file content based on extension
        const ext = path.extname(exportPath);
        if (ext === '.css') {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.length === 0) {
            console.log(`⚠️  ${exportKey}: ${chalk.yellow('Empty CSS file')} (${exportPath})`);
            return { export: exportKey, valid: false, error: 'Empty CSS file' };
          }
        } else if (ext === '.json') {
          try {
            JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          } catch (parseError) {
            console.log(`❌ ${exportKey}: ${chalk.red('Invalid JSON')} (${exportPath})`);
            return { export: exportKey, valid: false, error: 'Invalid JSON' };
          }
        }

        console.log(`✅ ${exportKey}: ${chalk.green('Valid')} (${exportPath})`);
        return { export: exportKey, valid: true };
      } else if (stats.isDirectory()) {
        console.log(`✅ ${exportKey}: ${chalk.green('Valid directory')} (${exportPath})`);
        return { export: exportKey, valid: true };
      } else {
        console.log(`❌ ${exportKey}: ${chalk.red('Invalid file type')} (${exportPath})`);
        return { export: exportKey, valid: false, error: 'Invalid file type' };
      }
    } catch (error) {
      console.log(`❌ ${exportKey}: ${chalk.red(error.message)} (${exportPath})`);
      return { export: exportKey, valid: false, error: error.message };
    }
  }

  async validateFiles() {
    const files = this.packageJson.files || [];
    let allValid = true;
    const errors = [];

    console.log('\n📁 Files Field Validation');
    console.log('==========================');

    for (const filePattern of files) {
      const fullPath = path.resolve(__dirname, '..', filePattern);

      if (!fs.existsSync(fullPath)) {
        console.log(`❌ ${filePattern}: ${chalk.red('Not found')}`);
        allValid = false;
        errors.push(`${filePattern}: Not found`);
      } else {
        console.log(`✅ ${filePattern}: ${chalk.green('Exists')}`);
      }
    }

    return {
      export: 'files',
      valid: allValid,
      error: errors.length > 0 ? errors.join(', ') : null,
    };
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new ExportValidator();
  validator.validateExports().catch(console.error);
}

export { ExportValidator };
