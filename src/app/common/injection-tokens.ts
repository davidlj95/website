import { InjectionToken } from '@angular/core'
import { METADATA as METADATA_OBJECT, Metadata } from '../metadata'
import { isDevMode } from '@/common/is-dev-mode'

/* istanbul ignore next */
export const METADATA = new InjectionToken<Metadata>(
  isDevMode ? 'Metadata object' : 'Mo',
  {
    factory: () => METADATA_OBJECT,
  },
)
export const WINDOW = new InjectionToken<Window>(
  isDevMode ? 'Global window object' : 'Gwo',
  {
    factory: () => window,
  },
)
