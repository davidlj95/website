import { Component, inject } from '@angular/core'
import { Lightbulb } from '@/data/material-symbols'
import { Router } from '@angular/router'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { APP_BASE_URL } from '@/common/app-base-url'
import { TestIdDirective } from '@/common/test-id.directive'

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  imports: [MaterialSymbolDirective, TestIdDirective],
})
export class NotFoundPageComponent {
  protected readonly _currentUrlInWaybackMachine: URL
  protected readonly _materialSymbol = {
    Lightbulb,
  }

  constructor() {
    const appBaseUrl = inject<URL>(APP_BASE_URL)
    const router = inject(Router)

    this._currentUrlInWaybackMachine = new URL(
      `${WAYBACK_MACHINE_URL_PREFIX}${new URL(router.url, appBaseUrl)}`,
    )
  }
}

/** @visibleForTesting */
export const WAYBACK_MACHINE_URL_PREFIX = new URL(
  'https://web.archive.org/web/*/',
)
