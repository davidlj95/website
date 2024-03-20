import { ComponentFixture } from '@angular/core/testing'

import {
  CollapsibleTreeComponent,
  IsCollapsibleFn,
} from './collapsible-tree.component'
import {
  PLATFORM_SERVICE,
  PlatformService,
} from '../../common/platform.service'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { MockProvider } from 'ng-mocks'
import {
  MOCK_BROWSER_PLATFORM_SERVICE,
  MOCK_SERVER_PLATFORM_SERVICE,
} from '@test/helpers/platform-service'
import { By } from '@angular/platform-browser'
import { byComponent } from '@test/helpers/component-query-predicates'
import {
  ATTRIBUTE_ARIA_CONTROLS,
  ATTRIBUTE_ARIA_EXPANDED,
  ATTRIBUTE_ARIA_HIDDEN,
} from '@test/helpers/aria'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'
import {
  expectIsFlexDisplayedIfNoScript,
  expectIsVisibilityHiddenIfNoScript,
} from '@test/helpers/no-script'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import {
  expectHiddenVisibility,
  expectIsDisplayed,
  expectIsNotDisplayed,
} from '@test/helpers/visibility'
import {
  CollapsibleTreeNode,
  CollapsibleTreeNodeData,
} from './collapsible-tree-node'
import { Component, Input } from '@angular/core'
import { EmptyComponent } from '@test/helpers/empty-component'

