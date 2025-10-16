const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');

const canonicalPackage = {
  name: '60gye-gwanpyeong-store',
  version: '1.0.0',
  private: true,
  description: 'Static preview server for the 60Gye Chicken Daejeon Gwanpyeong site',
  scripts: {
    dev: 'node server.js',
    start: 'node server.js',
    share: 'node share.js',
    repair: 'node scripts/repair-package.js',
  },
  dependencies: {
    localtunnel: '^2.0.2',
  },
};

function writeCanonical(reason) {
  fs.writeFileSync(packagePath, `${JSON.stringify(canonicalPackage, null, 2)}\n`, 'utf8');
  console.log('package.json 파일을 기본 설정으로 복구했습니다.');
  if (reason) {
    console.log(`원인: ${reason}`);
  }
}

function hasDifferences(existing, expected, propertyPath = []) {
  const differences = [];

  Object.entries(expected).forEach(([key, value]) => {
    const currentPath = [...propertyPath, key];
    if (!(key in existing)) {
      differences.push(`${currentPath.join('.')}: 누락`);
      return;
    }

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      differences.push(...hasDifferences(existing[key], value, currentPath));
      return;
    }

    if (existing[key] !== value) {
      differences.push(`${currentPath.join('.')}: '${existing[key]}' → '${value}'`);
    }
  });

  return differences;
}

try {
  const raw = fs.readFileSync(packagePath, 'utf8');
  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch (parseError) {
    writeCanonical('JSON 구문 오류로 인해 기존 파일을 읽을 수 없습니다.');
    process.exit(0);
  }

  const differences = hasDifferences(parsed, canonicalPackage);

  if (differences.length === 0) {
    console.log('package.json 설정이 정상입니다. 변경하지 않았습니다.');
    process.exit(0);
  }

  writeCanonical(`다음 항목을 복구했습니다:\n- ${differences.join('\n- ')}`);
} catch (error) {
  writeCanonical('파일을 읽는 중 예기치 못한 오류가 발생했습니다.');
}
