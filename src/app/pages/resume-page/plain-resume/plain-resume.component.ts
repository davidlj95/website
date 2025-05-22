import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { LinkComponent } from '../link/link.component'
import { DateRangeComponent } from '../date-range/date-range.component'
import { PROJECT_SERVICE } from '../data/projects/project-service'
import { ContentPageComponent } from '@/common/content-page/content-page.component'
import { MdLinksPipe } from '../md-links.pipe'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgIcon } from '@ng-icons/core'
import { EnergySavingsLeaf } from '@/data/material-symbols'
import { toSignal } from '@angular/core/rxjs-interop'
import { GET_JSON_RESUME_BASICS } from '../data/basics/get-json-resume-basics'
import { GET_JSON_RESUME_LANGUAGES } from '../data/languages/get-json-resume-languages'
import { EDUCATION_SERVICE } from '../data/education/education.service'
import { EXPERIENCE_SERVICE } from '../data/experience/experience.service'

@Component({
  selector: 'app-plain-resume',
  imports: [
    LinkComponent,
    DateRangeComponent,
    ContentPageComponent,
    MdLinksPipe,
    MaterialSymbolDirective,
    NgIcon,
  ],
  templateUrl: './plain-resume.component.html',
  styleUrl: './plain-resume.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlainResumeComponent {
  protected readonly _basics = toSignal(inject(GET_JSON_RESUME_BASICS)())
  protected readonly _experiences = toSignal(
    inject(EXPERIENCE_SERVICE).getAll(),
  )
  protected readonly _educations = toSignal(inject(EDUCATION_SERVICE).getAll())
  protected readonly _projects = toSignal(inject(PROJECT_SERVICE).getAll())
  protected readonly _languages = toSignal(inject(GET_JSON_RESUME_LANGUAGES)())
  protected readonly _materialSymbols = { EnergySavingsLeaf }
}
