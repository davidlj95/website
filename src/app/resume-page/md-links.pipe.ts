import { inject, Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'mdLinks',
})
export class MdLinksPipe implements PipeTransform {
  private readonly _sanitizer = inject(DomSanitizer)

  transform(text: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(
      text.replaceAll(/\[(.*?)]\((.*?)\)/g, '<a href="$2">$1</a>'),
    )
  }
}
