import { SimpleIcon } from '@/common/simple-icon/simple-icon'

export interface TechnologyItem {
  readonly slug: string
  readonly displayName: string
  readonly icon?: SimpleIcon
  readonly version?: string
}
