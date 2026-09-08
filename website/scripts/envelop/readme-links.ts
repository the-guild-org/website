/**
 * Readmes link to files next to them; once the readme is served from the
 * docs site those links must point back at the repository.
 */
export function absolutizeReadmeLinks(markdown: string, repo: string, filePath: string): string {
  const dir = filePath.split('/').slice(0, -1).join('/');
  const resolve = (target: string, raw: boolean) => {
    const clean = target.replace(/^\.\//, '');
    const base = raw
      ? `https://raw.githubusercontent.com/${repo}/HEAD/`
      : `https://github.com/${repo}/blob/HEAD/`;
    return `${base}${dir ? `${dir}/` : ''}${clean}`;
  };
  const isRelative = (target: string) =>
    !/^(?:[a-z]+:|\/\/|#|\/)/i.test(target) && !target.startsWith('mailto:');
  return markdown
    .replace(/(!\[[^\]]*]\()([^)\s]+)(\))/g, (match, open, target, close) =>
      isRelative(target) ? `${open}${resolve(target, true)}${close}` : match,
    )
    .replace(/(?<!!)(\[[^\]]*]\()([^)\s]+)(\))/g, (match, open, target, close) =>
      isRelative(target) ? `${open}${resolve(target, false)}${close}` : match,
    )
    .replace(/(<img[^>]*\ssrc=")([^"]+)(")/g, (match, open, target, close) =>
      isRelative(target) ? `${open}${resolve(target, true)}${close}` : match,
    );
}
