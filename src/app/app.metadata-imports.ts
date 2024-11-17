import {
  provideNgxMetaCore,
  withNgxMetaDefaults,
} from '@davidlj95/ngx-meta/core'
import { provideNgxMetaRouting } from '@davidlj95/ngx-meta/routing'
import { provideNgxMetaStandard } from '@davidlj95/ngx-meta/standard'
import { provideNgxMetaOpenGraph } from '@davidlj95/ngx-meta/open-graph'
import { provideNgxMetaTwitterCard } from '@davidlj95/ngx-meta/twitter-card'
import { METADATA_DEFAULTS } from './app.metadata-defaults'
import { EnvironmentProviders, Provider } from '@angular/core'

export const APP_METADATA_PROVIDERS: readonly (
  | Provider
  | EnvironmentProviders
)[] = [
  provideNgxMetaCore(withNgxMetaDefaults(METADATA_DEFAULTS)),
  provideNgxMetaRouting(),
  provideNgxMetaStandard(),
  provideNgxMetaOpenGraph(),
  provideNgxMetaTwitterCard(),
]
