import { Component, computed, inject } from '@angular/core'
import { ToolbarComponent } from '@/common/toolbar/toolbar.component'
import { ActivatedRoute, Router } from '@angular/router'
import { WebResumeComponent } from './web-resume/web-resume.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'
import { PlainResumeComponent } from './plain-resume/plain-resume.component'
import {
  SelectorComponent,
  SelectorOption,
} from '@/common/selector/selector.component'
import { ToolbarButtonComponent } from '@/common/toolbar-button/toolbar-button.component'
import { Print } from '@/data/material-symbols'

@Component({
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
  imports: [
    ToolbarComponent,
    WebResumeComponent,
    PlainResumeComponent,
    SelectorComponent,
    ToolbarButtonComponent,
  ],
})
export class ResumePageComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)

  protected readonly _displayMode = toSignal<DisplayMode>(
    inject(ActivatedRoute).queryParamMap.pipe(
      map((route) => (route.has(PLAIN_QUERY_PARAM) ? PLAIN : WEB)),
    ),
  )
  protected readonly _isPlainDisplayMode = computed(
    () => this._displayMode() === PLAIN,
  )

  protected readonly _displayModeOptions: readonly SelectorOption<DisplayMode>[] =
    [
      { name: 'Web', value: WEB },
      { name: 'Plain', value: PLAIN },
    ]

  onDisplayModeChange(displayMode: DisplayMode) {
    const queryParams = displayMode === PLAIN ? { [PLAIN_QUERY_PARAM]: '' } : {}
    void this._router.navigate(['.'], {
      relativeTo: this._route,
      queryParams,
    })
  }

  protected readonly _materialSymbols = { Print }
}

/** @visibleForTesting */
export const WEB = 'web'
const PLAIN = 'plain'
type DisplayMode = typeof WEB | typeof PLAIN
const PLAIN_QUERY_PARAM = PLAIN
/** @visibleForTesting */
export { PLAIN, PLAIN_QUERY_PARAM }
