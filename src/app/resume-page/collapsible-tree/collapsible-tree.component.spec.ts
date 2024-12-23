import { ComponentFixture } from '@angular/core/testing'

import { CollapsibleTreeComponent } from './collapsible-tree.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'
import {
  ATTRIBUTE_ARIA_CONTROLS,
  ATTRIBUTE_ARIA_EXPANDED,
  ATTRIBUTE_ARIA_HIDDEN,
} from '@/test/helpers/aria'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { expectIsInLayout } from '@/test/helpers/visibility'
import {
  CollapsibleTreeNode,
  CollapsibleTreeNodeData,
} from './collapsible-tree-node'
import { Component, input } from '@angular/core'
import { EmptyComponent } from '@/test/helpers/empty-component'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { textContent } from '@/test/helpers/text-content'
import { ComponentInputs } from '@/common/component-inputs'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('CollapsibleTreeComponent', () => {
  let component: CollapsibleTreeComponent
  let fixture: ComponentFixture<CollapsibleTreeComponent>

  const DATA_PREDICATE = By.css('.data')
  const LIST_PREDICATE = By.css('ul')
  const CARET_PREDICATE = By.css('.caret')

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(CollapsibleTreeComponent, {
      providers: [provideNoopAnimations()],
    })
  })

  describe('when node has no data', () => {
    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: new CollapsibleTreeNode(),
      })
    })

    it('should not render data element', () => {
      const dataElement = fixture.debugElement.query(DATA_PREDICATE)

      expect(dataElement).toBeNull()
    })
  })

  describe('when node has data', () => {
    const DUMMY_COMPONENT_CONTENTS = 'dummy contents'
    @Component({
      selector: 'app-dummy-component',
      template: '{{ contents() }}',
    })
    class DummyComponent {
      contents = input.required<string>()
    }

    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: new CollapsibleTreeNode(
          new CollapsibleTreeNodeData(DummyComponent, {
            inputs: {
              contents: DUMMY_COMPONENT_CONTENTS,
            } satisfies ComponentInputs<DummyComponent>,
          }),
        ),
      })
    })

    it('should render data element and project node data component binding its inputs', () => {
      const dataElement = fixture.debugElement.query(DATA_PREDICATE)

      expect(dataElement).not.toBeNull()

      const nodeDataElement = dataElement.query(By.directive(DummyComponent))

      expect(nodeDataElement).not.toBeNull()

      expect(textContent(nodeDataElement)).toEqual(DUMMY_COMPONENT_CONTENTS)
    })
  })

  describe('when node has no children', () => {
    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: new CollapsibleTreeNode(),
      })
    })

    it('should not render the list of children', () => {
      const listElement = fixture.debugElement.query(LIST_PREDICATE)

      expect(listElement).toBeNull()
    })
  })

  const DUMMY_CHILDREN = [new CollapsibleTreeNode(), new CollapsibleTreeNode()]
  const DUMMY_NODE_DATA = new CollapsibleTreeNodeData(EmptyComponent)
  const DUMMY_NODE_WITH_CHILDREN = new CollapsibleTreeNode(
    DUMMY_NODE_DATA,
    DUMMY_CHILDREN,
  )
  const DUMMY_DEPTH = 42
  const BUTTON_PREDICATE = By.css('button')

  describe('when node has children', () => {
    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: DUMMY_NODE_WITH_CHILDREN,
        depth: DUMMY_DEPTH,
      })
    })

    it('should render the list of children (with assigned id and increased depth)', () => {
      const listElement = fixture.debugElement.query(LIST_PREDICATE)
      const listItemElements = listElement.queryAll(By.css('li'))

      expect(listItemElements).toHaveSize(DUMMY_CHILDREN.length)

      for (const listItemElement of listItemElements) {
        const itemElement = listItemElement.query(
          By.directive(CollapsibleTreeComponent),
        )

        expect(itemElement).not.toBeNull()

        expect(
          getComponentInstance(itemElement, CollapsibleTreeComponent).depth(),
        ).toBe(DUMMY_DEPTH + 1)
      }
    })
  })

  describe("when node has children and it's collapsible", () => {
    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: DUMMY_NODE_WITH_CHILDREN,
        isCollapsibleFn: () => true,
      })
    })

    it('should include button to toggle', () => {
      const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

      expect(buttonElement).not.toBeNull()
    })

    it('should indicate which element the button controls', () => {
      const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

      expect(buttonElement.attributes[ATTRIBUTE_ARIA_CONTROLS]).toEqual(
        component.childListId!,
      )

      const listElement = fixture.debugElement.query(LIST_PREDICATE)

      expect(listElement).not.toBeNull()
      expect(listElement.attributes['id']).toEqual(component.childListId!)
    })

    shouldDisplayChildrenList()

    it('should be collapsed by default', () => {
      expect(component.isExpanded()).toBeFalse()
    })
  })

  const EXPANDED_TEST_CASES = [
    { isExpanded: true, icon: '▼' },
    { isExpanded: false, icon: '▶' },
  ] as const
  for (const testCase of EXPANDED_TEST_CASES) {
    describe(`when node has children, it's collapsible and it's ${testCase.isExpanded ? 'expanded' : 'collapsed'}`, () => {
      beforeEach(() => {
        setFixtureInputsAndDetectChanges(fixture, {
          node: DUMMY_NODE_WITH_CHILDREN,
          isCollapsibleFn: () => true,
          isExpanded: testCase.isExpanded,
        })
      })

      it('should indicate it via ARIA', () => {
        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

        expect(buttonElement.attributes[ATTRIBUTE_ARIA_EXPANDED]).toEqual(
          testCase.isExpanded.toString(),
        )
      })

      it(`should change to ${testCase.isExpanded ? 'collapsed' : 'expanded'} when tapping on it`, () => {
        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
        buttonElement.triggerEventHandler('click')
        fixture.detectChanges()

        expect(component.isExpanded()).toEqual(!testCase.isExpanded)
      })

      it(`should display caret with ${testCase.icon} icon and hidden from screen readers`, () => {
        const caretElement = fixture.debugElement.query(CARET_PREDICATE)

        expect(caretElement).not.toBeNull()
        expect(textContent(caretElement)).toEqual(testCase.icon)

        expect(caretElement.attributes[ATTRIBUTE_ARIA_HIDDEN]).toEqual('true')
      })
    })
  }

  describe('when expanding a collapsed node with siblings', () => {
    let expandedChildComponent: CollapsibleTreeComponent
    let restChildrenComponents: CollapsibleTreeComponent[]

    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: DUMMY_NODE_WITH_CHILDREN,
        isCollapsibleFn: () => true,
        isExpanded: false,
      })

      const childrenComponents = fixture.debugElement
        .queryAll(By.directive(CollapsibleTreeComponent))
        .map((c) => c.componentInstance as CollapsibleTreeComponent)

      // eslint-disable-next-line jasmine/no-expect-in-setup-teardown
      expect(childrenComponents.length).toEqual(DUMMY_CHILDREN.length)

      childrenComponents.forEach(
        (child) => (child.collapse = jasmine.createSpy()),
      )
      ;[expandedChildComponent, ...restChildrenComponents] = childrenComponents

      expandedChildComponent.expand()
    })

    it('should collapse rest of siblings', () => {
      expect(expandedChildComponent.collapse).not.toHaveBeenCalled()
      restChildrenComponents.forEach((child) => {
        expect(child.collapse).toHaveBeenCalledOnceWith()
      })
    })
  })

  describe("when node has children and it's not collapsible", () => {
    beforeEach(() => {
      setFixtureInputsAndDetectChanges(fixture, {
        node: DUMMY_NODE_WITH_CHILDREN,
        isCollapsibleFn: () => false,
      })
    })

    it('should not include button to toggle', () => {
      const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

      expect(buttonElement).toBeNull()
    })

    shouldDisplayChildrenList()
  })

  function shouldDisplayChildrenList() {
    it('should display children list', () => {
      const listElement = fixture.debugElement.query(LIST_PREDICATE)
      expectIsInLayout(listElement)
    })
  }
})
