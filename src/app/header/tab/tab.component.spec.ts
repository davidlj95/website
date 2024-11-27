import { ComponentFixture } from '@angular/core/testing'
import { TabComponent } from './tab.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { ATTRIBUTE_ARIA_SELECTED } from '@/test/helpers/aria'

describe('TabComponent', () => {
  let component: TabComponent
  let fixture: ComponentFixture<TabComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should have ARIA tab role', () => {
    fixture.detectChanges()

    expect(fixture.debugElement.attributes['role']).toEqual('tab')
  })

  it('should not be selected by default', () => {
    expect(component.isSelected).toBeFalse()
  })

  describe('when selected', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isSelected', true)
      fixture.detectChanges()
    })

    it('should mark it as selected via ARIA', () => {
      expect(fixture.debugElement.attributes[ATTRIBUTE_ARIA_SELECTED]).toEqual(
        true.toString(),
      )
    })

    it('should include it in tab sequence as focusable node', () => {
      expect(fixture.debugElement.attributes['tabindex']).toEqual('0')
    })
  })

  describe('when not selected', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isSelected', false)
      fixture.detectChanges()
    })

    it('should mark it as not selected via ARIA', () => {
      expect(fixture.debugElement.attributes[ATTRIBUTE_ARIA_SELECTED]).toEqual(
        false.toString(),
      )
    })

    it('should include it in tab sequence as not focusable node', () => {
      expect(fixture.debugElement.attributes['tabindex']).toEqual('-1')
    })
  })
})

const makeSut = () => componentTestSetup(TabComponent)
