import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SelectorComponent, SelectorOption } from './selector.component'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'
import { textContent } from '@/test/helpers/text-content'
import { ATTRIBUTE_ARIA_LABEL } from '@/test/helpers/aria'

describe('SelectorComponent', () => {
  let component: SelectorComponent
  let fixture: ComponentFixture<SelectorComponent>
  const label = 'Select something'
  const options: readonly SelectorOption[] = [
    { name: 'Option 0', value: 'option-0' },
    { name: 'Option 1', value: 'option-1' },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SelectorComponent)
    component = fixture.componentInstance
    setFixtureInputsAndDetectChanges(fixture, { label, options })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all options with their values', () => {
    const optionEls = fixture.debugElement.queryAll(By.css('option'))

    expect(optionEls.length)
      .withContext('as many option elements as options given')
      .toEqual(options.length)

    optionEls.forEach((optionEl, index) => {
      expect(optionEl.attributes['value'])
        .withContext(`option ${index} element value`)
        .toEqual(options[index].value)

      expect(textContent(optionEl))
        .withContext(`option ${index} element text`)
        .toEqual(options[index].name)
    })
  })

  it('should display the selected option', () => {
    const selectedIndex = 1
    const selectedOption = options[selectedIndex]
    setFixtureInputsAndDetectChanges(fixture, {
      selected: selectedOption.value,
    })

    const selectedOptionEls = fixture.debugElement
      .queryAll(By.css('option'))
      .filter((el) => (el.nativeElement as HTMLOptionElement).selected)

    expect(selectedOptionEls.length).toBe(1)

    expect(selectedOptionEls[0].attributes['value']).toEqual(
      selectedOption.value,
    )
  })

  it('should emit the selected option value', () => {
    let selectedEmitted: string | undefined
    component.selectedChange.subscribe((selected) => {
      selectedEmitted = selected
    })

    const selectedIndex = 1
    const selectEl = fixture.debugElement.query(By.css('select'))
    ;(selectEl.nativeElement as HTMLSelectElement).value =
      options[selectedIndex].value
    selectEl.triggerEventHandler('change', {
      target: selectEl.nativeElement as HTMLSelectElement,
    } as Partial<Event>)

    expect(selectedEmitted).toEqual(options[selectedIndex].value)
  })

  it('should set ARIA label', () => {
    expect(
      fixture.debugElement.query(By.css('select')).attributes[
        ATTRIBUTE_ARIA_LABEL
      ],
    ).toEqual(label)
  })
})
