import { Component, Input } from '@angular/core'
import { ProjectItem, Stack } from './project-item'
import { SlugGeneratorService } from '../../../common/slug-generator.service'
import { Apps, Dns, FullStackedBarChart } from '../../../material-symbols'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Input({ required: true }) public item!: ProjectItem
  protected readonly StackContent = StackContent
  protected readonly Attribute = Attribute

  constructor(private slugGenerator: SlugGeneratorService) {}

  private get itemId(): string {
    return `project-${this.slugGenerator.generate(this.item.name)}`
  }

  public getAttributeId(attribute: Attribute): string {
    return `${this.itemId}-${attribute}`
  }
}

export enum Attribute {
  Stack = 'stack',
}

export const StackContent: { [Property in Stack]: StackContent } = {
  [Stack.Back]: {
    displayName: 'Backend',
    materialSymbol: Dns,
  },
  [Stack.Front]: { displayName: 'Frontend', materialSymbol: Apps },
  [Stack.Full]: {
    displayName: 'Full stack',
    materialSymbol: FullStackedBarChart,
  },
}

export interface StackContent {
  displayName: string
  materialSymbol: string
}
