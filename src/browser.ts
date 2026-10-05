import { RedlineEngineCore } from "./engine.js";

// Make RedlineEngineCore available globally on window in the browser
if (typeof window !== "undefined") {
  (window as any).RedlineEngine = RedlineEngineCore;
}

export { RedlineEngineCore as RedlineEngine };
