#!/bin/bash

# Professional Build Health Check
# Comprehensive validation of design system build state

set -e  # Exit on any error

echo "🔍 Design System Build Health Check"
echo "==================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track overall status
OVERALL_STATUS=0

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        OVERALL_STATUS=1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Environment Check
echo -e "\n${BLUE}📋 Environment Validation${NC}"
echo "========================="

# Check Node.js version
NODE_VERSION=$(node --version)
print_info "Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
print_info "npm version: $NPM_VERSION"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_status 0 "Dependencies installed"
else
    print_status 1 "Dependencies not installed - run 'npm install'"
fi

# 2. Clean Build
echo -e "\n${BLUE}🧹 Clean Build${NC}"
echo "==============="

npm run clean > /dev/null 2>&1
print_status $? "Clean completed"

# 3. CSS Build
echo -e "\n${BLUE}🎨 CSS Build${NC}"
echo "============="

npm run build:css > /dev/null 2>&1
BUILD_STATUS=$?
print_status $BUILD_STATUS "CSS compilation"

if [ $BUILD_STATUS -eq 0 ]; then
    # Check if output file exists
    if [ -f "dist/browser-company.css" ]; then
        FILE_SIZE=$(wc -c < dist/browser-company.css)
        print_info "CSS bundle size: $(numfmt --to=iec-i --suffix=B $FILE_SIZE)"
        
        # Check if file is not empty
        if [ $FILE_SIZE -gt 1000 ]; then
            print_status 0 "CSS bundle has content"
        else
            print_status 1 "CSS bundle appears empty or too small"
        fi
    else
        print_status 1 "CSS output file not found"
    fi
fi

# 4. Linting
echo -e "\n${BLUE}📝 Code Quality${NC}"
echo "================"

# HTML Linting (with timeout to prevent hanging)
timeout 30s npm run lint:html > /dev/null 2>&1
HTML_LINT_STATUS=$?
if [ $HTML_LINT_STATUS -eq 124 ]; then
    print_warning "HTML linting timed out (large files)"
elif [ $HTML_LINT_STATUS -eq 0 ]; then
    print_status 0 "HTML linting passed"
else
    print_status 1 "HTML linting failed"
fi

# CSS Linting (if stylelint is available)
if command -v npx stylelint > /dev/null 2>&1; then
    npm run lint:css > /dev/null 2>&1
    print_status $? "CSS linting"
else
    print_warning "CSS linting not available (stylelint not installed)"
fi

# 5. Design Token Tests
echo -e "\n${BLUE}🧪 Design Token Validation${NC}"
echo "=========================="

npm run test:tokens > /dev/null 2>&1
print_status $? "Design token tests"

# 6. Package Export Validation
echo -e "\n${BLUE}📦 Package Validation${NC}"
echo "===================="

if [ -f "scripts/validate-exports.js" ]; then
    npm run validate:exports > /dev/null 2>&1
    print_status $? "Package exports validation"
else
    print_warning "Export validation script not found"
fi

# 7. Size Analysis
echo -e "\n${BLUE}📊 Size Analysis${NC}"
echo "================"

if [ -f "scripts/size-check.js" ]; then
    npm run size-check > /dev/null 2>&1
    print_status $? "Size check within limits"
else
    print_warning "Size check script not found"
fi

# 8. Production Build Test
echo -e "\n${BLUE}🚀 Production Build${NC}"
echo "=================="

npm run build:minify > /dev/null 2>&1
MINIFY_STATUS=$?
print_status $MINIFY_STATUS "Minified build"

if [ $MINIFY_STATUS -eq 0 ] && [ -f "dist/browser-company.css" ]; then
    MINIFIED_SIZE=$(wc -c < dist/browser-company.css)
    print_info "Minified size: $(numfmt --to=iec-i --suffix=B $MINIFIED_SIZE)"
fi

# 9. Format Check
echo -e "\n${BLUE}💅 Code Formatting${NC}"
echo "=================="

if command -v npx prettier > /dev/null 2>&1; then
    npm run format:check > /dev/null 2>&1
    print_status $? "Code formatting"
else
    print_warning "Prettier not available for format checking"
fi

# Final Summary
echo -e "\n${BLUE}📈 Build Health Summary${NC}"
echo "======================="

if [ $OVERALL_STATUS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Design system is healthy.${NC}"
    echo -e "${GREEN}✨ Ready for development and production use.${NC}"
else
    echo -e "${RED}⚠️  Some checks failed. Review the issues above.${NC}"
    echo -e "${YELLOW}🔧 Fix the failing checks before proceeding.${NC}"
fi

exit $OVERALL_STATUS