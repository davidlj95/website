import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  NotFoundPageComponent,
  WAYBACK_MACHINE_URL_PREFIX,
} from './not-found-page.component'
import { Environment } from '../../environments'
import { Router } from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '@common/injection-tokens'

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent
  let fixture: ComponentFixture<NotFoundPageComponent>
  const fakeEnvUrlNoTrailingSlash: string = 'https://example.com'
  const fakeEnv: Pick<Environment, 'canonicalUrl'> = {
    canonicalUrl: new URL(fakeEnvUrlNoTrailingSlash),
  }
  const fakeRouter: Pick<Router, 'url'> = {
    url: '/foo',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(ENVIRONMENT, fakeEnv),
        MockProvider(Router, fakeRouter),
      ],
    })
    fixture = TestBed.createComponent(NotFoundPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#currentUrlInWaybackMachine', () => {
    it('should be the Wayback Machine URL prefix plus the current URL', () => {
      expect(component.currentUrlInWaybackMachine).toEqual(
        new URL(
          WAYBACK_MACHINE_URL_PREFIX.toString() +
            fakeEnvUrlNoTrailingSlash +
            fakeRouter.url,
        ),
      )
    })
  })
})
