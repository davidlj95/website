import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  APP_BASE_URL_PRODUCTION,
  RELATIVIZE_PRODUCTION_URL,
} from '@/common/relativize-production-url'
import { MockProvider } from 'ng-mocks'
import { APP_BASE_HREF } from '@angular/common'

describe('RelativizeProductionUrl', () => {
  const APP_BASE_URL_PRODUCTION = 'https://example.com'
  const RELATIVE_IMAGE_PATH = 'assets/foo.png'
  const expectedImagePath = `/${RELATIVE_IMAGE_PATH}`

  describe('when production base URL and base href match', () => {
    describe('when base href is not defined', () => {
      it('should return image URL given without base URL', () => {
        const sut = makeSut({ APP_BASE_URL_PRODUCTION })

        expect(
          sut(new URL(`${APP_BASE_URL_PRODUCTION}/${RELATIVE_IMAGE_PATH}`)),
        ).toEqual(expectedImagePath)
      })
    })

    describe('when base href is defined', () => {
      const testCases = [
        {
          APP_BASE_HREF: '/my/app/',
          imageUrl: `${APP_BASE_URL_PRODUCTION}/my/app/${RELATIVE_IMAGE_PATH}`,
        },
        {
          APP_BASE_HREF: '',
          imageUrl: `${APP_BASE_URL_PRODUCTION}/${RELATIVE_IMAGE_PATH}`,
        },
        {
          APP_BASE_HREF: '/',
          imageUrl: `${APP_BASE_URL_PRODUCTION}/${RELATIVE_IMAGE_PATH}`,
        },
      ]
      for (const testCase of testCases) {
        describe(`and set to '${testCase.APP_BASE_HREF}'`, () => {
          it('should return image URL without base URL and base href', () => {
            const sut = makeSut({
              APP_BASE_URL_PRODUCTION,
              APP_BASE_HREF: testCase.APP_BASE_HREF,
            })

            expect(sut(new URL(testCase.imageUrl))).toEqual(expectedImagePath)
          })
        })
      }
    })
  })

  describe('when production base URL does not match', () => {
    it('should throw an error', () => {
      const sut = makeSut({
        APP_BASE_URL_PRODUCTION: 'https://another.example.com',
      })

      expect(() =>
        sut(new URL(`${APP_BASE_URL_PRODUCTION}/${RELATIVE_IMAGE_PATH}`)),
      ).toThrowError(/base URL/)
    })
  })

  describe('when base href does not match', () => {
    it('should throw an error', () => {
      const sut = makeSut({
        APP_BASE_URL_PRODUCTION,
        APP_BASE_HREF: '/my/app/',
      })

      expect(() =>
        sut(new URL(`${APP_BASE_URL_PRODUCTION}/${RELATIVE_IMAGE_PATH}`)),
      ).toThrowError(/base href/)
    })
  })
})

const makeSut = (
  opts: { APP_BASE_URL_PRODUCTION?: string; APP_BASE_HREF?: string } = {},
) =>
  serviceTestSetup(RELATIVIZE_PRODUCTION_URL, {
    providers: [
      opts.APP_BASE_URL_PRODUCTION
        ? MockProvider(
            APP_BASE_URL_PRODUCTION,
            new URL(opts.APP_BASE_URL_PRODUCTION),
          )
        : [],
      opts.APP_BASE_HREF ? MockProvider(APP_BASE_HREF, opts.APP_BASE_HREF) : [],
    ],
  })
