import { inject, InjectionToken } from '@angular/core'
import { WINDOW } from '@/common/injection-tokens'

export type IsMobileFn = () => boolean
export const IS_MOBILE = new InjectionToken<IsMobileFn>('isMobile', {
  factory: () => {
    const window = inject(WINDOW)
    // https://medium.com/@rchr/detecting-mobile-browsers-with-one-line-of-javascript-109713d5869c
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop
    return () =>
      Math.min(window.screen.width, window.screen.height) < 768 ||
      window.navigator.userAgent.indexOf('Mobi') > -1
  },
})
