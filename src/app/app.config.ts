import { ApplicationConfig } from '@angular/core'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router'
import { APP_METADATA_PROVIDERS } from './app.metadata-imports'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { PLATFORM_SERVICE_PROVIDER } from './common/platform.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // 👇 Needed for SSR
      withEnabledBlockingInitialNavigation(),
    ),
    provideAnimationsAsync(),
    ...APP_METADATA_PROVIDERS,
    PLATFORM_SERVICE_PROVIDER,
  ],
}
