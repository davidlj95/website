import { Component, computed, inject } from '@angular/core'
import { ToolbarComponent } from '@/common/toolbar/toolbar.component'
import { ActivatedRoute, Router } from '@angular/router'
import { WebResumeComponent } from './web-resume/web-resume.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs'
import { PlainResumeComponent } from './plain-resume/plain-resume.component'
import {
  SelectorComponent,
  SelectorOption,
} from '@/common/selector/selector.component'
import { ToolbarButtonComponent } from '@/common/toolbar-button/toolbar-button.component'
import { Print } from '@/data/material-symbols'
import { CheckboxLabelComponent } from '@/common/checkbox-label/checkbox-label.component'
import { CheckboxComponent } from '@/common/checkbox/checkbox.component'
import { RESUME_CONFIG_SERVICE } from './data/resume-config.service'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { faFilePdf } from '@ng-icons/font-awesome/regular'

const ngIcons = { faFilePdf }
@Component({
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
  imports: [
    ToolbarComponent,
    WebResumeComponent,
    PlainResumeComponent,
    SelectorComponent,
    ToolbarButtonComponent,
    CheckboxLabelComponent,
    CheckboxComponent,
    NgIcon,
  ],
  providers: [provideIcons(ngIcons)],
})
export class ResumePageComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _resumeConfigService = inject(RESUME_CONFIG_SERVICE)

  protected readonly _displayMode = toSignal<DisplayMode>(
    inject(ActivatedRoute).queryParamMap.pipe(
      map((route) => (route.has(PLAIN_QUERY_PARAM) ? PLAIN : WEB)),
      tap((displayMode) => {
        const isPlain = displayMode === PLAIN
        this._resumeConfigService.setCompact(isPlain)
      }),
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

  protected _isCompact = toSignal(this._resumeConfigService.compact$)

  onCompactModeChange(event: Event) {
    const isCompact = (event.target as HTMLInputElement).checked
    this._resumeConfigService.setCompact(isCompact)
  }

  protected readonly _materialSymbols = { Print }
  protected readonly _ngIcons = ngIcons
}

/** @visibleForTesting */
export const WEB = 'web'
const PLAIN = 'plain'
type DisplayMode = typeof WEB | typeof PLAIN
const PLAIN_QUERY_PARAM = PLAIN
/** @visibleForTesting */
export { PLAIN, PLAIN_QUERY_PARAM }
