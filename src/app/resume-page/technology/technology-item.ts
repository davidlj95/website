import { SafeHtml } from '@angular/platform-browser'

export interface TechnologyItem {
  readonly slug: string
  readonly displayName: string
  readonly icon?: TechnologyIcon
  readonly version?: string
}

export interface TechnologyIcon {
  readonly svg: SafeHtml
  readonly color?: string
}
