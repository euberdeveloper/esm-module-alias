import path from 'node:path';

export default function generateAliasesResolver(aliasesToAdd, options) {
  const getAliases = () => {

    const base = process.cwd();
    const windowsSupportString = process.platform === 'win32' ? 'file://' : '';

    const absoluteAliases = Object.keys(aliasesToAdd).reduce((acc, key) =>
      aliasesToAdd[key][0] === '/'
        ? acc
        : { ...acc, [key]: path.join(windowsSupportString, base, aliasesToAdd[key]) },
      aliasesToAdd);

    return absoluteAliases;

  }

  const isAliasInSpecifier = options?.matcher ?? ((path, alias) => {
    return path.indexOf(alias) === 0
      && (path.length === alias.length || path[alias.length] === '/');
  });

  const aliases = getAliases();

  return (specifier, parentModuleURL, defaultResolve) => {

    const alias = Object.keys(aliases).find((key) => isAliasInSpecifier(specifier, key));

    const newSpecifier = alias === undefined
      ? specifier
      : path.join(aliases[alias], specifier.substr(alias.length));

    return defaultResolve(newSpecifier, parentModuleURL);
  };
}

