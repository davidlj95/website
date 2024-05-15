import { InjectionToken } from '@angular/core'
import { environment } from '../../environments'

export const APP_BASE_URL = new InjectionToken<URL>(
  /* istanbul ignore next */
  isDevMode ? 'App base URL' : 'ABU',
  {
    factory: () => environment.appBaseUrl,
  },
)
