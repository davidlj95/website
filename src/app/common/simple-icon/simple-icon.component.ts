import { Component, DestroyRef, ElementRef, Inject, Input } from '@angular/core'
import {
  SIMPLE_ICON_LOADER,
  SimpleIconLoader,
} from '@/common/simple-icon/simple-icon-loader'
import { tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'

@Component({
  selector: 'app-simple-icon',
  imports: [],
  templateUrl: './simple-icon.component.html',
  host: {
    '[style.fill]': '_fillColor',
  },
})
export class SimpleIconComponent {
  constructor(
    @Inject(SIMPLE_ICON_LOADER) private readonly loader: SimpleIconLoader,
    private readonly elRef: ElementRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  protected _fillColor?: string

  @Input({ required: true }) set icon(icon: SimpleIcon) {
    this.loader(icon.slug)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((svg) => (this.elRef.nativeElement.innerHTML = svg)),
      )
      .subscribe()
    this._fillColor = `#${icon.hex}`
  }
}

export const SIMPLE_ICONS_DIR = 'simple-icons'
