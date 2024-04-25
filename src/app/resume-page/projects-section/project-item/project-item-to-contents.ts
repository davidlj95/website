import { ChippedContent } from '../../chipped-content/chipped-content'
import { ProjectItem } from './project-item'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { ProjectItemTechnologiesComponent } from './project-item-technologies/project-item-technologies.component'
import { isNotUndefined } from '@/common/is-not-undefined'

type ProjectItemToContents = (
  item: ProjectItem,
) => ReadonlyArray<ChippedContent>
export const projectItemToContents: ProjectItemToContents = (item) =>
  [
    item.description
      ? new ChippedContent({
          displayName: 'Description',
          component: TextContentComponent,
          inputs: {
            text: item.description,
          },
        })
      : undefined,
    item.technologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ProjectItemTechnologiesComponent,
          inputs: {
            technologies: item.technologies,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
