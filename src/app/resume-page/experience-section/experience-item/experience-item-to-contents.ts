import { ExperienceItem } from './experience-item'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
import { ExperienceItemTechComponent } from './experience-item-tech/experience-item-tech.component'
import { TechnologyItem } from '../../technology/technology-item'

type ExperienceItemToContents = (
  item: ExperienceItem,
) => ReadonlyArray<ChippedContent>
export const experienceItemToContents: ExperienceItemToContents = (item) => {
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
  const projectsTechnologies = item.projects.flatMap(
    (project) => project.technologies,
  )
  const techContent =
    projectsTechnologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ExperienceItemTechComponent,
          inputs: {
            technologies: Array.from(
              new Set(projectsTechnologies.map<string>(({ slug }) => slug)),
            ).map<TechnologyItem>((slug) => ({ slug })),
            projectNames: item.projects
              .filter((project) => project.technologies.length > 0)
              .map((project) => project.name),
          },
        })
      : undefined
  return [summaryContent, highlightsContent, techContent].filter(isNotUndefined)
}
