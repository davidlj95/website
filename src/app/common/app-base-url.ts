import { InjectionToken } from '@angular/core'
import { environment } from '../../environments'

export const APP_BASE_URL = new InjectionToken<URL>(
  isDevMode ? 'App base URL' : 'ABU',
  {
    factory: () => environment.appBaseUrl,
  },
)