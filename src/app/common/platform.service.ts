import { isPlatformBrowser } from '@angular/common'
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core'

export class PlatformService {
  readonly isBrowser: boolean
  readonly isServer: boolean

  constructor(isBrowser: boolean) {
    this.isBrowser = isBrowser
    this.isServer = !isBrowser
  }
}

//👇 Not @Injectable for perf purposes
export const PLATFORM_SERVICE = new InjectionToken<PlatformService>(
  isDevMode ? 'PlatformService' : 'PS',
  {
    providedIn: 'platform',
    factory: () => new PlatformService(isPlatformBrowser(inject(PLATFORM_ID))),
  },
)
