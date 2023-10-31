import fs from 'node:fs';
import { printText } from '@/util.js';

async function main() {
    const text = await fs.promises.readFile('./sample.txt', 'utf-8');
    printText(text);
}
main();