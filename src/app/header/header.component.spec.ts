import { ComponentFixture } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents } from 'ng-mocks'
import { ToolbarComponent } from '@/common/toolbar/toolbar.component'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'
import { ToolbarDividerComponent } from '@/common/toolbar-divider/toolbar-divider.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

const makeSut = () =>
  componentTestSetup(HeaderComponent, {
    imports: [
      HeaderComponent,
      MockComponents(
        NavigationTabsComponent,
        ToolbarComponent,
        LightDarkToggleComponent,
        ToolbarDividerComponent,
      ),
    ],
  })
