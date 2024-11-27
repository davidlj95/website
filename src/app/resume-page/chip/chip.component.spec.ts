import { ChipComponent } from './chip.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { ComponentFixture } from '@angular/core/testing'
import { first, Subscription } from 'rxjs'
import { shouldProjectContent } from '@/test/helpers/component-testers'
import { setFixtureInput } from '@/test/helpers/set-input'

describe('ChipComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(ChipComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(ChipComponent)

  describe('when selected attribute is false', () => {
    it('should not add the selected class', () => {
      const [fixture] = componentTestSetup(ChipComponent)
      setFixtureInput(fixture, 'isSelected', false)

      expect(fixture.debugElement.classes['selected']).toBeFalsy()
    })
  })

  describe('when selected attribute is true', () => {
    it('should add the selected class', () => {
      const [fixture] = componentTestSetup(ChipComponent)
      setFixtureInput(fixture, 'isSelected', true)

      expect(fixture.debugElement.classes['selected']).toBeTrue()
    })
  })

  describe('when selected attribute is not listened', () => {
    it('should not add the selectable class', () => {
      const [fixture] = componentTestSetup(ChipComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.classes['selectable']).toBeFalsy()
    })

    it('should not include the element in the tab sequence', () => {
      const [fixture] = componentTestSetup(ChipComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.attributes['tabindex']).toBeUndefined()
    })

    it('should not add ARIA role', () => {
      const [fixture] = componentTestSetup(ChipComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.attributes['role']).toBeUndefined()
    })
  })

  describe('when selected attribute is listened', () => {
    let fixture: ComponentFixture<ChipComponent>
    let component: ChipComponent
    let subscription: Subscription
    let isSelected: boolean

    beforeEach(() => {
      ;[fixture, component] = componentTestSetup(ChipComponent)
      setFixtureInput(fixture, 'isSelected', false, { noChangeDetection: true })
      subscription = component.isSelectedChange
        .pipe(first())
        .subscribe((isSelectedReceived) => (isSelected = isSelectedReceived))
      fixture.detectChanges()
    })

    afterEach(() => {
      subscription?.unsubscribe()
    })

    it('should add the selectable class', () => {
      expect(fixture.debugElement.classes['selectable']).toBeTrue()
    })

    it('should include the element in the tab sequence', () => {
      expect(fixture.debugElement.attributes['tabindex']).toBe('0')
    })

    // TODO: this maybe is not the best ARIA role
    // For instance, could be used in a multiple selection, and role would be option instead.
    // Better this than nothing I guess
    it('should add ARIA button role', () => {
      expect(fixture.debugElement.attributes['role']).toEqual('button')
    })

    const EVENT_TEST_CASES = ['click', 'keydown.space', 'keydown.enter']
    EVENT_TEST_CASES.forEach((eventName) => {
      describe(`when ${eventName} event is triggered`, () => {
        beforeEach(() => {
          fixture.debugElement.triggerEventHandler(eventName)
        })

        it('should emit new selected attribute on click', () => {
          expect(isSelected).toBeTrue()
        })
      })
    })
  })
})
