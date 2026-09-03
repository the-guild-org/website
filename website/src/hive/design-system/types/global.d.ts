interface Crisp {
  push: (args: unknown[]) => void;
}

interface Window {
  $crisp?: Crisp;
}

// Adds $crisp to globalThis
declare var $crisp: Crisp | undefined;
