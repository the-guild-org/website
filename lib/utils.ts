export function flatten<T>(arr: T[]): T extends (infer A)[] ? A[] : T[] {
  return Array.prototype.concat(...arr) as any;
}

export function unique<T>(arr: T[]): T[] {
  return arr.filter((value, i, all) => all.indexOf(value) === i);
}

export function logAsComplete(label: string) {
  console.log(`●  ${label}`);
}
