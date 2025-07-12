import { TabsComponent } from './tabs.component'
import { TabComponent } from '../tab/tab.component'
import { MountResponse } from 'cypress/angular'
import { Component, input } from '@angular/core'
import { setFixtureInputs } from '@/test/helpers/set-fixture-inputs'

describe('TabsComponent', () => {
  it('should mount', () => {
    cy.mount(TabsComponent)
  })

  const PREV_BUTTON_SELECTOR = 'button[aria-label*="Previous"]'
  const NEXT_BUTTON_SELECTOR = 'button[aria-label*="Next"]'
  const TABS_CONTAINER_SELECTOR = '[role="tablist"]'
  describe('when all tabs fit the screen', () => {
    //👇 Explicit component declaration for Cypress to support v19
    @Component({
      template: '<app-tabs><a appTab>Hello World</a></app-tabs>',
      imports: [TabsComponent, TabComponent],
    })
    class HostComponent {}

    beforeEach(() => {
      cy.viewport('macbook-16')
      cy.mount(HostComponent)
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
    //👇 Explicit component declaration for Cypress to support v19
    @Component({
      template: ` <app-tabs
        [style.max-width.%]="100"
        [selectedIndex]="selectedIndex()"
      >
        @for (tab of tabs; track $index) {
          <a appTab style="white-space: nowrap"> Tab {{ tab }} </a>
        }
      </app-tabs>`,
      imports: [TabsComponent, TabComponent],
    })
    class HostComponent {
      tabs = TABS
      readonly selectedIndex = input<number>()
    }

    beforeEach(() => {
      cy.viewport('iphone-x')
      cy.mount(HostComponent).then((wrapper) => {
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
    const MIDDLE_TAB_SELECTOR = `[appTab]:nth-child(${MIDDLE_TAB_INDEX})`
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
        cy.get('[appTab]:last-child').scrollIntoView()
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
          cy.get(PREV_BUTTON_SELECTOR).click()
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
        cy.get<MountResponse<HostComponent>>('@angular').then((angular) => {
          setFixtureInputs(angular.fixture, {
            selectedIndex: MIDDLE_TAB_INDEX - 1,
          })
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
