import fs from 'node:fs';
import path from 'node:path';

import generateAliasesResolver from './index.js';

const packageJson = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
export const resolve = generateAliasesResolver(packageJson.aliases || {});