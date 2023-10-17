import { ChipComponent } from './chip.component'
import { testSetup } from '../../../test/helpers/component-test-setup'
import { ensureProjectsContent } from '../../../test/helpers/component-testers'
import { ComponentFixture } from '@angular/core/testing'
import { first, Subscription } from 'rxjs'

describe('ChipComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(ChipComponent)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  ensureProjectsContent(ChipComponent)

  describe('when selected attribute is false', () => {
    it('should not add the selected class', () => {
      const [fixture, component] = testSetup(ChipComponent)
      component.selected = false
      fixture.detectChanges()

      expect(fixture.debugElement.classes['selected']).toBeFalsy()
    })
  })

  describe('when selected attribute is true', () => {
    it('should add the selected class', () => {
      const [fixture, component] = testSetup(ChipComponent)
      component.selected = true
      fixture.detectChanges()

      expect(fixture.debugElement.classes['selected']).toBeTrue()
    })
  })

  describe('when selected attribute is not listened', () => {
    it('should not add the selectable class', () => {
      const [fixture] = testSetup(ChipComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.classes['selectable']).toBeFalsy()
    })

    it('should not include the element in the tab sequence', () => {
      const [fixture] = testSetup(ChipComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.attributes['tabindex']).toBeUndefined()
    })

    it('should not add ARIA role', () => {
      const [fixture] = testSetup(ChipComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.attributes['role']).toBeUndefined()
    })
  })

  describe('when selected attribute is listened', () => {
    let fixture: ComponentFixture<ChipComponent>
    let component: ChipComponent
    let subscription: Subscription
    let newSelectedValue: boolean

    beforeEach(() => {
      ;[fixture, component] = testSetup(ChipComponent)
      component.selected = false
      subscription = component.selectedChange
        .pipe(first())
        .subscribe((selected) => (newSelectedValue = selected))
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

    it('should emit new selected attribute on click', () => {
      fixture.debugElement.triggerEventHandler('click')

      expect(newSelectedValue).toBeTrue()
    })

    it('should emit new selected attribute on space key', () => {
      fixture.debugElement.triggerEventHandler('keydown.space')

      expect(newSelectedValue).toBeTrue()
    })

    it('should emit new selected attribute on enter key', () => {
      fixture.debugElement.triggerEventHandler('keydown.enter')

      expect(newSelectedValue).toBeTrue()
    })
  })
})
