import { ComponentFixture } from '@angular/core/testing'

import {
  CollapsibleTreeComponent,
  IsCollapsibleFn,
} from './collapsible-tree.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'
import { byComponent } from '@/test/helpers/component-query-predicates'
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
import { Component, Input } from '@angular/core'
import { EmptyComponent } from '@/test/helpers/empty-component'
import { getComponentInstance } from '@/test/helpers/get-component-instance'

describe('CollapsibleTreeComponent', () => {
  let component: CollapsibleTreeComponent
  let fixture: ComponentFixture<CollapsibleTreeComponent>

  const DUMMY_NODE_DATA = new CollapsibleTreeNodeData(EmptyComponent)

  const DATA_PREDICATE = By.css('.data')
  const LIST_PREDICATE = By.css('ul')
  const CARET_PREDICATE = By.css('.caret')

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  describe('when node has no data', () => {
    beforeEach(() => {
      component.node = new CollapsibleTreeNode()

      fixture.detectChanges()
    })

    it('should not render data element', () => {
      const dataElement = fixture.debugElement.query(DATA_PREDICATE)

      expect(dataElement).toBeNull()
    })
  })

  describe('when node has data', () => {
    const DUMMY_COMPONENT_CONTENTS = 'dummy contents'
    @Component({
      standalone: true,
      template: '{{ contents }}',
      selector: 'app-dummy-component',
    })
    class DummyComponent {
      @Input({ required: true }) contents!: string
    }

    beforeEach(() => {
      component.node = new CollapsibleTreeNode(
        new CollapsibleTreeNodeData(DummyComponent, {
          inputs: { contents: DUMMY_COMPONENT_CONTENTS } satisfies Record<
            keyof DummyComponent,
            unknown
          >,
        }),
      )

      fixture.detectChanges()
    })

    it('should render data element and project node data component binding its inputs', () => {
      const dataElement = fixture.debugElement.query(DATA_PREDICATE)

      expect(dataElement).not.toBeNull()

      const nodeDataElement = dataElement.query(byComponent(DummyComponent))

      expect(nodeDataElement).not.toBeNull()

      expect(nodeDataElement.nativeElement.textContent.trim()).toEqual(
        DUMMY_COMPONENT_CONTENTS,
      )
    })
  })

  describe('when data has no children', () => {
    beforeEach(() => {
      component.node = new CollapsibleTreeNode()

      fixture.detectChanges()
    })

    it('should not render the list of children', () => {
      const listElement = fixture.debugElement.query(LIST_PREDICATE)

      expect(listElement).toBeNull()
    })
  })

  describe('when data has children', () => {
    const DUMMY_CHILDREN = [
      new CollapsibleTreeNode(),
      new CollapsibleTreeNode(),
    ]
    const DUMMY_NODE = new CollapsibleTreeNode(DUMMY_NODE_DATA, DUMMY_CHILDREN)
    const DUMMY_DEPTH = 42
    const BUTTON_PREDICATE = By.css('button')

    beforeEach(() => {
      component.node = DUMMY_NODE
      component.depth = DUMMY_DEPTH
    })

    it('should render the list of children (with assigned id and increased depth)', () => {
      fixture.detectChanges()

      const listElement = fixture.debugElement.query(LIST_PREDICATE)
      const listItemElements = listElement.queryAll(By.css('li'))

      expect(listItemElements).toHaveSize(DUMMY_CHILDREN.length)

      for (const listItemElement of listItemElements) {
        const itemElement = listItemElement.query(
          byComponent(CollapsibleTreeComponent),
        )

        expect(itemElement).not.toBeNull()

        expect(
          getComponentInstance(itemElement, CollapsibleTreeComponent).depth,
        ).toBe(DUMMY_DEPTH + 1)
      }
    })

    describe('when collapsible', () => {
      const ALWAYS_COLLAPSIBLE: IsCollapsibleFn = () => true

      beforeEach(() => {
        component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
      })

      describe('by default', () => {
        beforeEach(() => {
          fixture.detectChanges()
        })

        it('should include button to toggle', () => {
          fixture.detectChanges()

          const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

          expect(buttonElement).not.toBeNull()
        })

        it('should indicate which element the button controls', () => {
          fixture.detectChanges()

          const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

          expect(buttonElement.attributes[ATTRIBUTE_ARIA_CONTROLS]).toEqual(
            component.childListId!,
          )

          const listElement = fixture.debugElement.query(LIST_PREDICATE)

          expect(listElement).not.toBeNull()
          expect(listElement.attributes['id']).toEqual(component.childListId!)
        })

        it('should display list', () => {
          const listElement = fixture.debugElement.query(LIST_PREDICATE)
          expectIsInLayout(listElement.nativeElement)
        })

        it('should be collapsed', () => {
          expect(component.isExpanded).toBeFalse()
        })
      })

      interface ExpandedTestCase {
        readonly name: string
        readonly opposite: string
        readonly isExpanded: boolean
        readonly iconProperty: Extract<
          keyof CollapsibleTreeComponent,
          'expandedIcon' | 'collapsedIcon'
        >
      }

      const EXPANDED_TEST_CASES = [
        {
          name: 'expanded',
          opposite: 'collapsed',
          isExpanded: true,
          iconProperty: 'expandedIcon',
        },
        {
          name: 'collapsed',
          opposite: 'expanded',
          isExpanded: false,
          iconProperty: 'collapsedIcon',
        },
      ] as const satisfies readonly ExpandedTestCase[]
      for (const testCase of EXPANDED_TEST_CASES) {
        describe(`when ${testCase.name}`, () => {
          let mockParentComponent: jasmine.SpyObj<CollapsibleTreeComponent>

          beforeEach(() => {
            mockParentComponent = jasmine.createSpyObj('node', [
              'collapseAllChildren' satisfies keyof CollapsibleTreeComponent,
            ])
            component.parent = mockParentComponent
            component.isExpanded = testCase.isExpanded

            fixture.detectChanges()
          })

          it('should indicate it via ARIA', () => {
            const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

            expect(buttonElement.attributes[ATTRIBUTE_ARIA_EXPANDED]).toEqual(
              testCase.isExpanded.toString(),
            )
          })

          it(`should change to ${testCase.opposite} when tapping on it`, () => {
            const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
            buttonElement.triggerEventHandler('click')

            fixture.detectChanges()

            expect(component.isExpanded).toEqual(!testCase.isExpanded)
          })

          it('should render caret with proper icon and hidden from screen readers', () => {
            const caretElement = fixture.debugElement.query(CARET_PREDICATE)

            expect(caretElement).not.toBeNull()
            expect(caretElement.nativeElement.textContent.trim()).toEqual(
              component[testCase.iconProperty],
            )

            expect(caretElement.attributes[ATTRIBUTE_ARIA_HIDDEN]).toEqual(
              'true',
            )
          })

          if (testCase.name === 'collapsed') {
            it('should collapse rest of siblings', () => {
              const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
              buttonElement.triggerEventHandler('click')

              fixture.detectChanges()

              expect(
                mockParentComponent.collapseAllChildren,
              ).toHaveBeenCalledOnceWith({ except: component })
            })
          }
        })
      }
    })

    describe('when non collapsible', () => {
      const NEVER_COLLAPSIBLE: IsCollapsibleFn = () => false

      beforeEach(() => {
        component.isCollapsibleFn = NEVER_COLLAPSIBLE

        fixture.detectChanges()
      })

      it('should not include button to toggle', () => {
        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)

        expect(buttonElement).toBeNull()
      })

      it('should display list', () => {
        const listElement = fixture.debugElement.query(LIST_PREDICATE)
        expectIsInLayout(listElement.nativeElement)
      })
    })
  })
})

const makeSut = () =>
  componentTestSetup(CollapsibleTreeComponent, {
    providers: [provideNoopAnimations()],
  })
