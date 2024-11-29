import { METADATA } from '@/data/metadata'
import { Environment } from '.'

export const environment: Environment = {
  production: true,
  appBaseUrl: new URL(`https://${METADATA.domainName}`),
}
