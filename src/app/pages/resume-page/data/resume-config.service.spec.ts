import { firstValueFrom } from 'rxjs'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { RESUME_CONFIG_SERVICE } from './resume-config.service'

describe('ResumeConfigService', () => {
  it('should not be compact by default', async () => {
    const sut = makeSut()

    expect(await firstValueFrom(sut.compact$)).toBe(false)
  })

  it('should update compact config when given', async () => {
    const sut = makeSut()
    sut.setCompact(true)

    expect(await firstValueFrom(sut.compact$)).toBe(true)
  })
})

const makeSut = () => serviceTestSetup(RESUME_CONFIG_SERVICE)
