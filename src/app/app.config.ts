import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  provideRouter,
  RouterModule,
  withEnabledBlockingInitialNavigation,
} from '@angular/router'
import { NgOptimizedImage } from '@angular/common'
import { APP_METADATA_IMPORTS } from './app.metadata-imports'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { routes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      // 👇 Temporary until app component is standalone
      RouterModule,
      NgOptimizedImage,
      ...APP_METADATA_IMPORTS,
      FontAwesomeModule,
    ),
    provideRouter(
      routes,
      // 👇 Needed for SSR
      withEnabledBlockingInitialNavigation(),
    ),
    provideAnimations(),
  ],
}
