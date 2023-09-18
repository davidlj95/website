import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ExpandLess, ExpandMore } from '../../../material-symbols';
import { DescriptionLine } from '../../../metadata';

@Component({
  selector: 'app-description-line',
  templateUrl: './description-line.component.html',
  styleUrls: ['./description-line.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionLineComponent {
  @Input({required: true}) public line!: DescriptionLine;
  @Input() @HostBinding('attr.data-indent-level') public indentLevel = 0;
  @Input() @HostBinding('attr.data-collapsed') public collapsed: boolean = false;

  protected readonly Icon = {
    ExpandMore: ExpandMore,
    ExpandLess: ExpandLess,
  }

  constructor(
    protected sanitizer: DomSanitizer,
  ) {
  }

  protected get isCollapsable() {
    return this.indentLevel > 0 && this.line.lines && this.line.lines.length
  }

  protected onKeydown($event: KeyboardEvent) {
    if($event.key == "Enter" || $event.key == " ") {
      this.toggleCollapse();
    }
  }

  protected onClick() {
    this.toggleCollapse();
  }

  private toggleCollapse() {
    if(!this.isCollapsable) return;

    this.collapsed = !this.collapsed;
  }
}
