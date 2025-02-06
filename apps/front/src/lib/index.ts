// place files you want to import through the `$lib` alias in this folder.
const backgrounds: Record<string, string> = import.meta.glob('$lib/assets/backgrounds/*.png', {
  eager: true, query: '?url', import: 'default'
})
const bosses: Record<string, string> = import.meta.glob('$lib/assets/bosses/*.png', {
  eager: true, query: '?url', import: 'default'
})
const characters: Record<string, string> = import.meta.glob('$lib/assets/characters/*.png', {
  eager: true, query: '?url', import: 'default'
})

const bgms: Record<string, string> = import.meta.glob('$lib/assets/bgm/*.m4a', { eager: true, query: '?url', import: 'default' })
const bgas: Record<string, string> = import.meta.glob('$lib/assets/bga/*.m4a', { eager: true, query: '?url', import: 'default' })

export class Assets {
  static getBackground(path: string): string {
    return backgrounds[`/src/lib/${path}`]
  }
  static getBgm(path: string): string {
    return bgms[`/src/lib/${path}`]
  }
  static getBga(path: string): string {
    return bgas[`/src/lib/${path}`]
  }
  static getBoss(path: string): string {
    return bosses[`/src/lib/${path}`]
  }
  static getCharacter(path: string): string {
    return characters[`/src/lib/${path}`]
  }
}