import { ComponentFixture } from '@angular/core/testing'

import { CollapsibleTreeChildrenComponent } from './collapsible-tree-children.component'
import { DescriptionLine } from '../../../metadata'
import { By } from '@angular/platform-browser'
import { byComponent } from '@test/helpers/component-query-predicates'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'
import {
  MOCK_BROWSER_PLATFORM_SERVICE,
  MOCK_SERVER_PLATFORM_SERVICE,
} from '@test/helpers/platform-service'
import {
  expectHiddenVisibility,
  expectIsDisplayed,
  expectIsNotDisplayed,
} from '@test/helpers/visibility'
import { expectIsFlexDisplayedIfNoScript } from '@test/helpers/no-script'
import {
  PLATFORM_SERVICE,
  PlatformService,
} from '../../../common/platform.service'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { MockProvider } from 'ng-mocks'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { CollapsibleTreeNodeComponent } from '../collapsible-tree-node/collapsible-tree-node.component'

describe('CollapsibleTreeChildrenComponent', () => {
  let component: CollapsibleTreeChildrenComponent
  let fixture: ComponentFixture<CollapsibleTreeChildrenComponent>
  const DUMMY_ITEMS = [
    DescriptionLine.fromData({ symbol: '', html: 'Foo' }),
    DescriptionLine.fromData({ symbol: '', html: 'Bar' }),
  ]
  const LIST_ELEMENT_PREDICATE = By.css('ul')

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  it('should not render the list of elements when children list is empty', () => {
    ;[fixture, component] = makeSut()
    component.children = []

    fixture.detectChanges()

    const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
    expect(listElement).toBeNull()
  })

  it('should render the list of elements (with assigned id and increased depth) when children list is not empty', () => {
    const DUMMY_DEPTH = 42
    const DUMMY_ID = 'dummy-id'
    ;[fixture, component] = makeSut()
    component.children = DUMMY_ITEMS
    component.depth = DUMMY_DEPTH
    component.id = DUMMY_ID

    fixture.detectChanges()

    const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
    expect(listElement).not.toBeNull()
    expect(listElement.attributes['id']).toEqual(DUMMY_ID)

    const listItemElements = listElement.queryAll(By.css('li'))
    expect(listItemElements).toHaveSize(DUMMY_ITEMS.length)

    for (const listItemElement of listItemElements) {
      const itemElement = listItemElement.query(
        byComponent(CollapsibleTreeNodeComponent),
      )
      expect(itemElement).not.toBeNull()

      expect(getReflectedAttribute(itemElement, 'depth')).toEqual(
        (DUMMY_DEPTH + 1).toString(),
      )
    }
  })

  const IS_NESTED_ATTR = 'data-is-nested'
  it('should indicate list is not nested when depth is 0', () => {
    const NOT_NESTED_DEPTH = 0
    ;[fixture, component] = makeSut()
    component.children = DUMMY_ITEMS
    component.depth = NOT_NESTED_DEPTH

    fixture.detectChanges()

    const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
    expect(listElement.attributes[IS_NESTED_ATTR]).toEqual(false.toString())
  })

  it('should indicate list is nested when depth is > 0', () => {
    const NESTED_DEPTH = 1
    ;[fixture, component] = makeSut()
    component.children = DUMMY_ITEMS
    component.depth = NESTED_DEPTH

    fixture.detectChanges()

    const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
    expect(listElement.attributes[IS_NESTED_ATTR]).toEqual(true.toString())
  })

  describe('when collapsible', () => {
    const IS_COLLAPSIBLE = true

    describe('when rendering on browser', () => {
      beforeEach(() => {
        ;[fixture, component] = makeSut({
          platformService: MOCK_BROWSER_PLATFORM_SERVICE,
        })
        component.children = DUMMY_ITEMS
        component.isCollapsible = IS_COLLAPSIBLE
        fixture.detectChanges()
      })

      it('should display list', () => {
        const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
        expectIsDisplayed(listElement.nativeElement)
      })

      //👇 This way, if animations are deferred, the hidden visibility initial status is
      //   already applied
      it('should set list visibility to hidden', () => {
        const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
        expectHiddenVisibility(listElement.nativeElement)
      })
    })

    describe('when rendering on server', () => {
      beforeEach(() => {
        ;[fixture, component] = makeSut({
          platformService: MOCK_SERVER_PLATFORM_SERVICE,
        })
        component.children = DUMMY_ITEMS
        component.isCollapsible = IS_COLLAPSIBLE
        fixture.detectChanges()
      })

      it('should not display list', () => {
        const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
        expectIsNotDisplayed(listElement.nativeElement)
      })

      it('should force list display if no JS', () => {
        const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
        expectIsFlexDisplayedIfNoScript(listElement)
      })
    })
  })
})

function makeSut(
  opts: { platformService?: PlatformService } = {},
): [
  ComponentFixture<CollapsibleTreeChildrenComponent>,
  CollapsibleTreeChildrenComponent,
] {
  return componentTestSetup(CollapsibleTreeChildrenComponent, {
    providers: [
      MockProvider(
        PLATFORM_SERVICE,
        opts.platformService ?? MOCK_BROWSER_PLATFORM_SERVICE,
      ),
      provideNoopAnimations(),
    ],
  })
}
