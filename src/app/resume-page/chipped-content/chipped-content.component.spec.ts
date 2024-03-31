import { ComponentFixture, fakeAsync } from '@angular/core/testing'
import { ChippedContentComponent } from './chipped-content.component'
import { Component, DebugElement, Input } from '@angular/core'
import { ChippedContent } from './chipped-content'
import { ChipComponent } from '../chip/chip.component'
import { expectIsInLayout, expectIsNotInLayout } from '@test/helpers/visibility'
import { byComponent } from '@test/helpers/component-query-predicates'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import {
  expectIsBlockDisplayedIfNoScript,
  expectIsNotDisplayedIfNoScript,
} from '@test/helpers/no-script'
import { By } from '@angular/platform-browser'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { tickToFinishAnimation } from '@test/helpers/tick-to-finish-animation'
import { MockProvider } from 'ng-mocks'
import { PLATFORM_SERVICE } from '@common/platform.service'
import { MOCK_BROWSER_PLATFORM_SERVICE } from '@test/helpers/platform-service'

describe('ChippedContentComponent', () => {
  let fixture: ComponentFixture<ChippedContentComponent>
  let component: ChippedContentComponent

  beforeEach(() => {
    ;[fixture, component] = makeSut()
    component.contents = CONTENTS
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  const SELECTABLE_CHIPS_CONTAINER_PREDICATE = By.css('.selectable-chips')
  const CONTENT_PREDICATE = By.css('.content')

  it('should render all selectable chips unselected with their display names', () => {
    const selectableChipsContainerElement = fixture.debugElement.query(
      SELECTABLE_CHIPS_CONTAINER_PREDICATE,
    )

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

  it('should render all contents without laying out neither its component or its chip', () => {
    const contentElements = fixture.debugElement.queryAll(CONTENT_PREDICATE)
    expect(contentElements.length).toEqual(CONTENTS.length)

    contentElements.forEach((contentElement, index) => {
      const content = CONTENTS[index]
      const componentElement = contentElement.query(
        byComponent(content.component),
      )
      expect(componentElement).toBeTruthy()

      expect(componentElement.nativeElement.textContent.trim()).toEqual(
        content.inputs!['data'],
      )

      const chipElement = contentElement.query(byComponent(ChipComponent))
      expectIsNotInLayout(chipElement.nativeElement)

      expectIsNotInLayout(contentElement.nativeElement)
    })
  })

  describe('when JS is disabled', () => {
    it('should not display selectable chips', () => {
      const selectableChipsContainerElement = fixture.debugElement.query(
        SELECTABLE_CHIPS_CONTAINER_PREDICATE,
      )
      expectIsNotDisplayedIfNoScript(selectableChipsContainerElement)
    })

    it('should display all content', () => {
      const contentContainers = fixture.debugElement.queryAll(CONTENT_PREDICATE)
      for (const contentContainer of contentContainers) {
        expectIsBlockDisplayedIfNoScript(contentContainer)
      }
    })

    it('should display non-selectable chips', () => {
      const contentContainers = fixture.debugElement.queryAll(CONTENT_PREDICATE)

      for (const contentContainer of contentContainers) {
        const chipElement = contentContainer.query(byComponent(ChipComponent))
        expectIsBlockDisplayedIfNoScript(chipElement)
      }
    })
  })

  describe('when tapping on a chip', () => {
    let fooChipElement: DebugElement
    let fooContentElement: DebugElement

    beforeEach(fakeAsync(() => {
      fooChipElement = findChipByDisplayName(FOO_CONTENT.displayName)!
      fooContentElement = fixture.debugElement.query(byComponent(FooComponent))
      expect(fooChipElement).withContext('foo chip exists').toBeTruthy()
      expect(fooContentElement).withContext('foo content exists').toBeTruthy()

      fooChipElement.triggerEventHandler('click')
      fixture.detectChanges()
      tickToFinishAnimation()
    }))

    function findChipByDisplayName(displayName: string) {
      const chipElements = fixture.debugElement.queryAll(
        byComponent(ChipComponent),
      )
      return chipElements.find((chipElement) =>
        chipElement.nativeElement.textContent.includes(displayName),
      )
    }

    it('should mark the chip as selected', () => {
      expect(getReflectedAttribute(fooChipElement, 'selected')).toBe('true')
    })

    it('should display its content', () => {
      expectIsInLayout(fooContentElement.nativeElement)
    })

    describe('when tapping same chip again', () => {
      beforeEach(fakeAsync(() => {
        fooChipElement.triggerEventHandler('click')
        fixture.detectChanges()
        tickToFinishAnimation()
      }))

      it('should mark the chip as unselected', () => {
        expect(getReflectedAttribute(fooChipElement, 'selected')).toEqual(
          false.toString(),
        )
      })

      it('should not display its content', () => {
        expectIsNotInLayout(fooContentElement.nativeElement)
      })
    })

    describe('when tapping another chip', () => {
      let barChipElement: DebugElement

      beforeEach(fakeAsync(() => {
        barChipElement = findChipByDisplayName(BAR_CONTENT.displayName)!
        expect(barChipElement).withContext('bar chip exists').toBeTruthy()

        barChipElement.triggerEventHandler('click')

        fixture.detectChanges()
        tickToFinishAnimation()
      }))

      it('should mark the previous chip as unselected and just tapped chip as selected', () => {
        expect(getReflectedAttribute(fooChipElement, 'selected')).toBe(
          false.toString(),
        )
        expect(getReflectedAttribute(barChipElement, 'selected')).toBe(
          true.toString(),
        )
      })

      it('should hide currently active content and show the new content', () => {
        expectIsNotInLayout(fooContentElement.nativeElement)

        const barContentElement = fixture.debugElement.query(
          byComponent(BarComponent),
        )
        expectIsInLayout(barContentElement.nativeElement)
      })
    })
  })
})
@Component({
  selector: 'app-foo',
  template: `{{ data }}`,
})
class FooComponent {
  @Input() public data?: string
}
@Component({
  selector: 'app-bar',
  template: `{{ data }}`,
})
class BarComponent {
  @Input() public data?: string
}

const FOO_CONTENT = new ChippedContent({
  displayName: 'Foo',
  component: FooComponent,
  inputs: { data: 'foo-data' } satisfies Partial<FooComponent>,
})
const BAR_CONTENT = new ChippedContent({
  displayName: 'Bar',
  component: BarComponent,
  inputs: { data: 'bar-data' } satisfies Partial<BarComponent>,
})

const CONTENTS = [FOO_CONTENT, BAR_CONTENT] as const
function makeSut(): [
  ComponentFixture<ChippedContentComponent>,
  ChippedContentComponent,
] {
  const [fixture, component] = componentTestSetup(ChippedContentComponent, {
    imports: [ChippedContentComponent, ChipComponent],
    providers: [
      provideNoopAnimations(),
      MockProvider(PLATFORM_SERVICE, MOCK_BROWSER_PLATFORM_SERVICE),
    ],
  })
  component.contents = CONTENTS
  return [fixture, component]
}
