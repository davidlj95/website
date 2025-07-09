import { afterNextRender, inject, DOCUMENT } from '@angular/core'

import { IS_MOBILE } from '@/common/is-mobile'

export const maybeLoadConsoleEasterEgg = () => {
  const document = inject(DOCUMENT)
  const isMobile = inject(IS_MOBILE)
  afterNextRender({
    write: () => {
      if (isMobile()) {
        return
      }
      const script = document.createElement('script')
      script.src = 'console-easter-egg.js'
      script.async = true
      document.body.appendChild(script)
    },
  })
}
