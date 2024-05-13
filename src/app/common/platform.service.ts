import { isPlatformBrowser } from '@angular/common'
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core'

export class PlatformService {
  constructor(public readonly isBrowser: boolean) {}
}

export const PLATFORM_SERVICE = new InjectionToken<PlatformService>(
  isDevMode ? 'PlatformService' : 'PS',
  {
    providedIn: 'platform',
    factory: () => new PlatformService(isPlatformBrowser(inject(PLATFORM_ID))),
  },
)
