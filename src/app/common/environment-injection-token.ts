import { InjectionToken } from '@angular/core';
import { Environment, environment } from '../../environments';

export const ENVIRONMENT = new InjectionToken<Environment>('Environment config', {
  factory: () => environment,
});
