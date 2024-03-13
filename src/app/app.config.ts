import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router'
import { NgOptimizedImage } from '@angular/common'
import { APP_METADATA_PROVIDERS } from './app.metadata-imports'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { routes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, NgOptimizedImage, FontAwesomeModule),
    provideRouter(
      routes,
      // 👇 Needed for SSR
      withEnabledBlockingInitialNavigation(),
    ),
    provideAnimations(),
    ...APP_METADATA_PROVIDERS,
  ],
}
