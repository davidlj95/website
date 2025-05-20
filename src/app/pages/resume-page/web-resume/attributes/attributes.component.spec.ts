import { AttributesComponent } from './attributes.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { CUM_LAUDE_ATTRIBUTE } from '../../data/attribute'
import { By } from '@angular/platform-browser'
import { AttributeComponent } from './attribute/attribute.component'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { MockComponents } from 'ng-mocks'

describe('AttributesComponent', () => {
  it('should create', () => {
    const [fixture, component] = makeSut()
    setFixtureInputsAndDetectChanges(fixture, { attributes: [] })

    expect(component).toBeTruthy()
  })

  it('should display attributes', () => {
    const [fixture] = makeSut()
    const attributes = [CUM_LAUDE_ATTRIBUTE]
    setFixtureInputsAndDetectChanges(fixture, { attributes })

    const attributeElements = fixture.debugElement.queryAll(
      By.directive(AttributeComponent),
    )

    expect(attributeElements.length)
      .withContext('same attributes elements as given attributes')
      .toEqual(attributes.length)

    attributeElements.forEach((attributeElement, index) => {
      const attribute = attributes[index]

      expect(
        getComponentInstance(attributeElement, AttributeComponent).symbol,
      ).toEqual(attribute.symbol)

      expect(textContent(attributeElement)).toEqual(attribute.text)
    })
  })
})

const makeSut = () =>
  componentTestSetup(AttributesComponent, {
    imports: [MockComponents(AttributeComponent)],
  })
