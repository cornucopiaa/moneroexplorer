import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      // Preload all lazy-loaded routes in the background after initial load
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
