import { ComponentFixture } from '@angular/core/testing'

import { TabsComponent } from './tabs.component'
import { shouldProjectContent } from '@/test/helpers/component-testers'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('TabsComponent', () => {
  let component: TabsComponent
  let fixture: ComponentFixture<TabsComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(TabsComponent)

  it('should have tab list ARIA role', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    expect(fixture.debugElement.attributes['role']).toEqual('tablist')
  })
})

const makeSut = () => componentTestSetup(TabsComponent)
