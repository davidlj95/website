import { METADATA } from '../app/metadata'
import { Environment } from './environment-interface'

export const environment: Environment = {
  production: true,
  mapJsonResumeImages: false,
  canonicalUrl: new URL(`https://${METADATA.domainName}`),
}
