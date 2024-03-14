import { DebugElement, PLATFORM_ID } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { MockProvider } from 'ng-mocks'
import { MATERIAL_SYMBOLS_SELECTOR } from '@test/helpers/material-symbols'
import {
  PLATFORM_BROWSER_ID,
  PLATFORM_SERVER_ID,
} from '@test/helpers/platform-ids'
import { expectIsHidden, expectIsVisible } from '@test/helpers/visibility'
import { DescriptionLine, DescriptionLineData } from '../../../metadata'

import {
  COLLAPSIBLE_CONFIG,
  CollapsibleConfiguration,
  ProfileDescriptionComponent,
} from './profile-description.component'
import { byComponent } from '@test/helpers/component-query-predicates'
import { getReflectedAttribute } from '@test/helpers/get-reflected-attribute'

describe('DescriptionComponent', () => {
  let component: ProfileDescriptionComponent
  let fixture: ComponentFixture<ProfileDescriptionComponent>
  const DATA_CLASS_SELECTOR = By.css('.data')
  const LIST_SELECTOR = By.css('ul')
  const CARET_SELECTOR = By.css('.caret')

  it('should create', () => {
    ;[fixture, component] = setup()
    expect(component).toBeTruthy()
  })

  function testShouldDisplaySymbolAndHtmlContent(fakeLine: DescriptionLine) {
    it('should display the symbol and html content', () => {
      const lineElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)

      const materialSymbolSpan = lineElement.query(MATERIAL_SYMBOLS_SELECTOR)
      expect(materialSymbolSpan.nativeElement.textContent)
        .withContext('symbol')
        .toEqual(fakeLine.data!.symbol)
      expect(materialSymbolSpan.attributes['aria-hidden'])
        .withContext('symbol is hidden from screen readers')
        .toBe(true.toString())

      const htmlSpan = lineElement.query(By.css('.content'))
      expect(htmlSpan.nativeElement.innerHTML)
        .withContext('html')
        .toEqual(fakeLine.data!.html)
    })
  }

  describe('data', () => {
    beforeEach(() => {
      ;[fixture, component] = setup()
    })

    describe('when line does not have data', () => {
      beforeEach(() => {
        component.line = new DescriptionLine(undefined)
        fixture.detectChanges()
      })
      it('should not add the data element', () => {
        expect(fixture.debugElement.query(DATA_CLASS_SELECTOR)).toBeNull()
      })
    })
    describe('when line has data', () => {
      const fakeLine: DescriptionLine = DescriptionLine.fromData({
        symbol: 'foo',
        text: 'Fake text',
        html: 'Fake html',
      })
      beforeEach(() => {
        component.line = fakeLine
        fixture.detectChanges()
      })
      testShouldDisplaySymbolAndHtmlContent(fakeLine)
    })
  })

  describe('children', () => {
    beforeEach(() => {
      ;[fixture, component] = setup()
    })

    describe('when does not have children', () => {
      const fakeLine: DescriptionLine = new DescriptionLine(undefined, [])

      beforeEach(() => {
        component.line = fakeLine
        fixture.detectChanges()
      })

      it('should not include the list element', () => {
        expect(fixture.debugElement.query(LIST_SELECTOR)).toBeNull()
      })
    })
    describe('when has children', () => {
      const fakeLineWithChildren: DescriptionLine = new DescriptionLine(
        undefined,
        [
          DescriptionLine.fromData({ symbol: '', html: 'Child line 1' }),
          DescriptionLine.fromData({ symbol: '', html: 'Child line 2' }),
          DescriptionLine.fromData({ symbol: '', html: 'Child line 3' }),
        ],
      )
      const fakeDepth = 2

      beforeEach(() => {
        component.line = fakeLineWithChildren
        component.depth = fakeDepth
        fixture.detectChanges()
      })

      it('should include the list element with all children lines', () => {
        const listElement = fixture.debugElement.query(LIST_SELECTOR)
        expect(listElement).toBeTruthy()

        const childrenElements = listElement.queryAll(By.css('li'))
        expect(childrenElements.length).toBe(
          fakeLineWithChildren.children.length,
        )

        childrenElements.forEach((childElement, index) => {
          // Contains line element
          const childLineElement = childElement.query(
            byComponent(ProfileDescriptionComponent),
          )
          expect(childLineElement)
            .withContext(`child ${index} line element`)
            .toBeTruthy()

          // Line passed is the child one
          expect(childLineElement.nativeElement.textContent)
            .withContext(`child ${index} line`)
            .toContain(fakeLineWithChildren.children[index].data!.html)

          // Depth is increased by one
          expect(getReflectedAttribute(childLineElement, 'depth'))
            .withContext(`child ${index} depth`)
            .toBe((fakeDepth + 1).toString())
        })
      })
    })
  })

  function testShouldNotDisplayCollapsibleControls() {
    it('should not display collapsible controls', () => {
      const lineElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)
      expect(lineElement).toBeTruthy()
      expect(lineElement.name).not.toBe('button')

      const caretElement = lineElement.query(CARET_SELECTOR)
      expect(caretElement).toBeNull()
    })
  }

  describe('collapsible', () => {
    describe('when line has no children', () => {
      const fakeLine: DescriptionLine = DescriptionLine.fromData({
        symbol: 'foo',
        text: 'Fake text',
        html: 'Fake html',
      })
      beforeEach(() => {
        ;[fixture, component] = setup()
        component.line = fakeLine
        fixture.detectChanges()
      })
      testShouldNotDisplayCollapsibleControls()
      testShouldDisplaySymbolAndHtmlContent(fakeLine)
    })
    describe('when line has children', () => {
      const fakeLine: DescriptionLine = DescriptionLine.fromData(
        {
          symbol: 'foo',
          text: 'Fake text',
          html: 'Fake html',
        },
        [new DescriptionLine()],
      )

      describe('when depth is below configured depth to start a collapsible', () => {
        beforeEach(() => {
          ;[fixture, component] = setup()
          component.depth = fakeConfig.collapsibleStartAtDepth - 1
          component.line = fakeLine
          fixture.detectChanges()
        })
        testShouldNotDisplayCollapsibleControls()
        testShouldDisplaySymbolAndHtmlContent(fakeLine)
        it('should not add id to list', () => {
          const listElement = fixture.debugElement.query(LIST_SELECTOR)
          expect(Object.keys(listElement.attributes)).not.toContain('id')
        })
      })
      describe('when depth is set to configured depth to start a collapsible', () => {
        function configureToBeCollapsible(
          component: ProfileDescriptionComponent,
          line?: DescriptionLine,
        ) {
          component.depth = fakeConfig.collapsibleStartAtDepth
          component.line = line ?? fakeLine
        }

        describe('data', () => {
          let dataElement: DebugElement
          let caretElement: DebugElement

          beforeEach(() => {
            ;[fixture, component] = setup()
            configureToBeCollapsible(component)

            fixture.detectChanges()

            dataElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)
            caretElement = dataElement.query(CARET_SELECTOR)
          })
          it('should display collapsible controls', () => {
            expect(dataElement).toBeTruthy()
            expect(dataElement.name).toBe('button')
            expect(Object.keys(dataElement.attributes)).toContain(
              'aria-expanded',
            )

            expect(caretElement).toBeTruthy()
            expect(caretElement.attributes['aria-hidden'])
              .withContext('caret is hidden from screen readers')
              .toBe(true.toString())
          })
          testShouldDisplaySymbolAndHtmlContent(fakeLine)
          it('should add slug id to list', () => {
            const listElement = fixture.debugElement.query(LIST_SELECTOR)
            expect(Object.keys(listElement.attributes)).toContain('id')

            const expectedId = `${fakeConfig.listIdPrefix}fake-text`
            expect(listElement.attributes['id']).toBe(expectedId)
          })
        })
        describe('expand / collapse', () => {
          let dataElement: DebugElement
          let caretElement: DebugElement
          let listElement: DebugElement

          function testChildListShouldBeExpanded() {
            it('child list should be expanded', () => {
              expectIsVisible(listElement.nativeElement)
            })
          }

          function testButtonShouldIndicateItsExpandedAndShowCollapseIcon() {
            it('button should indicate it is expanded and show collapse icon', () => {
              expect(dataElement).toBeTruthy()
              expect(dataElement.attributes['aria-expanded']).toBe(
                true.toString(),
              )

              expect(caretElement.nativeElement.textContent).toBe(
                fakeConfig.expandedIcon,
              )
            })
          }

          function testButtonShouldIndicateItsCollapsedAndShowExpandIcon() {
            it('button should indicate it is collapsed and show expand icon', () => {
              expect(dataElement).toBeTruthy()
              expect(dataElement.attributes['aria-expanded']).toBe(
                false.toString(),
              )

              expect(caretElement.nativeElement.textContent).toBe(
                fakeConfig.collapsedIcon,
              )
            })
          }

          function testShouldBeCollapsed() {
            it('child list should be collapsed', () => {
              expectIsHidden(listElement.nativeElement)
            })
          }

          describe('when rendering on server', () => {
            beforeEach(() => {
              ;[fixture, component] = setup({
                platformId: PLATFORM_SERVER_ID,
              })
              configureToBeCollapsible(component)

              fixture.detectChanges()

              dataElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)
              caretElement = dataElement.query(CARET_SELECTOR)
              listElement = fixture.debugElement.query(LIST_SELECTOR)
            })
            testChildListShouldBeExpanded()

            // to avoid layout shifts
            it('should be hidden', () => {
              expectIsHidden(fixture.debugElement.nativeElement)
            })
          })

          describe('when rendering on client', () => {
            beforeEach(() => {
              ;[fixture, component] = setup()
              configureToBeCollapsible(component)

              fixture.detectChanges()

              dataElement = fixture.debugElement.query(DATA_CLASS_SELECTOR)
              caretElement = dataElement.query(CARET_SELECTOR)
              listElement = fixture.debugElement.query(LIST_SELECTOR)
            })
            describe('by default', () => {
              testShouldBeCollapsed()
              testButtonShouldIndicateItsCollapsedAndShowExpandIcon()
              it('should make the component visible', () => {
                expectIsVisible(fixture.debugElement.nativeElement)
              })
            })
            describe('when clicking', () => {
              beforeEach(fakeAsync(() => {
                dataElement.triggerEventHandler('click')

                tick() // animation to complete

                fixture.detectChanges()
              }))
              testButtonShouldIndicateItsExpandedAndShowCollapseIcon()
              testChildListShouldBeExpanded()
            })
            describe('when clicking twice', () => {
              beforeEach(fakeAsync(() => {
                dataElement.triggerEventHandler('click')
                tick() // animation to complete
                fixture.detectChanges()

                dataElement.triggerEventHandler('click')
                tick() // animation to complete
                fixture.detectChanges()
              }))
              testButtonShouldIndicateItsCollapsedAndShowExpandIcon()
              testShouldBeCollapsed()
            })
          })

          describe('when expanding a child item', () => {
            const fakeLineWithManyChildren = new DescriptionLine(
              new DescriptionLineData({ symbol: '', html: 'Root' }),
              [
                new DescriptionLine(
                  new DescriptionLineData({ symbol: '', html: 'Child 1' }),
                  [new DescriptionLine()],
                ),
                new DescriptionLine(
                  new DescriptionLineData({ symbol: '', html: 'Child 2' }),
                  [new DescriptionLine()],
                ),
                new DescriptionLine(
                  new DescriptionLineData({ symbol: '', html: 'Child 3' }),
                  [new DescriptionLine()],
                ),
              ],
            )
            beforeEach(() => {
              ;[fixture, component] = setup()
              configureToBeCollapsible(component, fakeLineWithManyChildren)

              fixture.detectChanges()

              listElement = fixture.debugElement.query(LIST_SELECTOR)
            })
            it('should collapse sibling items', () => {
              const listItemElements = listElement.children
              expect(listItemElements.length).toBe(
                fakeLineWithManyChildren.children.length,
              )

              // Everything is collapsed
              listItemElements.forEach((listItemElement, index) => {
                const child = fakeLineWithManyChildren.children[index]
                const childDataElement =
                  listItemElement.query(DATA_CLASS_SELECTOR)
                expect(childDataElement.attributes['aria-expanded'])
                  .withContext(`item ${child.data?.text} is collapsed`)
                  .toBe(false.toString())
              })

              // Expand first item and ensure is expanded
              const firstListItemDataElement =
                listItemElements[0].query(DATA_CLASS_SELECTOR)
              firstListItemDataElement.triggerEventHandler('click')
              fixture.detectChanges()
              expect(firstListItemDataElement.attributes['aria-expanded'])
                .withContext('first item should now be expanded')
                .toBe(true.toString())

              // Expand second item
              const secondListItemDataElement =
                listItemElements[1].query(DATA_CLASS_SELECTOR)
              secondListItemDataElement.triggerEventHandler('click')
              fixture.detectChanges()
              expect(secondListItemDataElement.attributes['aria-expanded'])
                .withContext('second item should now be expanded')
                .toBe(true.toString())

              // Now first item should be collapsed
              expect(firstListItemDataElement.attributes['aria-expanded'])
                .withContext('first item should finally be magically collapsed')
                .toBe(false.toString())
            })
          })
        })
      })
    })
  })
})

function setup({
  platformId,
}: {
  platformId?: typeof PLATFORM_BROWSER_ID | typeof PLATFORM_SERVER_ID
} = {}): [
  ComponentFixture<ProfileDescriptionComponent>,
  ProfileDescriptionComponent,
] {
  TestBed.configureTestingModule({
    providers: [
      MockProvider(COLLAPSIBLE_CONFIG, fakeConfig),
      MockProvider(PLATFORM_ID, platformId ?? PLATFORM_BROWSER_ID),
      provideNoopAnimations(),
    ],
  })
  const fixture = TestBed.createComponent(ProfileDescriptionComponent)
  return [fixture, fixture.componentInstance]
}

const fakeConfig: CollapsibleConfiguration = {
  collapsibleStartAtDepth: 1,
  collapsedIcon: 'C -',
  expandedIcon: 'E -',
  listIdPrefix: 'fakePrefix-',
}
