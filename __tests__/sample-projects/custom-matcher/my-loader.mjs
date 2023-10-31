import generateAliasesResolver from '../../../index.js'; 
const aliases = {
    "@/": "dist/src/"
};
const matcher = (path, alias) => {
    return (
      path.indexOf(alias) === 0 &&
      (path.length === alias.length || path[alias.length] === "/"  || path[alias.length - 1] === "/")
    )
}; 
export const resolve = generateAliasesResolver(aliases, {
  matcher
});