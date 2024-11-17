import { METADATA } from '@/data/metadata'
import { Environment } from './environment-interface'

export const environment: Environment = {
  production: true,
  appBaseUrl: new URL(`https://${METADATA.domainName}`),
}
