import { EducationItem } from './education-item'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { EducationItemCoursesComponent } from './education-item-courses/education-item-courses.component'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'

export const educationItemToContents: (
  item: EducationItem,
) => readonly ChippedContent[] = (item) =>
  [
    item.score
      ? new ChippedContent({
          displayName: 'Score',
          component: TextContentComponent,
          inputs: {
            text: item.score,
          },
        })
      : undefined,
    item.courses.length > 0
      ? new ChippedContent({
          displayName: 'Courses',
          component: EducationItemCoursesComponent,
          inputs: {
            courses: item.courses,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
