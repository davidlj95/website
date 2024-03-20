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
import { MATERIAL_SYMBOLS_SELECTOR } from '@test/helpers/material-symbols'
import { DescriptionLine } from '../../metadata'
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

describe('CollapsibleTreeComponent', () => {
  let component: CollapsibleTreeComponent
  let fixture: ComponentFixture<CollapsibleTreeComponent>

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

    const LIST_ELEMENT_PREDICATE = By.css('ul')
    it('should not render the list of elements when children list is empty', () => {
      ;[fixture, component] = makeSut()
      component.line = new DescriptionLine(DUMMY_LINE.data)

      fixture.detectChanges()

      const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
      expect(listElement).toBeNull()
    })

    it('should render the list of elements (with assigned id and increased depth) when children list is not empty', () => {
      const DUMMY_DEPTH = 42
      const DUMMY_CHILDREN = [new DescriptionLine(), new DescriptionLine()]
      ;[fixture, component] = makeSut()
      component.line = new DescriptionLine(DUMMY_LINE.data, DUMMY_CHILDREN)
      component.depth = DUMMY_DEPTH

      fixture.detectChanges()

      const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
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
        expect(buttonElement.attributes[ATTRIBUTE_ARIA_CONTROLS]).toEqual(
          component.sluggedId!,
        )

        const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
        expect(listElement).not.toBeNull()
        expect(listElement.attributes['id']).toEqual(component.sluggedId!)
      })

      describe('when rendering on browser', () => {
        beforeEach(() => {
          ;[fixture, component] = makeSut({
            platformService: MOCK_BROWSER_PLATFORM_SERVICE,
          })
          component.line = DUMMY_LINE
          component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
          fixture.detectChanges()
        })

        it('should display list', () => {
          const listElement = fixture.debugElement.query(LIST_ELEMENT_PREDICATE)
          expectIsDisplayed(listElement.nativeElement)
        })

        it('should be collapsed by default', () => {
          expect(component.isExpanded).toBeFalse()
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
          component.line = DUMMY_LINE
          component.isCollapsibleFn = ALWAYS_COLLAPSIBLE
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

        it('should be expanded by default', () => {
          expect(component.isExpanded).toBeTrue()
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
