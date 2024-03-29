import { ComponentFixture } from '@angular/core/testing'
import { ChippedContentComponent } from './chipped-content.component'
import { Component, DebugElement, Input } from '@angular/core'
import { ChippedContent } from './chipped-content'
import { ChipComponent } from '../chip/chip.component'
import { expectIsInLayout, expectIsNotInLayout } from '@test/helpers/visibility'
import { Subscription } from 'rxjs'
import { MockProvider } from 'ng-mocks'
import { byComponent } from '@test/helpers/component-query-predicates'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'
import { PLATFORM_SERVICE, PlatformService } from '@common/platform.service'
import { MOCK_BROWSER_PLATFORM_SERVICE } from '@test/helpers/platform-service'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import {
  expectIsBlockDisplayedIfNoScript,
  expectIsNotDisplayedIfNoScript,
} from '@test/helpers/no-script'
import { By } from '@angular/platform-browser'

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

  it('should not display any content by default', () => {
    const contentElements = fixture.debugElement.queryAll(CONTENT_PREDICATE)

    expect(contentElements.length).toEqual(CONTENTS.length)
    contentElements.forEach((contentElement) => {
      expectIsInLayout(contentElement.nativeElement)
    })
    expect(component.displayedContent).toBeUndefined()
  })

  it('should not display non-selectable chips', () => {
    const contentContainers = fixture.debugElement.queryAll(CONTENT_PREDICATE)

    for (const contentContainer of contentContainers) {
      const chipElement = contentContainer.query(byComponent(ChipComponent))
      expectIsInLayout(chipElement.nativeElement)
    }
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
    let subscription: Subscription
    let displayedContent: ChippedContent | undefined

    beforeEach(() => {
      fooChipElement = findChipByDisplayName(FOO_CONTENT.displayName)!
      fooContentElement = fixture.debugElement.query(byComponent(FooComponent))
      expect(fooChipElement).withContext('foo chip exists').toBeTruthy()
      expect(fooContentElement).withContext('foo content exists').toBeTruthy()

      subscription = component.displayedContentChange.subscribe(
        (newSelectedContent) => {
          displayedContent = newSelectedContent
        },
      )
      fooChipElement.triggerEventHandler('selectedChange')

      fixture.detectChanges()
    })

    afterEach(() => {
      subscription.unsubscribe()
    })

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
      expectIsNotInLayout(fooContentElement.nativeElement)
    })

    it('should emit event indicating content has been displayed', () => {
      expect(displayedContent).toEqual(FOO_CONTENT)
    })

    describe('when tapping same chip again', () => {
      beforeEach(() => {
        fooChipElement.triggerEventHandler('selectedChange')
        fixture.detectChanges()
      })

      it('should mark the chip as unselected', () => {
        expect(getReflectedAttribute(fooChipElement, 'selected')).toEqual(
          false.toString(),
        )
      })

      it('should not display its content', () => {
        expectIsInLayout(fooContentElement.nativeElement)
      })

      it('should emit event indicating no content is selected', () => {
        expect(displayedContent).toBeUndefined()
      })
    })

    describe('when tapping another chip', () => {
      let barChipElement: DebugElement

      beforeEach(() => {
        barChipElement = findChipByDisplayName(BAR_CONTENT.displayName)!
        expect(barChipElement).withContext('bar chip exists').toBeTruthy()

        barChipElement.triggerEventHandler('selectedChange')

        fixture.detectChanges()
      })

      it('should mark the previous chip as unselected and just tapped chip as selected', () => {
        expect(getReflectedAttribute(fooChipElement, 'selected')).toBe(
          false.toString(),
        )
        expect(getReflectedAttribute(barChipElement, 'selected')).toBe(
          true.toString(),
        )
      })

      it('should hide currently active content and show the new content', () => {
        expectIsInLayout(fooContentElement.nativeElement)

        const barContentElement = fixture.debugElement.query(
          byComponent(BarComponent),
        )
        expectIsNotInLayout(barContentElement.nativeElement)
      })

      it('should emit event indicating content has been displayed', () => {
        expect(displayedContent).toEqual(BAR_CONTENT)
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

const FOO_CONTENT_DATA = 'foo-data'
const FOO_CONTENT = new ChippedContent({
  //id: 'foo',
  displayName: 'Foo',
  component: FooComponent,
  inputs: { data: FOO_CONTENT_DATA } satisfies Partial<FooComponent>,
})
const BAR_CONTENT_DATA = 'bar-data'
const BAR_CONTENT = new ChippedContent({
  //id: 'bar',
  displayName: 'Bar',
  component: BarComponent,
  inputs: { data: BAR_CONTENT_DATA } satisfies Partial<BarComponent>,
})

const CONTENTS = [FOO_CONTENT, BAR_CONTENT]
function makeSut({
  platformService,
}: { platformService?: PlatformService } = {}): [
  ComponentFixture<ChippedContentComponent>,
  ChippedContentComponent,
] {
  const [fixture, component] = componentTestSetup(ChippedContentComponent, {
    imports: [ChippedContentComponent, ChipComponent],
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
