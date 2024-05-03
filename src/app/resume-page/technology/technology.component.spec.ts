import { ComponentFixture } from '@angular/core/testing'

import { TechnologyComponent } from './technology.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TechnologyItem } from './technology-item'
import { By } from '@angular/platform-browser'
import { MockComponent } from 'ng-mocks'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  let fixture: ComponentFixture<TechnologyComponent>
  const DUMMY_TECHNOLOGY_ITEM = {
    slug: 'slug',
    displayName: 'displayName',
    icon: {
      slug: 'slug',
      hex: 'blue',
    },
    version: 'version',
  } satisfies TechnologyItem

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
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
  return componentTestSetup(TechnologyComponent, {
    imports: [TechnologyComponent, MockComponent(SimpleIconComponent)],
  })
}
