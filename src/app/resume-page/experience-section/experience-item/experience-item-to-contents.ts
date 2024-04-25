import { ExperienceItem } from './experience-item'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'

type ExperienceItemToContents = (
  item: ExperienceItem,
) => ReadonlyArray<ChippedContent>
export const experienceItemToContents: ExperienceItemToContents = (item) =>
  [
    item.summary
      ? new ChippedContent({
          displayName: 'Summary',
          component: TextContentComponent,
          inputs: {
            text: item.summary,
          },
        })
      : undefined,
    item.highlights.length > 0
      ? new ChippedContent({
          displayName: 'Highlights',
          component: ExperienceItemHighlightsComponent,
          inputs: {
            highlights: item.highlights,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
