import { ChippedContent } from '@/common/chipped-content/chipped-content'
import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { ExperienceHighlightsComponent } from './experience-highlights/experience-highlights.component'
import { ExperienceTechComponent } from './experience-tech/experience-tech.component'
import { Experience } from '../../../data/experience/experience'
import { isNotUndefined } from '@/common/is-not-undefined'

export const experienceToContents = ({
  summary,
  highlights,
  technologies,
  relatedProjects,
}: Experience): readonly ChippedContent[] =>
  [
    summary
      ? new ChippedContent({
          displayName: 'Summary',
          component: TextContentComponent,
          inputs: {
            text: summary,
          },
        })
      : undefined,
    highlights.length > 0
      ? new ChippedContent({
          displayName: 'Highlights',
          component: ExperienceHighlightsComponent,
          inputs: {
            highlights,
          },
        })
      : undefined,
    technologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ExperienceTechComponent,
          inputs: {
            technologies: technologies,
            projectNames: relatedProjects,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
