declare global {
  type Color = 'pink' | 'orange' | 'blue' | 'green' | 'yellow'
  interface Information {
    id: number
    title: string
    desc: string[]
    vairiant: Color
  }
}

export {}
