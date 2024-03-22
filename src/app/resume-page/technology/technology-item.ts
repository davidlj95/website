import { SafeHtml } from '@angular/platform-browser'

export interface TechnologyItem {
  readonly id: string
  readonly displayName: string
  readonly version?: string
  readonly icon?: TechnologyItemIcon
}

export interface TechnologyItemIcon {
  readonly svg: SafeHtml
  readonly color?: string
}
