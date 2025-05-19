import { ChippedContent } from '../../chipped-content/chipped-content'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
import { ExperienceItemTechComponent } from './experience-item-tech/experience-item-tech.component'
import { Experience } from '../../data/experience-service'

export const experienceToContents: (
  experience: Experience,
) => readonly ChippedContent[] = (experience) => {
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
          component: ExperienceItemHighlightsComponent,
          inputs: {
            highlights: experience.highlights,
          },
        })
      : undefined
  const projectsTechnologies = Array.from(
    new Set(experience.projects.flatMap((project) => project.technologies)),
  )
  const techContent =
    projectsTechnologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ExperienceItemTechComponent,
          inputs: {
            technologies: projectsTechnologies,
            projectNames: experience.projects
              .filter((project) => project.technologies.length > 0)
              .map((project) => project.name),
          },
        })
      : undefined
  return [summaryContent, highlightsContent, techContent].filter(isNotUndefined)
}
