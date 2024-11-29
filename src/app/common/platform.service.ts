import { isPlatformBrowser } from '@angular/common'
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core'

/** @visibleForTesting */
export class PlatformService {
  constructor(readonly isBrowser: boolean) {}
}

export const PLATFORM_SERVICE = new InjectionToken<PlatformService>(
  /* istanbul ignore next */
  isDevMode ? 'PlatformService' : 'PS',
  {
    providedIn: 'platform',
    factory: () => new PlatformService(isPlatformBrowser(inject(PLATFORM_ID))),
  },
)
