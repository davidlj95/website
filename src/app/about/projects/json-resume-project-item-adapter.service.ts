import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ProjectItem, Stack } from './project-item/project-item'
import { DateRange } from '../date-range/date-range'
import { ENVIRONMENT } from '../../common/injection-tokens'
import { Environment } from '../../../environments'
import { SlugGeneratorService } from '../../common/slug-generator.service'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeProjectItemAdapterService {
  public readonly IMAGE_ASSETS_PATH = 'assets/projects/'
  public readonly IMAGE_EXTENSION = '.png'

  constructor(
    @Inject(ENVIRONMENT) private environment: Environment,
    private slugGenerator: SlugGeneratorService,
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
      image: item.image
        ? this.environment.mapJsonResumeImages
          ? this.imageUrlFromProjectName(item.name)
          : new URL(item.image)
        : undefined,
      stack: item.stack ? this.mapStack(item.stack) : undefined,
    })
  }

  private imageUrlFromProjectName(projectName: string): URL {
    return new URL(
      this.IMAGE_ASSETS_PATH +
        this.slugGenerator.generate(projectName) +
        this.IMAGE_EXTENSION,
      this.environment.canonicalUrl,
    )
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
