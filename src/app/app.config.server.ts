import { ApplicationConfig, mergeApplicationConfig } from '@angular/core'
import { provideServerRendering } from '@angular/ssr'

import { WINDOW } from '@/common/injection-tokens'
import { appConfig } from './app.config'

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // No window available on server. Shouldn't be used anyway
    { provide: WINDOW, useValue: {} },
  ],
}
export const config = mergeApplicationConfig(appConfig, serverConfig)
