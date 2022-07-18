/** 
 * Given the aliases, generates a module resolver that will allow aliases in esm imports
 * @param aliasesToAdd The aliases to add to the module resolver as an object whose keys are the patterns and the values the path to be resolved
*/
export default function generateAliasesResolver(aliasesToAdd: Record<string, string>): (specifier: any, parentModuleURL: any, defaultResolve: any) => any;