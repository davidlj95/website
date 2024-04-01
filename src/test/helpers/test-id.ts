import { By } from '@angular/platform-browser'
import { TEST_ID_ATTRIBUTE } from '@/common/test-id.directive'

export function byTestId(testId: string) {
  return By.css(`[${TEST_ID_ATTRIBUTE}='${testId}']`)
}
