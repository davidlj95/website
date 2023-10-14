import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ChippedContentComponent } from './chipped-content.component'
import { Component, DebugElement } from '@angular/core'
import { ChippedContent } from './chipped-content'
import { By } from '@angular/platform-browser'
import { getComponentSelector } from '../../../test/helpers/component-testers'
import { ChipComponent } from '../chip/chip.component'
import {
  expectIsHidden,
  expectIsVisible,
} from '../../../test/helpers/visibility'
import { byTestId } from '../../../test/helpers/test-id'
import { TestIdDirective } from '../../common/test-id.directive'
import { Subscription } from 'rxjs'

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
  let component: ChippedContentComponent
  let fixture: ComponentFixture<ChippedContentComponent>
  const fooContentData = 'foo-data'
  const fooContent = new ChippedContent({
    id: 'foo',
    displayName: 'Foo',
    component: FooComponent,
    setupComponent: (component) => {
      component.data = fooContentData
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChippedContentComponent, ChipComponent, TestIdDirective],
    })
    fixture = TestBed.createComponent(ChippedContentComponent)
    component = fixture.componentInstance
    component.contents = contents
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all chips unselected with their display names', () => {
    const selectableChipsContainerElement = fixture.debugElement.query(
      By.css('.chips'),
    )
    expect(selectableChipsContainerElement).toBeTruthy()

    const chipElements = selectableChipsContainerElement.queryAll(
      By.css(getComponentSelector(ChipComponent)),
    )
    expect(chipElements.length).toEqual(contents.length)
    chipElements.forEach((chipElement, index) => {
      const content = contents[index]
      expect(chipElement.attributes['ng-reflect-selected'])
        .withContext(`chip ${index} is unselected`)
        .toBe('false')
      expect(chipElement.nativeElement.textContent.trim())
        .withContext(`chip ${index} display name`)
        .toEqual(content.displayName)
    })
  })

  it('should add and setup all content components, but hidden', () => {
    const fooElement = fixture.debugElement.query(
      By.css(getComponentSelector(FooComponent)),
    )
    expect(fooElement).toBeTruthy()
    expect(fooElement.nativeElement.textContent.trim())
      .withContext(`foo element contents`)
      .toEqual(fooContentData)
    expectIsHidden(fooElement.nativeElement)

    const barElement = fixture.debugElement.query(
      By.css(getComponentSelector(BarComponent)),
    )
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
        element.properties['localName'] === getComponentSelector(ChipComponent),
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
      expect(fooChipElement.attributes['ng-reflect-selected']).toBe('true')
    })

    it('should display its content', () => {
      const fooContentElement = fixture.debugElement.query(
        By.css(getComponentSelector(FooComponent)),
      )
      expect(fooContentElement).toBeTruthy()
      expectIsVisible(fooContentElement.nativeElement)
    })

    it('should emit event indicating content has been displayed', () => {
      expect(contentDisplayed).toBe(true)
    })

    describe('when tapping same chip again', () => {
      beforeEach(() => {
        fooChipElement.triggerEventHandler('selectedChange')
        fixture.detectChanges()
      })

      it('should mark the chip as unselected', () => {
        expect(fooChipElement.attributes['ng-reflect-selected']).toBe('false')
      })

      it('should hide its content', () => {
        const fooContentElement = fixture.debugElement.query(
          By.css(getComponentSelector(FooComponent)),
        )
        expect(fooContentElement).toBeTruthy()
        expectIsHidden(fooContentElement.nativeElement)
      })

      it('should emit event indicating content has been hidden', () => {
        expect(contentDisplayed).toBe(false)
      })
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
        expect(fooChipElement.attributes['ng-reflect-selected']).toBe('false')
        expect(barChipElement.attributes['ng-reflect-selected']).toBe('true')
      })

      it('should hide its content and display the content of the tapped chip', () => {
        const fooContentElement = fixture.debugElement.query(
          By.css(getComponentSelector(FooComponent)),
        )
        expect(fooContentElement).toBeTruthy()
        expectIsHidden(fooContentElement.nativeElement)

        const barContentElement = fixture.debugElement.query(
          By.css(getComponentSelector(BarComponent)),
        )
        expect(barContentElement).toBeTruthy()
        expectIsVisible(barContentElement.nativeElement)
      })

      it('should emit event indicating content has been displayed', () => {
        expect(contentDisplayed).toBe(true)
      })
    })
  })
})