describe('CollapsibleTreeComponent', () => {
  let component: CollapsibleTreeComponent
  let fixture: ComponentFixture<CollapsibleTreeComponent>

  const DUMMY_NODE_DATA = new CollapsibleTreeNodeData(EmptyComponent)

  const DATA_PREDICATE = By.css('.data')
  const LIST_PREDICATE = By.css('ul')
  const CARET_PREDICATE = By.css('.caret')

  describe('when node has no data', () => {
    it('should not render data element', () => {
      ;[fixture, component] = makeSut()
      component.node = new CollapsibleTreeNode()
      fixture.detectChanges()

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

    it('should render data element and project node data component binding its inputs', () => {
      ;[fixture, component] = makeSut()
      component.node = new CollapsibleTreeNode(
        new CollapsibleTreeNodeData(DummyComponent, {
          inputs: { contents: DUMMY_COMPONENT_CONTENTS } satisfies Record<
            keyof DummyComponent,
            unknown
          >,
        }),
      )
      fixture.detectChanges()

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
    it('should not render the list of children', () => {
      ;[fixture, component] = makeSut()
      component.node = new CollapsibleTreeNode()

      fixture.detectChanges()

      const listElement = fixture.debugElement.query(LIST_PREDICATE)
      expect(listElement).toBeNull()
    })
  })

  describe('when data has children', () => {
    it('should render the list of children (with assigned id and increased depth)', () => {
      const DUMMY_DEPTH = 42
      const DUMMY_CHILDREN = [
        new CollapsibleTreeNode(),
        new CollapsibleTreeNode(),
      ]
      ;[fixture, component] = makeSut()
      component.node = new CollapsibleTreeNode(undefined, DUMMY_CHILDREN)
      component.depth = DUMMY_DEPTH

      fixture.detectChanges()

      const listElement = fixture.debugElement.query(LIST_PREDICATE)
      const listItemElements = listElement.queryAll(By.css('li'))
      expect(listItemElements).toHaveSize(DUMMY_CHILDREN.length)

      for (const listItemElement of listItemElements) {
        const itemElement = listItemElement.query(
          byComponent(CollapsibleTreeComponent),
        )
        expect(itemElement).not.toBeNull()

        expect(getReflectedAttribute(itemElement, 'depth')).toEqual(
          (DUMMY_DEPTH + 1).toString(),
        )
      }
    })

    describe('when collapsible', () => {
      const DUMMY_NODE = new CollapsibleTreeNode(DUMMY_NODE_DATA, [
        new CollapsibleTreeNode(),
        new CollapsibleTreeNode(),
      ])
      const ALWAYS_COLLAPSIBLE: IsCollapsibleFn = () => true
      const BUTTON_PREDICATE = By.css('button')

      it('should include button to toggle', () => {
        ;[fixture, component] = makeSut()
        component.node = DUMMY_NODE
        component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
        fixture.detectChanges()

        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
        expect(buttonElement).not.toBeNull()
      })

      it('should indicate via ARIA which element the button controls', () => {
        ;[fixture, component] = makeSut()
        component.node = DUMMY_NODE
        component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
        fixture.detectChanges()

        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
        expect(buttonElement.attributes[ATTRIBUTE_ARIA_CONTROLS]).toEqual(
          component.sluggedId!,
        )

        const listElement = fixture.debugElement.query(LIST_PREDICATE)
        expect(listElement).not.toBeNull()
        expect(listElement.attributes['id']).toEqual(component.sluggedId!)
      })

      describe('when rendering on browser', () => {
        beforeEach(() => {
          ;[fixture, component] = makeSut({
            platformService: MOCK_BROWSER_PLATFORM_SERVICE,
          })
          component.node = DUMMY_NODE
          component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
          fixture.detectChanges()
        })

        it('should display list', () => {
          const listElement = fixture.debugElement.query(LIST_PREDICATE)
          expectIsDisplayed(listElement.nativeElement)
        })

        it('should be collapsed by default', () => {
          expect(component.isExpanded).toBeFalse()
        })

        //👇 This way, if animations are deferred, the hidden visibility initial status is
        //   already applied
        it('should set list visibility to hidden', () => {
          const listElement = fixture.debugElement.query(LIST_PREDICATE)
          expectHiddenVisibility(listElement.nativeElement)
        })
      })

      describe('when rendering on server', () => {
        beforeEach(() => {
          ;[fixture, component] = makeSut({
            platformService: MOCK_SERVER_PLATFORM_SERVICE,
          })
          component.node = DUMMY_NODE
          component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
          fixture.detectChanges()
        })

        it('should not display list', () => {
          const listElement = fixture.debugElement.query(LIST_PREDICATE)
          expectIsNotDisplayed(listElement.nativeElement)
        })

        it('should force list display if no JS', () => {
          const listElement = fixture.debugElement.query(LIST_PREDICATE)
          expectIsFlexDisplayedIfNoScript(listElement)
        })

        it('should be expanded by default', () => {
          expect(component.isExpanded).toBeTrue()
        })

        it('should display collapsed caret icon to avoid layout shift (on browser will be collapsed)', () => {
          const caretElement = fixture.debugElement.query(CARET_PREDICATE)
          expect(caretElement.nativeElement.textContent.trim()).toEqual(
            component.collapsedIcon,
          )
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
      ] as const satisfies ReadonlyArray<ExpandedTestCase>
      for (const testCase of EXPANDED_TEST_CASES) {
        describe(`when ${testCase.name}`, () => {
          let mockParentComponent: jasmine.SpyObj<CollapsibleTreeComponent>

          beforeEach(() => {
            mockParentComponent = jasmine.createSpyObj('node', [
              'collapseAllChildren' satisfies keyof CollapsibleTreeComponent,
            ])
            ;[fixture, component] = makeSut()
            component.node = DUMMY_NODE
            component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
            component.isExpanded = testCase.isExpanded
            component.parent = mockParentComponent
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

          it('should render caret with proper icon, not visible if no script and ARIA hidden', () => {
            const caretElement = fixture.debugElement.query(CARET_PREDICATE)
            expect(caretElement).not.toBeNull()

            expect(caretElement.nativeElement.textContent.trim()).toEqual(
              component[testCase.iconProperty],
            )
            expect(caretElement.attributes[ATTRIBUTE_ARIA_HIDDEN]).toEqual(
              'true',
            )
            expectIsVisibilityHiddenIfNoScript(caretElement)
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
  })
})

function makeSut(
  opts: { platformService?: PlatformService } = {},
): [ComponentFixture<CollapsibleTreeComponent>, CollapsibleTreeComponent] {
  return componentTestSetup(CollapsibleTreeComponent, {
    providers: [
      MockProvider(
        PLATFORM_SERVICE,
        opts.platformService ?? MOCK_BROWSER_PLATFORM_SERVICE,
      ),
      provideNoopAnimations(),
    ],
  })
}
