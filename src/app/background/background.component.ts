import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true,
})
export class BackgroundComponent {
  protected readonly _genesisBlockLines = hexdump(
    atob(GENESIS_BLOCK_BASE_64),
  ).split('\n')
  //👇 Could be calculated on the client side.
  //   However, this component is part of the largest contentful paint (LCP)
  //   So calculating it in advance. This way, there are no changes when hydrating
  protected readonly _textSize = { width: 768, height: 288 }
}

/**
 * Source: https://gist.github.com/igorgatis/d294fe714a4f523ac3a3
 *
 * Adapted for TypeScript. With a few tweaks to mock `hexdump -C` output:
 *  - Fixed block size of 16
 *  - Address takes 8 chars
 *  - Extra space every 8 code blocks
 *  - Add '|' to chars block
 *  - Do not print \x7F - \x9F chars (most can't be seen properly)
 */
const hexdump = (buffer: string) => {
  const blockSize = 16
  const lines: string[] = []
  const hex = '0123456789ABCDEF'
  const SPACE = ' '
  for (let b = 0; b < buffer.length; b += blockSize) {
    const block = buffer.slice(b, Math.min(b + blockSize, buffer.length))
    const addrSize = 8
    const addr = ('0'.repeat(addrSize) + b.toString(16)).slice(-addrSize)
    const codes =
      block
        .split('')
        .map((ch, index) => {
          const code = ch.charCodeAt(0)
          const spaces = index % 8 === 0 ? 2 : 1
          return (
            SPACE.repeat(spaces) + hex[(0xf0 & code) >> 4] + hex[0x0f & code]
          )
        })
        .join('') + SPACE.repeat(3).repeat(blockSize - block.length)
    const chars =
      block.replace(
        // eslint-disable-next-line no-control-regex
        /[\x00-\x1F\x20\x7F-\x9F]/g,
        '.',
      ) + SPACE.repeat(blockSize - block.length)
    lines.push(addr + codes + '  |' + chars + '|' + '  ')
  }
  return lines.join('\n')
}
//👇 Can be quickly obtained by
// curl 'https://blockstream.info/api/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f/raw' | base64
// noinspection SpellCheckingInspection
const GENESIS_BLOCK_BASE_64 =
  'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO6Pt/Xp7ErJ6xyw+Z3aPYX/IG8OIilEyOp+4qkseXkopq19J//8AHR2sK3wBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////9NBP//AB0BBEVUaGUgVGltZXMgMDMvSmFuLzIwMDkgQ2hhbmNlbGxvciBvbiBicmluayBvZiBzZWNvbmQgYmFpbG91dCBmb3IgYmFua3P/////AQDyBSoBAAAAQ0EEZ4r9sP5VSCcZZ/GmcTC3EFzWqCjgOQmmeWLg6h9h3rZJ9rw/TO84xPNVBOUewRLeXDhN97oLjVeKTHAra/EdX6wAAAAA'
