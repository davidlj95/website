import { InjectionToken } from '@angular/core';
import { environment, Environment } from '../../environments';
import { METADATA as METADATA_OBJECT, Metadata } from '../metadata';

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
