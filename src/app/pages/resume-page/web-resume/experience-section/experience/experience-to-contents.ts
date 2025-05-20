import { ChippedContent } from '@/common/chipped-content/chipped-content'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { ExperienceHighlightsComponent } from './experience-highlights/experience-highlights.component'
import { ExperienceTechComponent } from './experience-tech/experience-tech.component'
import { Experience } from '../../../data/experience/experience'
import { inject, InjectionToken } from '@angular/core'
import { PROJECT_SERVICE } from '../../../data/projects/project-service'
import { map, Observable } from 'rxjs'

type ExperienceToContents = (
  experience: Experience,
) => Observable<readonly ChippedContent[]>
export const EXPERIENCE_TO_CONTENTS = new InjectionToken<ExperienceToContents>(
  /* istanbul ignore next */
  isDevMode ? 'ExperienceToContents' : 'E2C',
  {
    factory: () => {
      const projectService = inject(PROJECT_SERVICE)
      return (experience) =>
        projectService.getByCompanyName(experience.company.name).pipe(
          map((projects) => {
            const summaryContent = experience.summary
              ? new ChippedContent({
                  displayName: 'Summary',
                  component: TextContentComponent,
                  inputs: {
                    text: experience.summary,
                  },
                })
              : undefined
            const highlightsContent =
              experience.highlights.length > 0
                ? new ChippedContent({
                    displayName: 'Highlights',
                    component: ExperienceHighlightsComponent,
                    inputs: {
                      highlights: experience.highlights,
                    },
                  })
                : undefined
            const projectsTechnologies = Array.from(
              new Set(projects.flatMap((project) => project.technologies)),
            )
            const techContent =
              projectsTechnologies.length > 0
                ? new ChippedContent({
                    displayName: 'Tech',
                    component: ExperienceTechComponent,
                    inputs: {
                      technologies: projectsTechnologies,
                      projectNames: projects
                        .filter((project) => project.technologies.length > 0)
                        .map((project) => project.name),
                    },
                  })
                : undefined
            return [summaryContent, highlightsContent, techContent].filter(
              isNotUndefined,
            )
          }),
        )
    },
  },
)
