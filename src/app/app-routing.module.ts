import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ResumePageComponent } from './resume-page/resume-page.component'
import { NotFoundPageComponent } from './not-found-page/not-found-page.component'
import { METADATA } from './metadata'
import { environment } from '../environments'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { StandardMetadata } from '@davidlj95/ngx-meta/standard'

const notFoundPageData: NgxMetaRouteData<GlobalMetadata & StandardMetadata> = {
  meta: {
    title: `${METADATA.siteName} | Not Found`,
    description: 'Page could not be found',
    canonicalUrl: null,
    image: null,
    standard: {
      keywords: null,
    },
  },
}
const resumePath = 'resume'
const resumePageData: NgxMetaRouteData<GlobalMetadata> = {
  meta: {
    title: `${METADATA.siteName} | Resume`,
    canonicalUrl: new URL(resumePath, environment.canonicalUrl),
  },
}
const routes: Routes = [
  { path: '', redirectTo: `/${resumePath}`, pathMatch: 'full' },
  { path: resumePath, component: ResumePageComponent, data: resumePageData },
  { path: '404', component: NotFoundPageComponent, data: notFoundPageData },
  { path: '**', component: NotFoundPageComponent, data: notFoundPageData },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
