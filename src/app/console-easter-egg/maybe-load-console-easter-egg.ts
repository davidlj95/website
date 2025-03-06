import { afterNextRender, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
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
