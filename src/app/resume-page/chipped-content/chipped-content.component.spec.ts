import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { ChippedContentComponent } from './chipped-content.component'
import { Component, DebugElement, EventEmitter } from '@angular/core'
import { ChippedContent } from './chipped-content'
import { By } from '@angular/platform-browser'
import { ChipComponent } from '../chip/chip.component'
import { expectIsHidden, expectIsVisible } from '@test/helpers/visibility'
import { byTestId } from '@test/helpers/test-id'
import { firstValueFrom, Subscription } from 'rxjs'
import { MockProvider } from 'ng-mocks'
import {
  byComponent,
  getComponentSelector,
} from '@test/helpers/component-query-predicates'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'
import { PLATFORM_SERVICE, PlatformService } from '@common/platform.service'
import {
  MOCK_BROWSER_PLATFORM_SERVICE,
  MOCK_SERVER_PLATFORM_SERVICE,
} from '@test/helpers/platform-service'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('ChippedContentComponent', () => {
  it('should create', () => {
    const [fixture, component] = makeSut()
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
      expect(chipElements.length).toEqual(CONTENTS.length)
      chipElements.forEach((chipElement, index) => {
        const content = CONTENTS[index]
        expect(getReflectedAttribute(chipElement, 'selected'))
          .withContext(`chip ${index} is unselected`)
          .toBe('false')
        expect(chipElement.nativeElement.textContent.trim())
          .withContext(`chip ${index} display name`)
          .toEqual(content.displayName)
      })
    })
  }

  describe('when rendering on server', () => {
    let fixture: ComponentFixture<ChippedContentComponent>

    beforeEach(() => {
      ;[fixture] = makeSut({ platformService: MOCK_SERVER_PLATFORM_SERVICE })
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
        .toEqual(FOO_CONTENT_DATA)
      expectIsHidden(fooElement.nativeElement)

      const barElement = fixture.debugElement.query(byComponent(BarComponent))
      expect(barElement).toBeTruthy()
      expect(barElement.nativeElement.textContent.trim())
        .withContext(`bar element contents`)
        .toEqual(BAR_CONTENT_DATA)
      expectIsHidden(barElement.nativeElement)
    })

    // They're displayed in non-JS version thanks to helper classes
    it('should add hidden non selectable chips for non-JS version', () => {
      const chipElements = fixture.debugElement.children.filter(
        (element) =>
          element.properties['localName'] ===
          getComponentSelector(ChipComponent),
      )
      expect(chipElements.length).toEqual(CONTENTS.length)

      chipElements.forEach((chipElement, index) => {
        const content = CONTENTS[index]
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
      ;[fixture, component] = makeSut({
        platformService: MOCK_BROWSER_PLATFORM_SERVICE,
      })
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
        fooChipElement = fixture.debugElement.query(byTestId(FOO_CONTENT.id))
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
          FOO_COMPONENT_ANIMATION_DONE.emit()
          tick()
          expect(contentDisplayed).toBeFalse()
        }))
      })
      describe('when tapping another chip', () => {
        let barChipElement: DebugElement
        beforeEach(() => {
          barChipElement = fixture.debugElement.query(byTestId(BAR_CONTENT.id))
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

const FOO_CONTENT_DATA = 'foo-data'
const FOO_COMPONENT_ANIMATION_DONE = new EventEmitter<void>()
const FOO_CONTENT = new ChippedContent({
  id: 'foo',
  displayName: 'Foo',
  component: FooComponent,
  setupComponent: (component) => {
    component.data = FOO_CONTENT_DATA
  },
  waitForAnimationEnd: async () => {
    await firstValueFrom(FOO_COMPONENT_ANIMATION_DONE)
  },
})
const BAR_CONTENT_DATA = 'bar-data'
const BAR_CONTENT = new ChippedContent({
  id: 'bar',
  displayName: 'Bar',
  component: BarComponent,
  setupComponent: (component) => {
    component.data = BAR_CONTENT_DATA
  },
})
const CONTENTS = [FOO_CONTENT, BAR_CONTENT]
function makeSut({
  platformService,
}: { platformService?: PlatformService } = {}): [
  ComponentFixture<ChippedContentComponent>,
  ChippedContentComponent,
] {
  const [fixture, component] = componentTestSetup(ChippedContentComponent, {
    providers: [
      MockProvider(
        PLATFORM_SERVICE,
        platformService ?? MOCK_BROWSER_PLATFORM_SERVICE,
      ),
    ],
  })
  component.contents = CONTENTS
  return [fixture, component]
}
