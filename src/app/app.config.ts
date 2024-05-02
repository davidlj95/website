import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { APP_METADATA_PROVIDERS } from './app.metadata-imports'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideClientHydration } from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    ...APP_METADATA_PROVIDERS,
  ],
}
