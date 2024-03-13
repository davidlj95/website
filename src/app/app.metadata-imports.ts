import { NgxMetaCoreModule } from '@davidlj95/ngx-meta/core'
import { NgxMetaRoutingModule } from '@davidlj95/ngx-meta/routing'
import { NgxMetaStandardModule } from '@davidlj95/ngx-meta/standard'
import { NgxMetaOpenGraphModule } from '@davidlj95/ngx-meta/open-graph'
import { NgxMetaTwitterCardModule } from '@davidlj95/ngx-meta/twitter-card'
import { METADATA_DEFAULTS } from './app.metadata-defaults'

export const APP_METADATA_IMPORTS = [
  NgxMetaCoreModule.forRoot({
    defaults: METADATA_DEFAULTS,
  }),
  NgxMetaRoutingModule.forRoot(),
  NgxMetaStandardModule,
  NgxMetaOpenGraphModule,
  NgxMetaTwitterCardModule,
]
