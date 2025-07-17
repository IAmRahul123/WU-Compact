const fs = require('fs');
const path = require('path');

// You can change this to 'src' or any other folder you want to scan
const ROOT_DIR = path.join(__dirname, 'src');

// Utility to check if file is a test file
const isTestFile = fileName =>
  fileName.includes('.test.') || fileName.includes('.spec.');

const createTestStub = (filePath, isComponent) => {
  const parsed = path.parse(filePath);

  const testDir = path.join(parsed.dir, '__tests__');
  const testFileName = `${parsed.name}.test.${parsed.ext.replace('.', '')}`;
  const testFilePath = path.join(testDir, testFileName);

  if (fs.existsSync(testFilePath)) {
    console.log(`🟡 Skipped (already exists): ${testFilePath}`);
    return;
  }

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }

  const relativeImport = `../${parsed.name}`;

  const content = isComponent
    ? `import React from 'react';\nimport { render } from '@testing-library/react-native';\nimport ${parsed.name} from '${relativeImport}';\n\ndescribe('${parsed.name}', () => {\n  it('renders correctly', () => {\n    const { getByTestId } = render(<${parsed.name} />);\n    expect(getByTestId('${parsed.name}-test')).toBeTruthy();\n  });\n});\n`
    : `import { ${parsed.name} } from '${relativeImport}';\n\ndescribe('${parsed.name}', () => {\n  it('should work correctly', () => {\n    expect(${parsed.name}()).toBeDefined();\n  });\n});\n`;

  fs.writeFileSync(testFilePath, content);
  console.log(`✅ Created: ${testFilePath}`);
};

const processDirectory = dir => {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (
      !isTestFile(entry) &&
      (entry.endsWith('.ts') || entry.endsWith('.tsx')) &&
      !entry.endsWith('.d.ts')
    ) {
      const isComponent = fullPath.includes('components');
      createTestStub(fullPath, isComponent);
    }
  }
};

console.log(`📁 Scanning for files in: ${ROOT_DIR}`);
processDirectory(ROOT_DIR);
console.log('🎉 Test stub generation complete!');
