import generateAliasesResolver from '../../../index.js'; 
const aliases = {
    "@deep": "very/deep/module"
};
export const resolve = generateAliasesResolver(aliases);