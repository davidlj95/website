import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ResumePageComponent } from './resume-page/resume-page.component'
import { NotFoundPageComponent } from './not-found-page/not-found-page.component'
import { IPageSeoData } from '@ngaox/seo'
import { METADATA } from './metadata'

const notFoundPageData: { NgaoxSeo: IPageSeoData } = {
  NgaoxSeo: {
    title: `${METADATA.siteName} | Not Found`,
    description: 'Page could not be found',
    keywords: undefined,
    url: undefined,
    image: undefined,
  },
}
const routes: Routes = [
  { path: '', component: ResumePageComponent, pathMatch: 'full' },
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
