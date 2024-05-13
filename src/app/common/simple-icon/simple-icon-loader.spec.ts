import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  SIMPLE_ICON_LOADER,
  SimpleIconLoader,
} from '@/common/simple-icon/simple-icon-loader'
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { PLATFORM_SERVICE, PlatformService } from '@/common/platform.service'
import { MockProvider } from 'ng-mocks'
import {
  MOCK_BROWSER_PLATFORM_SERVICE,
  MOCK_NON_BROWSER_PLATFORM_SERVICE,
} from '@/test/helpers/platform-service'
import { HttpStatusCode } from '@angular/common/http'
import { SVG } from '@/test/mocks/svg'

describe('SimpleIconLoader', () => {
  let sut: SimpleIconLoader

  const ICON_SLUG = 'dummy-icon'
  const ICON_SVG = SVG

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify()
  })

  describe('when not on browser', () => {
    it('should emit nothing, complete and not request anything', (done) => {
      sut = makeSut({
        platformService: MOCK_NON_BROWSER_PLATFORM_SERVICE,
      })

      let actualSvg: string | undefined
      sut(ICON_SLUG).subscribe({
        next: (svg) => (actualSvg = svg),
        complete: () => {
          expect(actualSvg).withContext('nothing is emitted').toBeUndefined()
          done()
        },
      })
      TestBed.inject(HttpTestingController).expectNone(
        getIconUrlBySlug(ICON_SLUG),
      )
    })
  })

  describe('when on browser', () => {
    beforeEach(() => {
      sut = makeSut()
    })

    it('should fetch the SVG file by slug and emit its response', (complete) => {
      sut(ICON_SLUG).subscribe({
        next: (actualSvg) => expect(actualSvg).toEqual(ICON_SVG),
        complete,
      })

      const testRequest = expectTestRequestToIcon(ICON_SLUG)
      expect(testRequest.request.method).toEqual('GET')

      testRequest.flush(ICON_SVG)
    })

    describe('when loading same icon for second time', () => {
      it('should load it from cache and not fetch it again', (done) => {
        sut(ICON_SLUG).subscribe()

        const testRequest = expectTestRequestToIcon(ICON_SLUG)
        testRequest.flush(ICON_SVG)

        let actualSvg: string | undefined
        sut(ICON_SLUG).subscribe({
          next: (svg) => (actualSvg = svg),
          complete: () => {
            expect(actualSvg).toEqual(ICON_SVG)
            done()
          },
        })
      })
    })

    // Can happen in PWA scenarios, where if static asset is not found, you get main index.html
    describe('when response content is not svg', () => {
      const flushWithTextHtmlContentType = (testRequest: TestRequest) =>
        testRequest.flush('<!DOCTYPE html>', {
          headers: { 'content-type': 'text/html; charset=utf-8' },
        })

      it('should complete without emitting', (done) => {
        let actualSvg: string | undefined
        sut(ICON_SLUG).subscribe({
          next: (svg) => (actualSvg = svg),
          complete: () => {
            expect(actualSvg).toBeUndefined()
            done()
          },
        })

        const testRequest = expectTestRequestToIcon(ICON_SLUG)
        flushWithTextHtmlContentType(testRequest)
      })
    })

    describe('when an error occurs', () => {
      const flushWithError = (testRequest: TestRequest) =>
        testRequest.flush('', {
          status: HttpStatusCode.NotFound,
          statusText: 'Not Found',
        })

      it('should complete without emitting', (done) => {
        let actualSvg: string | undefined
        sut(ICON_SLUG).subscribe({
          next: (svg) => (actualSvg = svg),
          complete: () => {
            expect(actualSvg).toBeUndefined()
            done()
          },
        })

        const testRequest = expectTestRequestToIcon(ICON_SLUG)
        flushWithError(testRequest)
      })
    })
  })
})

const makeSut = (opts: { platformService?: PlatformService } = {}) =>
  serviceTestSetup(SIMPLE_ICON_LOADER, {
    imports: [HttpClientTestingModule],
    providers: [
      MockProvider(
        PLATFORM_SERVICE,
        opts.platformService ?? MOCK_BROWSER_PLATFORM_SERVICE,
      ),
    ],
  })

const expectTestRequestToIcon = (slug: string) =>
  TestBed.inject(HttpTestingController).expectOne(getIconUrlBySlug(slug))

const getIconUrlBySlug = (slug: string) => `/assets/simple-icons/${slug}.svg`
