import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'
import { ChippedContentComponent } from './chipped-content.component'
import { Component, DebugElement, Input } from '@angular/core'
import { ChippedContent } from './chipped-content'
import { ChipComponent } from '../chip/chip.component'
import {
  expectIsInLayout,
  expectIsNotInLayout,
} from '@/test/helpers/visibility'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { tickToFinishAnimation } from '@/test/helpers/tick-to-finish-animation'
import { MockProvider } from 'ng-mocks'
import { SCROLL_INTO_VIEW } from '@/common/scroll-into-view'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { textContent } from '@/test/helpers/text-content'

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

  const CONTENT_PREDICATE = By.css('.content')

  it('should render selection chips unselected with their display names', () => {
    const chipElements = fixture.debugElement.queryAll(
      byComponent(ChipComponent),
    )

    expect(chipElements.length).toEqual(CONTENTS.length)

    chipElements.forEach((chipElement, index) => {
      const content = CONTENTS[index]

      expect(getComponentInstance(chipElement, ChipComponent).selected())
        .withContext(`chip ${index} is unselected`)
        .toBeFalse()

      expect(textContent(chipElement))
        .withContext(`chip ${index} display name`)
        .toEqual(content.displayName)
    })
  })

  it('should add but not layout first content', () => {
    const contentElement = fixture.debugElement.query(CONTENT_PREDICATE)

    expect(contentElement).toBeDefined()

    const firstComponentElement = contentElement.query(
      byComponent(FIRST_CONTENT.component),
    )

    expect(firstComponentElement).toBeTruthy()

    expect(textContent(firstComponentElement)).toEqual(
      FIRST_CONTENT.inputs!.data,
    )
    expectIsNotInLayout(contentElement)
    expectIsNotInLayout(firstComponentElement)
  })

  describe('when tapping on a chip', () => {
    let firstChipElement: DebugElement
    let firstContentElement: DebugElement

    beforeEach(fakeAsync(() => {
      firstChipElement = findChipByDisplayName(FIRST_CONTENT.displayName)!
      firstContentElement = fixture.debugElement.query(
        byComponent(FIRST_CONTENT.component),
      )

      // eslint-disable-next-line jasmine/no-expect-in-setup-teardown
      expect(firstChipElement).toBeTruthy()
      // eslint-disable-next-line jasmine/no-expect-in-setup-teardown
      expect(firstContentElement).toBeTruthy()

      firstChipElement.triggerEventHandler('click')
      fixture.detectChanges()
      tickToFinishAnimation()
    }))

    function findChipByDisplayName(displayName: string) {
      const chipElements = fixture.debugElement.queryAll(
        byComponent(ChipComponent),
      )
      return chipElements.find((chipElement) =>
        textContent(chipElement)?.includes(displayName),
      )
    }

    it('should mark the chip as selected', () => {
      expect(
        getComponentInstance(firstChipElement, ChipComponent).selected(),
      ).toBe(true)
    })

    it('should layout its content', () => {
      expectIsInLayout(firstContentElement)
    })

    it('should scroll content into view', () => {
      const contentElement = fixture.debugElement.query(CONTENT_PREDICATE)
      const scrollIntoViewSpy = TestBed.inject(SCROLL_INTO_VIEW) as jasmine.Spy

      expect(scrollIntoViewSpy).toHaveBeenCalledOnceWith(
        contentElement.nativeElement,
      )
    })

    describe('when tapping same chip again', () => {
      beforeEach(fakeAsync(() => {
        firstChipElement.triggerEventHandler('click')
        fixture.detectChanges()
        tickToFinishAnimation()
      }))

      it('should mark the chip as unselected', () => {
        expect(
          getComponentInstance(firstChipElement, ChipComponent).selected(),
        ).toBeFalse()
      })

      it('should not layout its content', () => {
        expectIsNotInLayout(firstContentElement)
      })
    })

    describe('when tapping another chip', () => {
      let secondChipElement: DebugElement

      beforeEach(fakeAsync(() => {
        secondChipElement = findChipByDisplayName(SECOND_CONTENT.displayName)!

        // eslint-disable-next-line jasmine/no-expect-in-setup-teardown
        expect(secondChipElement).toBeTruthy()

        secondChipElement.triggerEventHandler('click')

        fixture.detectChanges()
        tickToFinishAnimation()
      }))

      it('should mark the previous chip as unselected and just tapped chip as selected', () => {
        expect(
          getComponentInstance(firstChipElement, ChipComponent).selected(),
        ).toBeFalse()

        expect(
          getComponentInstance(secondChipElement, ChipComponent).selected(),
        ).toBeTrue()
      })

      it('should not layout currently active content and layout the new content', () => {
        expectIsNotInLayout(firstContentElement)

        const barContentElement = fixture.debugElement.query(
          byComponent(BarComponent),
        )
        expectIsInLayout(barContentElement)
      })
    })
  })
})
@Component({
  selector: 'app-foo',
  template: `{{ data }}`,
})
class FooComponent {
  @Input() data?: string
}
@Component({
  selector: 'app-bar',
  template: `{{ data }}`,
})
class BarComponent {
  @Input() data?: string
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
const FIRST_CONTENT = CONTENTS[0]
const SECOND_CONTENT = CONTENTS[1]
function makeSut() {
  const [fixture, component] = componentTestSetup(ChippedContentComponent, {
    providers: [
      provideNoopAnimations(),
      // eslint-disable-next-line jasmine/no-unsafe-spy
      MockProvider(SCROLL_INTO_VIEW, jasmine.createSpy()),
    ],
  })
  component.contents = CONTENTS
  return [fixture, component] as const
}
