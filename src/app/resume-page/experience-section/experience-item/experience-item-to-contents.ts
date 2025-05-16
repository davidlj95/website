import { ExperienceItem } from './experience-item'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
import { ExperienceItemTechComponent } from './experience-item-tech/experience-item-tech.component'

export const experienceItemToContents: (
  item: ExperienceItem,
) => readonly ChippedContent[] = (item) => {
  const summaryContent = item.summary
    ? new ChippedContent({
        displayName: 'Summary',
        component: TextContentComponent,
        inputs: {
          text: item.summary,
        },
      })
    : undefined
  const highlightsContent =
    item.highlights.length > 0
      ? new ChippedContent({
          displayName: 'Highlights',
          component: ExperienceItemHighlightsComponent,
          inputs: {
            highlights: item.highlights,
          },
        })
      : undefined
  const projectsTechnologies = Array.from(
    new Set(item.projects.flatMap((project) => project.technologies)),
  )
  const techContent =
    projectsTechnologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ExperienceItemTechComponent,
          inputs: {
            technologies: projectsTechnologies,
            projectNames: item.projects
              .filter((project) => project.technologies.length > 0)
              .map((project) => project.name),
          },
        })
      : undefined
  return [summaryContent, highlightsContent, techContent].filter(isNotUndefined)
}
