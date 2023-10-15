import { Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ProjectItem } from './project-item/project-item'
import { DateRange } from '../date-range/date-range'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeProjectItemAdapterService {
  public adapt(item: JsonResumeProjectItem): ProjectItem {
    return new ProjectItem({
      name: item.name,
      description: item.description,
      dateRange: new DateRange(
        new Date(item.startDate),
        item.endDate ? new Date(item.endDate) : undefined,
      ),
      website: item.url ? new URL(item.url) : undefined,
      roles: item.roles,
    })
  }
}

export type JsonResumeProjectItem = (typeof resume.projects)[number]
