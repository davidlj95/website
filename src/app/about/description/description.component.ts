import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionComponent {
  constructor(
    @Inject(METADATA) protected metadata: Metadata,
  ) {
  }
}
