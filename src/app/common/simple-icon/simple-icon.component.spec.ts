import { SimpleIconComponent } from './simple-icon.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { ComponentFixture } from '@angular/core/testing'
import {
  SIMPLE_ICON_LOADER,
  SimpleIconLoader,
} from '@/common/simple-icon/simple-icon-loader'
import { MockProvider } from 'ng-mocks'
import { EMPTY, of } from 'rxjs'
import { SVG } from '@/test/mocks/svg'
import { AsyncPipe } from '@angular/common'

describe('SimpleIconComponent', () => {
  let component: SimpleIconComponent
  let fixture: ComponentFixture<SimpleIconComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should load the icon using the loader', () => {
    const slug = 'dummy-icon'
    const simpleIconLoader = jasmine
      .createSpy<SimpleIconLoader>()
      .and.returnValue(EMPTY)
    ;[fixture, component] = makeSut({ simpleIconLoader })

    component.icon = { slug }

    expect(simpleIconLoader).toHaveBeenCalledOnceWith(slug)
  })

  it('should set the fill color', () => {
    const hex = '001020'
    ;[fixture, component] = makeSut()

    component.icon = { slug: 'whatever', hex }

    fixture.detectChanges()

    expect(fixture.debugElement.styles['fill']).toEqual('rgb(0, 16, 32)')
  })

  describe('when icon can be found', () => {
    const ICON_SVG = SVG
    beforeEach(() => {
      ;[fixture, component] = makeSut({ simpleIconLoader: () => of(ICON_SVG) })
    })

    it('should inline the SVG', () => {
      component.icon = { slug: 'dummy-icon' }
      fixture.detectChanges()

      expect((fixture.debugElement.nativeElement as Element).innerHTML).toEqual(
        ICON_SVG,
      )
    })
  })

  describe('when icon cannot be found', () => {
    beforeEach(() => {
      ;[fixture, component] = makeSut({ simpleIconLoader: () => EMPTY })
    })

    it('should be empty', () => {
      component.icon = { slug: 'dummy-icon' }
      fixture.detectChanges()

      expect(
        (fixture.debugElement.nativeElement as Element).innerHTML,
      ).toHaveSize(0)
    })
  })
})

const makeSut = (opts: { simpleIconLoader?: SimpleIconLoader } = {}) =>
  componentTestSetup(SimpleIconComponent, {
    imports: [AsyncPipe],
    providers: [
      MockProvider(SIMPLE_ICON_LOADER, opts.simpleIconLoader ?? (() => EMPTY)),
    ],
  })
