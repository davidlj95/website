import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { ChippedContentComponent } from './chipped-content.component'
import {
  Component,
  DebugElement,
  EventEmitter,
  PLATFORM_ID,
} from '@angular/core'
import { ChippedContent } from './chipped-content'
import { By } from '@angular/platform-browser'
import { ChipComponent } from '../chip/chip.component'
import {
  expectIsHidden,
  expectIsVisible,
} from '../../../test/helpers/visibility'
import { byTestId } from '../../../test/helpers/test-id'
import { TestIdDirective } from '../../common/test-id.directive'
import { firstValueFrom, Subscription } from 'rxjs'
import { MockProvider } from 'ng-mocks'
import {
  PLATFORM_BROWSER_ID,
  PLATFORM_SERVER_ID,
  PlatformId,
} from '../../../test/helpers/platform-ids'
import {
  byComponent,
  getComponentSelector,
} from '../../../test/helpers/component-query-predicates'
import { getReflectedAttribute } from '../../../test/helpers/get-reflected-attribute'

@Component({
  selector: 'app-foo',
  template: `{{ data }}`,
})
class FooComponent {
  public data?: string
}
@Component({
  selector: 'app-bar',
  template: `{{ data }}`,
})
class BarComponent {
  public data?: string
}

describe('ChippedContentComponent', () => {
  const fooContentData = 'foo-data'
  const fooComponentAnimationDone = new EventEmitter<void>()
  const fooContent = new ChippedContent({
    id: 'foo',
    displayName: 'Foo',
    component: FooComponent,
    setupComponent: (component) => {
      component.data = fooContentData
    },
    waitForAnimationEnd: async () => {
      await firstValueFrom(fooComponentAnimationDone)
    },
  })
  const barContentData = 'bar-data'
  const barContent = new ChippedContent({
    id: 'bar',
    displayName: 'Bar',
    component: BarComponent,
    setupComponent: (component) => {
      component.data = barContentData
    },
  })
  const contents = [fooContent, barContent]
  function setup({ platformId }: { platformId?: PlatformId } = {}): [
    ComponentFixture<ChippedContentComponent>,
    ChippedContentComponent,
  ] {
    TestBed.configureTestingModule({
      declarations: [ChippedContentComponent, ChipComponent, TestIdDirective],
      providers: [MockProvider(PLATFORM_ID, platformId ?? PLATFORM_BROWSER_ID)],
    })
    const fixture = TestBed.createComponent(ChippedContentComponent)
    const component = fixture.componentInstance
    component.contents = contents
    return [fixture, component]
  }

  it('should create', () => {
    const [fixture, component] = setup()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  function shouldDisplayAllSelectableChipsUnselectedWithTheirDisplayNames(
    fixtureGetter: () => ComponentFixture<ChippedContentComponent>,
  ) {
    it('should display all selectable chips unselected with their display names', () => {
      const fixture = fixtureGetter()
      const selectableChipsContainerElement = fixture.debugElement.query(
        By.css('.chips'),
      )
      expect(selectableChipsContainerElement).toBeTruthy()

      const chipElements = selectableChipsContainerElement.queryAll(
        byComponent(ChipComponent),
      )
      expect(chipElements.length).toEqual(contents.length)
      chipElements.forEach((chipElement, index) => {
        const content = contents[index]
        expect(getReflectedAttribute(chipElement, 'selected'))
          .withContext(`chip ${index} is unselected`)
          .toBe('false')
        expect(chipElement.nativeElement.textContent.trim())
          .withContext(`chip ${index} display name`)
          .toEqual(content.displayName)
      })
    })
  }

  describe('when not rendering on browser', () => {
    let fixture: ComponentFixture<ChippedContentComponent>

    beforeEach(() => {
      ;[fixture] = setup({ platformId: PLATFORM_SERVER_ID })
      fixture.detectChanges()
    })

    shouldDisplayAllSelectableChipsUnselectedWithTheirDisplayNames(
      () => fixture,
    )

    // They're displayed in non-JS version thanks to helper classes
    it('should add and setup all content components, but hidden', () => {
      const fooElement = fixture.debugElement.query(byComponent(FooComponent))
      expect(fooElement).toBeTruthy()
      expect(fooElement.nativeElement.textContent.trim())
        .withContext(`foo element contents`)
        .toEqual(fooContentData)
      expectIsHidden(fooElement.nativeElement)

      const barElement = fixture.debugElement.query(byComponent(BarComponent))
      expect(barElement).toBeTruthy()
      expect(barElement.nativeElement.textContent.trim())
        .withContext(`bar element contents`)
        .toEqual(barContentData)
      expectIsHidden(barElement.nativeElement)
    })

    // They're displayed in non-JS version thanks to helper classes
    it('should add hidden non selectable chips for non-JS version', () => {
      const chipElements = fixture.debugElement.children.filter(
        (element) =>
          element.properties['localName'] ===
          getComponentSelector(ChipComponent),
      )
      expect(chipElements.length).toEqual(contents.length)

      chipElements.forEach((chipElement, index) => {
        const content = contents[index]
        expect(chipElement.nativeElement.textContent.trim())
          .withContext(`chip ${index} contents`)
          .toEqual(content.displayName)
        expectIsHidden(chipElement.nativeElement)
      })
    })
  })

  describe('when rendering on browser', () => {
    let fixture: ComponentFixture<ChippedContentComponent>
    let component: ChippedContentComponent

    beforeEach(() => {
      ;[fixture, component] = setup({ platformId: PLATFORM_BROWSER_ID })
      fixture.detectChanges()
    })

    shouldDisplayAllSelectableChipsUnselectedWithTheirDisplayNames(
      () => fixture,
    )

    it('should not add any content component or non-selectable chip', () => {
      const fooElement = fixture.debugElement.query(byComponent(FooComponent))
      expect(fooElement).toBeFalsy()

      const barElement = fixture.debugElement.query(byComponent(BarComponent))
      expect(barElement).toBeFalsy()

      const chipElements = fixture.debugElement.children.filter(
        (element) =>
          element.properties['localName'] ===
          getComponentSelector(ChipComponent),
      )
      expect(chipElements).toHaveSize(0)
    })

    describe('when tapping on a chip', () => {
      let fooChipElement: DebugElement
      let subscription: Subscription
      let contentDisplayed: boolean

      beforeEach(() => {
        fooChipElement = fixture.debugElement.query(byTestId(fooContent.id))
        expect(fooChipElement).toBeTruthy()

        subscription = component.contentDisplayedChange.subscribe(
          (newContentDisplayed) => {
            contentDisplayed = newContentDisplayed
          },
        )
        fooChipElement.triggerEventHandler('selectedChange')

        fixture.detectChanges()
      })

      afterEach(() => {
        subscription.unsubscribe()
      })

      it('should mark the chip as selected', () => {
        expect(getReflectedAttribute(fooChipElement, 'selected')).toBe('true')
      })

      it('should display its content', () => {
        const fooContentElement = fixture.debugElement.query(
          byComponent(FooComponent),
        )
        expect(fooContentElement).toBeTruthy()
        expectIsVisible(fooContentElement.nativeElement)
      })

      it('should emit event indicating content has been displayed', () => {
        expect(contentDisplayed).toBeTrue()
      })

      describe('when tapping same chip again', () => {
        beforeEach(() => {
          fooChipElement.triggerEventHandler('selectedChange')
          fixture.detectChanges()
        })

        it('should mark the chip as unselected', () => {
          expect(getReflectedAttribute(fooChipElement, 'selected')).toBe(
            'false',
          )
        })

        it('should remove its content', () => {
          const fooContentElement = fixture.debugElement.query(
            byComponent(FooComponent),
          )
          expect(fooContentElement).toBeFalsy()
        })

        it('should wait for animation to end and then emit event indicating content has been removed', fakeAsync(() => {
          expect(contentDisplayed).toBeTrue()
          fooComponentAnimationDone.emit()
          tick()
          expect(contentDisplayed).toBeFalse()
        }))
      })
      describe('when tapping another chip', () => {
        let barChipElement: DebugElement
        beforeEach(() => {
          barChipElement = fixture.debugElement.query(byTestId(barContent.id))
          expect(barChipElement).toBeTruthy()

          barChipElement.triggerEventHandler('selectedChange')

          fixture.detectChanges()
        })

        it('should mark the previous chip as unselected and just tapped chip as selected', () => {
          expect(getReflectedAttribute(fooChipElement, 'selected')).toBe(
            'false',
          )
          expect(getReflectedAttribute(barChipElement, 'selected')).toBe('true')
        })

        it('should remove its content and display the content of the tapped chip', () => {
          const fooContentElement = fixture.debugElement.query(
            byComponent(FooComponent),
          )
          expect(fooContentElement).toBeFalsy()

          const barContentElement = fixture.debugElement.query(
            byComponent(BarComponent),
          )
          expect(barContentElement).toBeTruthy()
          expectIsVisible(barContentElement.nativeElement)
        })

        it('should emit event indicating content has been displayed', () => {
          expect(contentDisplayed).toBeTrue()
        })
      })
    })
  })
})
