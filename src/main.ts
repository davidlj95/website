import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { APP_MODULE_METADATA_IMPORTS } from './app/app.module'
import { importProvidersFrom } from '@angular/core'
import { AppComponent } from './app/app.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxMetaTwitterCardModule } from '@davidlj95/ngx-meta/twitter-card'
import { NgxMetaOpenGraphModule } from '@davidlj95/ngx-meta/open-graph'
import { NgxMetaStandardModule } from '@davidlj95/ngx-meta/standard'
import { NgxMetaRoutingModule } from '@davidlj95/ngx-meta/routing'
import { METADATA_DEFAULTS } from './app/app.metadata-defaults'
import { NgxMetaCoreModule } from '@davidlj95/ngx-meta/core'
import { NgOptimizedImage } from '@angular/common'
import { provideAnimations } from '@angular/platform-browser/animations'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { routes } from './app/app.routes'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  RouterModule,
} from '@angular/router'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      // 👇 Temporary until app component is standalone
      RouterModule,
      NgOptimizedImage,
      ...APP_MODULE_METADATA_IMPORTS,
      FontAwesomeModule,
    ),
    provideRouter(
      routes,
      // 👇 Needed for SSR
      withEnabledBlockingInitialNavigation(),
    ),
    provideAnimations(),
  ],
}).catch((err) => console.error(err))
