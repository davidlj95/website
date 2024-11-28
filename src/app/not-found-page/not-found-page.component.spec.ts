import { ComponentFixture } from '@angular/core/testing'

import {
  NotFoundPageComponent,
  WAYBACK_MACHINE_URL_PREFIX,
} from './not-found-page.component'
import { Router } from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { APP_BASE_URL } from '@/common/app-base-url'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent
  let fixture: ComponentFixture<NotFoundPageComponent>
  const dummyAppUrlNoTrailingSlash = 'https://example.com'
  const dummyRouter: Pick<Router, 'url'> = {
    url: '/foo',
  }

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(NotFoundPageComponent, {
      providers: [
        MockProvider(APP_BASE_URL, new URL(dummyAppUrlNoTrailingSlash)),
        MockProvider(Router, dummyRouter),
      ],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#currentUrlInWaybackMachine', () => {
    it('should be the Wayback Machine URL prefix plus the current URL', () => {
      expect(component._currentUrlInWaybackMachine).toEqual(
        new URL(
          WAYBACK_MACHINE_URL_PREFIX.toString() +
            dummyAppUrlNoTrailingSlash +
            dummyRouter.url,
        ),
      )
    })
  })
})
