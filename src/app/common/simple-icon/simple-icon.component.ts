import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  input,
  inject,
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

  constructor() {
    const loader = inject<SimpleIconLoader>(SIMPLE_ICON_LOADER)
    const elRef = inject(ElementRef)
    const destroyRef = inject(DestroyRef)

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
