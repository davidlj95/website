import { ComponentFixture } from '@angular/core/testing'

import {
  COLLAPSIBLE_TREE_CHILDREN_COMPONENT_FORWARD_REF,
  CollapsibleTreeNodeComponent,
  IsCollapsibleFn,
} from './collapsible-tree-node.component'
import {
  PLATFORM_SERVICE,
  PlatformService,
} from '../../../common/platform.service'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { MockComponent, MockProvider, MockService } from 'ng-mocks'
import {
  MOCK_BROWSER_PLATFORM_SERVICE,
  MOCK_SERVER_PLATFORM_SERVICE,
} from '@test/helpers/platform-service'
import { By } from '@angular/platform-browser'
import { MATERIAL_SYMBOLS_SELECTOR } from '@test/helpers/material-symbols'
import { DescriptionLine } from '../../../metadata'
import { CollapsibleTreeChildrenComponent } from '../collapsible-tree-children/collapsible-tree-children.component'
import { byComponent } from '@test/helpers/component-query-predicates'
import {
  ATTRIBUTE_ARIA_CONTROLS,
  ATTRIBUTE_ARIA_EXPANDED,
  ATTRIBUTE_ARIA_HIDDEN,
} from '@test/helpers/aria'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'
import { expectIsVisibilityHiddenIfNoScript } from '@test/helpers/no-script'

describe('CollapsibleTreeNodeComponent', () => {
  let component: CollapsibleTreeNodeComponent
  let fixture: ComponentFixture<CollapsibleTreeNodeComponent>

  const DATA_CLASS_SELECTOR = By.css('.data')

  describe('when data is not provided', () => {
    it('should not render data if not provided', () => {
      ;[fixture, component] = makeSut()
      component.line = new DescriptionLine()
      fixture.detectChanges()

      const dataElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)
      expect(dataElement).toBeNull()
    })
  })
  describe('when data is provided', () => {
    const DUMMY_LINE = DescriptionLine.fromData(
      {
        symbol: 'symbol',
        html: '<span>Content</span>',
      },
      [new DescriptionLine()],
    )

    it('should display symbol and html content', () => {
      ;[fixture, component] = makeSut()
      component.line = DUMMY_LINE
      fixture.detectChanges()

      const lineElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)

      const materialSymbolSpan = lineElement.query(MATERIAL_SYMBOLS_SELECTOR)
      expect(materialSymbolSpan.nativeElement.textContent)
        .withContext('symbol')
        .toEqual(DUMMY_LINE.data!.symbol)
      expect(materialSymbolSpan.attributes['aria-hidden'])
        .withContext('symbol is hidden from screen readers')
        .toBe(true.toString())

      const htmlSpan = lineElement.query(By.css('.content'))
      expect(htmlSpan.nativeElement.innerHTML)
        .withContext('html')
        .toEqual(DUMMY_LINE.data!.html)
    })

    describe('when collapsible', () => {
      const ALWAYS_COLLAPSIBLE: IsCollapsibleFn = () => true
      const BUTTON_PREDICATE = By.css('button')

      it('should include button to toggle', () => {
        ;[fixture, component] = makeSut()
        component.line = DUMMY_LINE
        component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
        fixture.detectChanges()

        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
        expect(buttonElement).not.toBeNull()
      })

      it('should indicate via ARIA which element the button controls', () => {
        ;[fixture, component] = makeSut()
        component.line = DUMMY_LINE
        component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
        fixture.detectChanges()

        const buttonElement = fixture.debugElement.query(BUTTON_PREDICATE)
        const childrenElement = fixture.debugElement.query(
          byComponent(CollapsibleTreeChildrenComponent),
        )
        expect(getReflectedAttribute(childrenElement, 'id')).toEqual(
          buttonElement.attributes[ATTRIBUTE_ARIA_CONTROLS],
        )
      })

      it('should be expanded by default when rendering on server', () => {
        ;[fixture, component] = makeSut({
          platformService: MOCK_SERVER_PLATFORM_SERVICE,
        })
        component.line = DUMMY_LINE

        fixture.detectChanges()
        expect(component.isExpanded).toBeTrue()
      })

      it('should be collapsed by default when rendering on server', () => {
        ;[fixture, component] = makeSut({
          platformService: MOCK_BROWSER_PLATFORM_SERVICE,
        })
        component.line = DUMMY_LINE

        fixture.detectChanges()
        expect(component.isExpanded).toBeFalse()
      })

      interface ExpandedTestCase {
        readonly name: string
        readonly opposite: string
        readonly isExpanded: boolean
        readonly iconProperty: Extract<
          keyof CollapsibleTreeNodeComponent,
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
          let mockParentComponent: CollapsibleTreeNodeComponent
          let mockParentChildrenComponent: CollapsibleTreeChildrenComponent

          beforeEach(() => {
            mockParentChildrenComponent = MockService(
              CollapsibleTreeChildrenComponent,
            )
            mockParentComponent = MockService(CollapsibleTreeNodeComponent, {
              children: mockParentChildrenComponent,
            })
            spyOn(mockParentChildrenComponent, 'collapseAllChildren')
            ;[fixture, component] = makeSut()
            component.line = DUMMY_LINE
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
            const caretElement = fixture.debugElement.query(By.css('.caret'))
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
                mockParentChildrenComponent.collapseAllChildren,
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
): [
  ComponentFixture<CollapsibleTreeNodeComponent>,
  CollapsibleTreeNodeComponent,
] {
  return componentTestSetup(
    CollapsibleTreeNodeComponent,
    {
      providers: [
        MockProvider(
          PLATFORM_SERVICE,
          opts.platformService ?? MOCK_BROWSER_PLATFORM_SERVICE,
        ),
      ],
    },
    // Override `forwardRef` of children component
    {
      remove: {
        imports: [COLLAPSIBLE_TREE_CHILDREN_COMPONENT_FORWARD_REF],
      },
      add: {
        imports: [MockComponent(CollapsibleTreeChildrenComponent)],
      },
    },
  )
}
