import { Component, Inject } from '@angular/core'
import { Lightbulb } from '../material-symbols'
import { Router } from '@angular/router'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { APP_BASE_URL } from '@/common/app-base-url'

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  standalone: true,
  imports: [MaterialSymbolDirective],
})
export class NotFoundPageComponent {
  public readonly currentUrlInWaybackMachine: URL
  protected readonly MaterialSymbol = {
    Lightbulb,
  }

  constructor(@Inject(APP_BASE_URL) appBaseUrl: URL, router: Router) {
    const currentUrl = new URL(router.url, appBaseUrl)
    this.currentUrlInWaybackMachine = new URL(
      `${WAYBACK_MACHINE_URL_PREFIX}${currentUrl}`,
    )
  }
}

export const WAYBACK_MACHINE_URL_PREFIX = new URL(
  'https://web.archive.org/web/*/',
)
