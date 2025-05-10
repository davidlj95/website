import { Component } from '@angular/core'
import { TechTagsSelectorComponent } from './tech-tags-selector.component'
import { REST_TAGS, TechTag } from '../tags'
import { By } from '@angular/platform-browser'
import { textContent } from '@/test/helpers/text-content'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('TechTagsSelectorComponent', () => {
  it('should create', () => {
    expect(makeSut()[1]).toBeTruthy()
  })

  it('should display all available tags as checkboxes', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    const labels = fixture.debugElement.queryAll(By.css('label'))
    const checkboxes = fixture.debugElement.queryAll(
      By.css('input[type="checkbox"]'),
    )

    expect(labels.length)
      .withContext('As many labels as available tags')
      .toBe(AVAILABLE_TAGS.length)

    expect(checkboxes.length)
      .withContext('As many checkboxes as available tags')
      .toBe(AVAILABLE_TAGS.length)

    AVAILABLE_TAGS.forEach((tag, index) => {
      const label = labels.at(index)!

      expect(label).withContext(`Label for ${tag.name} not found`).toBeTruthy()
      expect(textContent(label)).toEqual(tag.name)

      expect(checkboxes.at(index))
        .withContext(`Checkbox for ${tag.name} not found`)
        .toBeTruthy()
    })
  })

  it('should initially display selected tags', () => {
    const selected = [A_TAG]
    const [fixture] = makeSut({ selected })
    fixture.detectChanges()

    const labels = fixture.debugElement.queryAll(By.css('label'))
    const checkboxes = fixture.debugElement.queryAll(
      By.css('input[type="checkbox"]'),
    )
    labels.forEach((label, index) => {
      const shouldBeSelected = selected
        .map((tag) => tag.name)
        .includes(textContent(label)!)
      const checkbox = checkboxes.at(index)

      expect((checkbox!.nativeElement as HTMLInputElement).checked)
        .withContext(`Checkbox ${index} checked`)
        .toBe(shouldBeSelected)
    })
  })

  it('should select a tag when its unchecked checkbox is checked', () => {
    const unselectedTag = A_TAG
    const [fixture, component] = makeSut({ selected: [] })
    fixture.detectChanges()

    const labels = fixture.debugElement.queryAll(By.css('label'))
    const unselectedLabel = labels.find(
      (label) => textContent(label) === unselectedTag.name,
    )
    const unselectedCheckbox = unselectedLabel!.query(
      By.css('input[type="checkbox"]'),
    )

    expect((unselectedCheckbox.nativeElement as HTMLInputElement).checked)
      .withContext('Checkbox should be unchecked')
      .toBeFalse()

    unselectedCheckbox.triggerEventHandler('change')
    fixture.detectChanges()

    expect(component.selected).toEqual([unselectedTag])
  })

  it('should unselect a tag when its checked checkbox is unchecked', () => {
    const selectedTag = A_TAG
    const [fixture, component] = makeSut({ selected: [selectedTag] })
    fixture.detectChanges()

    const labels = fixture.debugElement.queryAll(By.css('label'))
    const selectedLabel = labels.find(
      (label) => textContent(label) === selectedTag.name,
    )
    const selectedCheckbox = selectedLabel!.query(
      By.css('input[type="checkbox"]'),
    )

    expect((selectedCheckbox.nativeElement as HTMLInputElement).checked)
      .withContext('Checkbox should be checked')
      .toBeTrue()

    selectedCheckbox.triggerEventHandler('change')
    fixture.detectChanges()

    expect(component.selected).toEqual([])
  })
})

const [A_TAG, ANOTHER_TAG] = [...REST_TAGS]
const AVAILABLE_TAGS = [A_TAG, ANOTHER_TAG]

const makeSut = (opts: { selected?: readonly TechTag[] } = {}) => {
  @Component({
    template: `
      <app-tech-tags-selector [available]="_available" [(selected)]="selected">
      </app-tech-tags-selector>
    `,
    imports: [TechTagsSelectorComponent],
  })
  class HostComponent {
    selected = opts.selected ?? []
    protected readonly _available = AVAILABLE_TAGS
  }
  return componentTestSetup(HostComponent)
}
