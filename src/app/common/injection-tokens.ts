import { InjectionToken } from '@angular/core';
import * as RELEASE_OBJECT from '../../../release.json';
import { environment, Environment } from '../../environments';
import { METADATA as METADATA_OBJECT, Metadata } from '../metadata';
import { ReleaseInfo } from '../release-info/semantic-release';

/* istanbul ignore next */
export const ENVIRONMENT = new InjectionToken<Environment>('Environment config', {
  factory: () => environment,
});
/* istanbul ignore next */
export const METADATA = new InjectionToken<Metadata>('Metadata object', {
  factory: () => METADATA_OBJECT,
});
export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window,
});
export const RELEASE = new InjectionToken<ReleaseInfo>('Release object', {
  // Have to manually cast as strings are not checked against the union type
  // https://github.com/microsoft/TypeScript/issues/26552
  factory: () => RELEASE_OBJECT as ReleaseInfo,
});
