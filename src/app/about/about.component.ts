import { Component, Inject } from '@angular/core'
import { METADATA } from '../common/injection-tokens'
import { DescriptionLine, Metadata } from '../metadata'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public readonly realName = this.metadata.realName
  public readonly nickname = this.metadata.nickname
  public readonly title = this.metadata.title
  public readonly rootLine = new DescriptionLine(
    undefined,
    this.metadata.descriptionLines,
  )

  constructor(@Inject(METADATA) private metadata: Metadata) {}
}
