import { METADATA } from '@/data/metadata'
import { Environment } from '.'

export const environment: Environment = {
  isProduction: true,
  appBaseUrl: new URL(`https://${METADATA.domainName}`),
}
