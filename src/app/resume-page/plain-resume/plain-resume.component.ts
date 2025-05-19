import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { JSON_RESUME_BASICS } from '../profile-section/json-resume-basics'
import { LinkComponent } from '../link/link.component'
import { DateRangeComponent } from '../date-range/date-range.component'
import { GET_EXPERIENCE_ITEMS } from '../experience-section/get-experience-items'
import { GET_EDUCATION_ITEMS } from '../education-section/get-education-items'
import { GET_PROJECT_ITEMS } from '../projects-section/get-project-items'
import { ContentPageComponent } from '../../content-page/content-page.component'
import { MdLinksPipe } from '../md-links.pipe'
import {
  jsonResumeBasicsToSocialContacts,
  jsonResumeBasicsToTraditionalContacts,
} from '../profile-section/profile-contacts/profile-contacts.component'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgIcon } from '@ng-icons/core'
import { GET_LANGUAGE_ITEMS } from '../languages-section/get-language-items'
import { EnergySavingsLeaf } from '@/data/material-symbols'

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
  protected readonly _basics = inject(JSON_RESUME_BASICS)
  protected readonly _traditionalContacts =
    jsonResumeBasicsToTraditionalContacts(this._basics)
  protected readonly _socialContacts = jsonResumeBasicsToSocialContacts(
    this._basics,
  )
  protected readonly _work = inject(GET_EXPERIENCE_ITEMS)()
  protected readonly _education = inject(GET_EDUCATION_ITEMS)()
  protected readonly _projects = inject(GET_PROJECT_ITEMS)()
  protected readonly _languages = inject(GET_LANGUAGE_ITEMS)()
  protected readonly _materialSymbols = { EnergySavingsLeaf }
}
