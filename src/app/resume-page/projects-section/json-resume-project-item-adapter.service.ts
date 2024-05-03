import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ProjectItem, Stack } from './project-item/project-item'
import { DateRange } from '../date-range/date-range'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeProjectItemAdapterService {
  constructor(
    @Inject(RELATIVIZE_PRODUCTION_URL)
    private readonly relativizeUrl: RelativizeProductionUrl,
  ) {}

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
      imageSrc: item.image
        ? this.relativizeUrl(new URL(item.image))
        : undefined,
      stack: item.stack ? this.mapStack(item.stack) : undefined,
      technologies: item.technologies,
    })
  }

  private mapStack(stack: string): Stack {
    if (Object.values(Stack).includes(stack as Stack)) {
      return stack as Stack
    }
    throw new InvalidStackValueError(stack)
  }
}

export class InvalidStackValueError extends Error {
  constructor(value: string) {
    super(`Invalid stack value: '${value}'`)
  }
}

export type JsonResumeProjectItem = (typeof resume.projects)[number]
