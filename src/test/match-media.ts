export function mockMatchMedia(reducido: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value(query: string) {
      return {
        matches: reducido && query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
        addListener() {},
        removeListener() {},
      };
    },
  });
}
