import { InjectionToken } from '@angular/core';
import { Metadata, METADATA as METADATA_OBJECT } from '../metadata';

export const METADATA = new InjectionToken<Metadata>('Metadata object', {
  factory: () => METADATA_OBJECT,
});
