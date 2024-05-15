import { InjectionToken } from '@angular/core'
import { METADATA as METADATA_OBJECT, Metadata } from '../metadata'

/* istanbul ignore next */
export const METADATA = new InjectionToken<Metadata>(
  /* istanbul ignore next */
  isDevMode ? 'Metadata object' : 'Mo',
  {
    factory: () => METADATA_OBJECT,
  },
)
export const WINDOW = new InjectionToken<Window>(
  /* istanbul ignore next */
  isDevMode ? 'Global window object' : 'Gwo',
  {
    factory: () => window,
  },
)
