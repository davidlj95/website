import { ComponentFixture } from '@angular/core/testing'

import { TechnologyComponent } from './technology.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fixture: ComponentFixture<TechnologyComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })
})

function makeSut() {
  return componentTestSetup(TechnologyComponent)
}
