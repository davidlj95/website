import { ComponentFixture } from '@angular/core/testing'

import { TechnologyComponent } from './technology.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { TechnologyItem } from './technology-item'
import { By } from '@angular/platform-browser'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  let fixture: ComponentFixture<TechnologyComponent>
  const DUMMY_TECHNOLOGY_ITEM = {
    slug: 'slug',
    displayName: 'displayName',
    icon: {
      svg: 'svg',
      color: 'blue',
    },
    version: 'version',
  } satisfies TechnologyItem

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  const ICON_PREDICATE = By.css('.icon')

  it('should not render icon if does not exist', () => {
    ;[fixture, component] = makeSut()
    component.item = {
      ...DUMMY_TECHNOLOGY_ITEM,
      icon: undefined,
    }
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(ICON_PREDICATE)
    expect(iconElement).toBeNull()
  })

  it('should render icon if exists', () => {
    ;[fixture, component] = makeSut()
    component.item = DUMMY_TECHNOLOGY_ITEM
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(ICON_PREDICATE)
    expect(iconElement).not.toBeNull()
    expect(iconElement.nativeElement.innerHTML).toEqual(
      DUMMY_TECHNOLOGY_ITEM.icon.svg,
    )
  })

  it('should set icon fill color if exists', () => {
    ;[fixture, component] = makeSut()
    component.item = DUMMY_TECHNOLOGY_ITEM
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(ICON_PREDICATE)
    expect(iconElement.styles['fill']).toEqual(DUMMY_TECHNOLOGY_ITEM.icon.color)
  })

  it('should render display name', () => {
    ;[fixture, component] = makeSut()
    component.item = DUMMY_TECHNOLOGY_ITEM
    fixture.detectChanges()

    const displayNameElement = fixture.debugElement.query(By.css('.name'))
    expect(displayNameElement.nativeElement.textContent.trim()).toEqual(
      DUMMY_TECHNOLOGY_ITEM.displayName,
    )
  })
})

function makeSut() {
  return componentTestSetup(TechnologyComponent)
}
