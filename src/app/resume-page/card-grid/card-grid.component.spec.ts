import { ComponentFixture } from '@angular/core/testing'
import { CardGridComponent } from './card-grid.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { shouldProjectContent } from '@test/helpers/component-testers'

describe('CardGridComponent', () => {
  let component: CardGridComponent
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fixture: ComponentFixture<CardGridComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardGridComponent)
})

function makeSut() {
  return componentTestSetup(CardGridComponent)
}
