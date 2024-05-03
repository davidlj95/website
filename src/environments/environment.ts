import { METADATA } from '../app/metadata'
import { Environment } from './environment-interface'

export const environment: Environment = {
  production: true,
  appBaseUrl: new URL(`https://${METADATA.domainName}`),
}
