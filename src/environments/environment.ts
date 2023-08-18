import { DOMAIN_NAME } from '../app/metadata';
import { Environment } from './environment-interface';

export const environment: Environment = {
  production: true,
  canonicalUrl: new URL(`https://v2.${DOMAIN_NAME}`),
};
