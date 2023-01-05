import {InjectionToken} from "@angular/core";

export const WINDOW = new InjectionToken<Window | null>('app.window', {
    factory: () => (typeof window !== 'undefined' ? window : null)
  }
);
