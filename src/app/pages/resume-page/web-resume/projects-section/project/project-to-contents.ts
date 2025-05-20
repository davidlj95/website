import { ChippedContent } from '@/common/chipped-content/chipped-content'
import { Project } from '../../../data/projects/project'
import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { ProjectTechnologiesComponent } from './project-technologies/project-technologies.component'
import { isNotUndefined } from '@/common/is-not-undefined'

export const projectToContents = (
  project: Project,
): readonly ChippedContent[] =>
  [
    project.description
      ? new ChippedContent({
          displayName: 'Description',
          component: TextContentComponent,
          inputs: {
            text: project.description,
          },
        })
      : undefined,
    project.technologies.length > 0
      ? new ChippedContent({
          displayName: 'Tech',
          component: ProjectTechnologiesComponent,
          inputs: {
            technologies: project.technologies,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
