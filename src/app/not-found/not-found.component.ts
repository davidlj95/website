import { Component, Inject } from '@angular/core'
import { Lightbulb } from '../material-symbols'
import { MATERIAL_SYMBOLS_CLASS } from '../common/material-symbols'
import { Router } from '@angular/router'
import { Environment } from '../../environments'
import { ENVIRONMENT } from '../common/injection-tokens'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  public readonly currentUrlInWaybackMachine: URL
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    Lightbulb,
  }

  constructor(@Inject(ENVIRONMENT) environment: Environment, router: Router) {
    const currentUrl = new URL(router.url, environment.canonicalUrl)
    this.currentUrlInWaybackMachine = new URL(
      `${WAYBACK_MACHINE_URL_PREFIX}${currentUrl}`,
    )
  }
}

export const WAYBACK_MACHINE_URL_PREFIX = new URL(
  'https://web.archive.org/web/*/',
)
