import { TabsComponent } from './tabs.component'
import { TabComponent } from '../tab/tab.component'
import { MountResponse } from 'cypress/angular'
import { By } from '@angular/platform-browser'

describe('TabsComponent', () => {
  it('should mount', () => {
    cy.mount(TabsComponent)
  })

  const PREV_BUTTON_SELECTOR = 'button[aria-label*="Previous"]'
  const NEXT_BUTTON_SELECTOR = 'button[aria-label*="Next"]'
  const TABS_CONTAINER_SELECTOR = '[role="tablist"]'
  describe('when all tabs fit the screen', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
      cy.mount('<app-tabs><app-tab>Hello World</app-tab></app-tabs>', {
        imports: [TabsComponent, TabComponent],
      })
    })

    it('should disable previous paginator', () => {
      cy.get(PREV_BUTTON_SELECTOR).should('be.disabled')
    })

    it('should disable next paginator', () => {
      cy.get(NEXT_BUTTON_SELECTOR).should('be.disabled')
    })
  })

  describe('when all tabs do not fit the screen', () => {
    const TABS = [...Array(11).keys()]
    beforeEach(() => {
      cy.viewport('iphone-x')
      cy.mount(
        `
        <app-tabs [style.max-width.%]="100">
        @for(tab of ${JSON.stringify(TABS)}; track $index) {
            <app-tab>
                <span style="white-space: nowrap">Tab {{ tab }}</span>
            </app-tab>
        }
        </app-tabs>`,
        {
          imports: [TabsComponent, TabComponent],
        },
      ).then((wrapper) => {
        // noinspection CYUnusedAlias (used below)
        cy.wrap(wrapper).as('angular')
      })
    })

    describe('initially', () => {
      beforeEach(() => {
        cy.get(TABS_CONTAINER_SELECTOR).should(($element) => {
          expect($element).to.have.length(1)
          expect($element[0].scrollLeft).to.equal(
            0,
            'tabs container should not be scrolled',
          )
        })
      })
      it('should disable previous paginator', () => {
        cy.get(PREV_BUTTON_SELECTOR).should('be.disabled')
      })

      it('should enable next paginator', () => {
        cy.get(NEXT_BUTTON_SELECTOR).should('be.enabled')
      })

      describe('when tapping next paginator', () => {
        beforeEach(() => {
          cy.get(NEXT_BUTTON_SELECTOR).click()
        })

        it('should scroll a bit to see next tabs', () => {
          cy.get(TABS_CONTAINER_SELECTOR).should(($element) => {
            expect($element).to.have.length(1)
            const element = $element[0]
            expect(element.scrollLeft).to.be.greaterThan(
              minimumScrollPxDistance(element),
            )
          })
        })
      })
    })

    const MIDDLE_TAB_INDEX = Math.ceil(TABS.length / 2)
    const MIDDLE_TAB_SELECTOR = `app-tab:nth-child(${MIDDLE_TAB_INDEX})`
    describe('when scrolled in the middle', () => {
      beforeEach(() => {
        cy.get(MIDDLE_TAB_SELECTOR).scrollIntoView()
      })

      it('should enable previous paginator', () => {
        cy.get(PREV_BUTTON_SELECTOR).should('be.enabled')
      })

      it('should enable next paginator', () => {
        cy.get(NEXT_BUTTON_SELECTOR).should('be.enabled')
      })
    })

    describe('when scrolled until the end', () => {
      const maxScrollLeft = (element: HTMLElement) => {
        return element.scrollWidth - element.offsetWidth
      }

      beforeEach(() => {
        cy.get('app-tab:last-child').scrollIntoView()
      })

      beforeEach(() => {
        cy.get(TABS_CONTAINER_SELECTOR).should(($element) => {
          expect($element).to.have.length(1)
          const element = $element[0]
          expect(element.scrollLeft).to.equal(
            maxScrollLeft(element),
            'tabs container should be scrolled until the end',
          )
        })
      })

      it('should enable previous paginator', () => {
        cy.get(PREV_BUTTON_SELECTOR).should('be.enabled')
      })

      it('should disable next paginator', () => {
        cy.get(NEXT_BUTTON_SELECTOR).should('be.disabled')
      })

      describe('when tapping previous paginator', () => {
        beforeEach(() => {
          cy.get(PREV_BUTTON_SELECTOR).should('be.enabled')
          //👇 Why click needs to be forced? No idea 🙃
          cy.get(PREV_BUTTON_SELECTOR).click({ force: true })
        })

        it('should scroll a bit to see previous tabs', () => {
          cy.get(TABS_CONTAINER_SELECTOR).should(($element) => {
            expect($element).to.have.length(1)
            const element = $element[0]
            expect(element.scrollLeft).to.be.lessThan(
              maxScrollLeft(element) - minimumScrollPxDistance(element),
            )
          })
        })
      })
    })

    describe('when marking a tab as active', () => {
      beforeEach(() => {
        // noinspection CYUnresolvedAlias
        cy.get<MountResponse<unknown>>('@angular').then((angular) => {
          const tabsElement = angular.fixture.debugElement.query(
            By.css('app-tabs'),
          )
          const tabsComponent = tabsElement.componentInstance as TabsComponent
          tabsComponent.selectedIndex = MIDDLE_TAB_INDEX - 1
        })
      })

      it('should scroll to the active tab', () => {
        cy.get(MIDDLE_TAB_SELECTOR).should('be.visible')
      })
    })
  })
})

//👇 Otherwise if it's bigger, it times out in the last test about scrolling to see previous tabs
//   due to 'smooth' scrolling. Actual implementation is 1/3
const minimumScrollPxDistance = (element: HTMLElement) =>
  element.offsetWidth / 20
