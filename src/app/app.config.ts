import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { APP_METADATA_PROVIDERS } from './app.metadata-imports'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideClientHydration } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { provideTrailingSlashUrlSerializer } from '@/common/provide-trailing-slash-url-serializer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    ...APP_METADATA_PROVIDERS,
    provideTrailingSlashUrlSerializer(),
  ],
}
