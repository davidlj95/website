import { ChippedContent } from '@/common/chipped-content/chipped-content'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { ExperienceHighlightsComponent } from './experience-highlights/experience-highlights.component'
import { ExperienceTechComponent } from './experience-tech/experience-tech.component'
import { Experience } from '../../../data/experience'

export const experienceToContents = (
  experience: Experience,
): readonly ChippedContent[] => {
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
    new Set(experience.projects.flatMap((project) => project.technologies)),
  )
  const techContent =
    projectsTechnologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ExperienceTechComponent,
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
