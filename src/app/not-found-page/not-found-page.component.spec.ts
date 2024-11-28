import { ComponentFixture } from '@angular/core/testing'

import {
  NotFoundPageComponent,
  WAYBACK_MACHINE_URL_PREFIX,
} from './not-found-page.component'
import { Router } from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { APP_BASE_URL } from '@/common/app-base-url'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { byTestId } from '@/test/helpers/test-id'

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent
  let fixture: ComponentFixture<NotFoundPageComponent>
  const DUMMY_APP_URL = 'https://example.com'
  const DUMMY_ROUTER: Pick<Router, 'url'> = {
    url: '/foo',
  }

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(NotFoundPageComponent, {
      providers: [
        MockProvider(APP_BASE_URL, new URL(DUMMY_APP_URL)),
        MockProvider(Router, DUMMY_ROUTER),
      ],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain a link to the Wayback Machine URL of the current page', () => {
    const anchorElement = fixture.debugElement.query(byTestId('wayback'))

    expect(anchorElement.attributes['href']).toEqual(
      new URL(
        WAYBACK_MACHINE_URL_PREFIX.toString() +
          DUMMY_APP_URL +
          DUMMY_ROUTER.url,
      ).toString(),
    )
  })
})
