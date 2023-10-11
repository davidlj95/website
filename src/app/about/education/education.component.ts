import { Component } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { JsonResumeAdapterService } from '../json-resume-adapter.service'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  protected items: ReadonlyArray<EducationItem>

  constructor(jsonResumeAdapter: JsonResumeAdapterService) {
    this.items = jsonResumeAdapter.getEducationItems()
  }
}
