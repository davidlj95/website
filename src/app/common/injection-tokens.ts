import { InjectionToken } from '@angular/core'
import RELEASE_OBJECT from '../../../release.json'
import { environment, Environment } from '../../environments'
import { METADATA as METADATA_OBJECT, Metadata } from '../metadata'
import {
  ReleaseInfo,
  ReleaseInfoSummary,
} from '../release-info/semantic-release'

/* istanbul ignore next */
export const ENVIRONMENT = new InjectionToken<Environment>(
  'Environment config',
  {
    factory: () => environment,
  },
)
/* istanbul ignore next */
export const METADATA = new InjectionToken<Metadata>('Metadata object', {
  factory: () => METADATA_OBJECT,
})
export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window,
})
export const RELEASE = new InjectionToken<ReleaseInfoSummary>(
  'Release object',
  {
    // Have to manually cast as strings are not checked against the union type
    // https://github.com/microsoft/TypeScript/issues/26552
    // Adding just picked properties because full object may increase a lot the bundle size.
    // Also, if we want to generate this file on older commits, like tagged ones, this may need to be mocked
    factory: () =>
      ({
        nextRelease: RELEASE_OBJECT.nextRelease,
        fake: (RELEASE_OBJECT as ReleaseInfo).fake,
        preview: (RELEASE_OBJECT as ReleaseInfo).preview,
      }) as ReleaseInfoSummary,
  },
)
