import { Component, Input } from '@angular/core'
import { Position } from './position'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'
import {
  Badge,
  More,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  @Input({ required: true }) public position!: Position
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
  }
}
