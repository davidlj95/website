import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { LinkComponent } from '../link/link.component'
import { DateRangeComponent } from '../date-range/date-range.component'
import { EDUCATION_SERVICE } from '../data/education-service'
import { PROJECT_SERVICE } from '../data/project-service'
import { ContentPageComponent } from '../../content-page/content-page.component'
import { MdLinksPipe } from '../md-links.pipe'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgIcon } from '@ng-icons/core'
import { GET_LANGUAGE_ITEMS } from '../languages-section/get-language-items'
import { EnergySavingsLeaf } from '@/data/material-symbols'
import { BASICS_SERVICE } from '../data/basics-service'
import { toSignal } from '@angular/core/rxjs-interop'
import { EXPERIENCE_SERVICE } from '../data/experience-service'

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
  private readonly _basicsService = inject(BASICS_SERVICE)
  protected readonly _profile = toSignal(this._basicsService.getProfile())
  protected readonly _contacts = toSignal(this._basicsService.getContacts())
  protected readonly _socials = toSignal(this._basicsService.getSocials())

  protected readonly _experiences = toSignal(
    inject(EXPERIENCE_SERVICE).getAll(),
  )
  protected readonly _educations = toSignal(inject(EDUCATION_SERVICE).getAll())
  protected readonly _projects = toSignal(inject(PROJECT_SERVICE)())
  protected readonly _languages = inject(GET_LANGUAGE_ITEMS)()
  protected readonly _materialSymbols = { EnergySavingsLeaf }
}
