import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ResumePageComponent } from './resume-page/resume-page.component'
import { NotFoundPageComponent } from './not-found-page/not-found-page.component'
import { IPageSeoData } from '@ngaox/seo'
import { METADATA } from './metadata'
import { environment } from '../environments'

const notFoundPageData: { NgaoxSeo: IPageSeoData } = {
  NgaoxSeo: {
    title: `${METADATA.siteName} | Not Found`,
    description: 'Page could not be found',
    keywords: undefined,
    url: undefined,
    image: undefined,
  },
}
const resumePath = 'resume'
const resumePageData: { NgaoxSeo: IPageSeoData } = {
  NgaoxSeo: {
    title: `${METADATA.siteName} | Resume`,
    url: new URL(resumePath, environment.canonicalUrl).toString(),
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
