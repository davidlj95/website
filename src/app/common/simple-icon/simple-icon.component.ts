import {
  Component,
  computed,
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
import { SimpleIcon } from '@/common/simple-icon/simple-icon'

@Component({
  selector: 'app-simple-icon',
  imports: [],
  template: '',
  host: {
    '[style.fill]': '_fillColor()',
  },
})
export class SimpleIconComponent {
  constructor(
    @Inject(SIMPLE_ICON_LOADER) loader: SimpleIconLoader,
    elRef: ElementRef,
    destroyRef: DestroyRef,
  ) {
    effect(() => {
      loader(this.icon().slug)
        .pipe(
          takeUntilDestroyed(destroyRef),
          tap((svg) => ((elRef.nativeElement as Element).innerHTML = svg)),
        )
        .subscribe()
    })
  }

  readonly icon = input.required<SimpleIcon>()
  protected readonly _fillColor = computed(() => `#${this.icon().hex}`)
}
