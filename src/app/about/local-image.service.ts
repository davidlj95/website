import { Injectable } from '@angular/core'
import { SlugGeneratorService } from '../common/slug-generator.service'

@Injectable({
  providedIn: 'root',
})
export class LocalImageService {
  public readonly ASSETS_PATH = 'assets'
  public readonly DEFAULT_EXTENSION = '.png'

  constructor(private slugGenerator: SlugGeneratorService) {}

  public getPath({
    name,
    subdirectory,
  }: {
    name: string
    subdirectory?: string
  }): string {
    const pathElements = [
      this.ASSETS_PATH,
      subdirectory,
      `${this.slugGenerator.generate(name)}${this.DEFAULT_EXTENSION}`,
    ].filter((pathElement) => !!pathElement)
    return pathElements.join('/')
  }
}
