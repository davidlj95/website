import { BehaviorSubject, Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'

/** @visibleForTesting */
export interface ResumeConfigService {
  compact$: Observable<boolean>
  setCompact(compact: boolean): void
}

export const RESUME_CONFIG_SERVICE = new InjectionToken<ResumeConfigService>(
  /* istanbul ignore next */
  isDevMode ? 'ResumeConfigService' : 'rCS',
  {
    factory: () => {
      const compact$ = new BehaviorSubject(false)
      return {
        compact$,
        setCompact: (isCompact: boolean) => {
          compact$.next(isCompact)
        },
      }
    },
  },
)
