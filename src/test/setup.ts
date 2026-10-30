import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { mockMatchMedia } from "./match-media.ts";

class Observador {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: Observador as unknown as typeof IntersectionObserver,
});

mockMatchMedia(false);

afterEach(() => {
  cleanup();
  mockMatchMedia(false);
});
