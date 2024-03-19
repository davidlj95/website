import { isPlatformBrowser } from '@angular/common'
import { FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core'

export interface PlatformService {
  readonly isBrowser: boolean
  readonly isServer: boolean
}

// Not using `@Injectable` for performance purposes 🧑‍💻
class AngularPlatformService {
  public readonly isBrowser = isPlatformBrowser(this._platformId)
  public readonly isServer = !this.isBrowser

  constructor(private readonly _platformId: object) {}
}

export const PLATFORM_SERVICE = new InjectionToken<PlatformService>('PlatServ')
export const PLATFORM_SERVICE_PROVIDER: FactoryProvider = {
  provide: PLATFORM_SERVICE,
  useFactory: (platformId: object) => new AngularPlatformService(platformId),
  deps: [PLATFORM_ID],
}
