import { mount } from 'cypress/angular'
import { TabsComponent } from './tabs.component'
import { TabComponent } from '../tab/tab.component'

describe('TabsComponent', () => {
  it('should mount', () => {
    mount(TabsComponent)
  })

  describe('when all tabs fit the screen', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
      mount('<app-tabs><app-tab>Hello World</app-tab></app-tabs>', {
        imports: [TabsComponent, TabComponent],
      })
    })

    it('should disable previous paginator', () => {
      cy.get('button[aria-label*="Previous"]').should('be.disabled')
    })

    it('should disable next paginator', () => {
      cy.get('button[aria-label*="Next"]').should('be.disabled')
    })
  })
})
