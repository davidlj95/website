import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  Inject,
  input,
} from '@angular/core'
import {
  SIMPLE_ICON_LOADER,
  SimpleIconLoader,
} from '@/common/simple-icon/simple-icon-loader'
import { tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-simple-icon',
  imports: [],
  template: '',
  host: {
    '[style.fill]': '"#"+this.hex()',
  },
})
export class SimpleIconComponent {
  readonly slug = input.required<string>()
  readonly hex = input<string>()

  constructor(
    @Inject(SIMPLE_ICON_LOADER) loader: SimpleIconLoader,
    elRef: ElementRef,
    destroyRef: DestroyRef,
  ) {
    effect(() => {
      loader(this.slug())
        .pipe(
          takeUntilDestroyed(destroyRef),
          tap((svg) => ((elRef.nativeElement as Element).innerHTML = svg)),
        )
        .subscribe()
    })
  }
}
