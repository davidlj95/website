import {
  SCROLL_INTO_VIEW,
  SCROLL_INTO_VIEW_FACTORY,
} from '@/common/scroll-into-view'
import { MockProvider } from 'ng-mocks'
import { PLATFORM_SERVICE, PlatformService } from '@/common/platform.service'
import {
  MOCK_BROWSER_PLATFORM_SERVICE,
  MOCK_NON_BROWSER_PLATFORM_SERVICE,
} from '@/test/helpers/platform-service'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'

describe('ScrollIntoView', () => {
  describe('when on browser', () => {
    const DEFAULT_ARGS: ScrollIntoViewOptions = { block: 'nearest' }
    it('should call scroll into view function with default args', () => {
      const sut = makeSut({ platformService: MOCK_BROWSER_PLATFORM_SERVICE })
      const dummyElement = jasmine.createSpyObj<HTMLElement>(['scrollIntoView'])

      sut(dummyElement)

      expect(dummyElement.scrollIntoView).toHaveBeenCalledOnceWith(DEFAULT_ARGS)
    })
  })

  describe('when on server', () => {
    it('should do nothing', () => {
      const sut = makeSut({
        platformService: MOCK_NON_BROWSER_PLATFORM_SERVICE,
      })
      const dummyElement = jasmine.createSpyObj<HTMLElement>(['scrollIntoView'])

      sut(dummyElement)

      expect(dummyElement.scrollIntoView).not.toHaveBeenCalled()
    })
  })
})

function makeSut(opts: { platformService: PlatformService }) {
  return serviceTestSetup(SCROLL_INTO_VIEW, {
    providers: [
      MockProvider(PLATFORM_SERVICE, opts.platformService),
      MockProvider(SCROLL_INTO_VIEW, SCROLL_INTO_VIEW_FACTORY, 'useFactory'),
    ],
  })
}
