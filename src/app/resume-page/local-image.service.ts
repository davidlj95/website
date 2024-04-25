import { Injectable } from '@angular/core'
import { SlugGeneratorService } from '@/common/slug-generator.service'
import { ASSETS_PATH } from '@/common/assets-dir'

@Injectable({
  providedIn: 'root',
})
export class LocalImageService {
  public readonly DEFAULT_EXTENSION = '.png'

  constructor(private slugGenerator: SlugGeneratorService) {}

  public generatePath({
    name,
    subdirectory,
  }: {
    name: string
    subdirectory?: string
  }): string {
    const pathElements = [
      ASSETS_PATH,
      subdirectory,
      `${this.slugGenerator.generate(name)}${this.DEFAULT_EXTENSION}`,
    ].filter((pathElement) => !!pathElement)
    return pathElements.join('/')
  }
}
