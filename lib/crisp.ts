export function runOnCrisp(callback: (crisp: any) => void) {
  if (typeof window !== 'undefined' && (window as any).$crisp) {
    callback((window as any).$crisp);
  }
}
