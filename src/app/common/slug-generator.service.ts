import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SlugGeneratorService {
  constructor() {}

  /**
   * Generates slugs based on texts. Useful to generate file names, HTML element IDs, ...
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id  * Generate a
   *
   * @param text to generate slug from
   * @param prefix to prepend to generated slug. Useful to scope HTML element ids.
   * @param firstCharIsALetter remove every character until first character of the resulting slug is a letter.
   *                           Recommended when generating ids for HTML elements
   */
  generate(
    text: string,
    {
      prefix,
      firstCharIsALetter,
    }: { prefix?: string; firstCharIsALetter?: boolean } = {},
  ) {
    // https://gist.github.com/djabif/b8d21c4ebcef51db7a4a28ecf3d41846
    const slug = text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      // Replace characters with accents / diacritics with alphabetic chars
      // https://stackoverflow.com/a/37511463/3263250
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text

    const prefixedSlug = (prefix ?? '') + slug
    if (firstCharIsALetter) {
      return prefixedSlug.replace(/^[^A-Za-z]+/, '') // Remove anything that's not a letter at start
    }
    return prefixedSlug
  }
}
