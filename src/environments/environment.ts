import { METADATA } from '../app/metadata';
import { Environment } from './environment-interface';

export const environment: Environment = {
  production: true,
  canonicalUrl: new URL(`https://v2.${METADATA.domainName}`),
};
