import { PlatformService } from '../../app/common/platform.service'

function makeMockPlatformService({
  isBrowser,
}: {
  isBrowser: boolean
}): PlatformService {
  return {
    isBrowser,
    isServer: !isBrowser,
  }
}

export const MOCK_SERVER_PLATFORM_SERVICE = makeMockPlatformService({
  isBrowser: false,
})

export const MOCK_BROWSER_PLATFORM_SERVICE = makeMockPlatformService({
  isBrowser: true,
})
