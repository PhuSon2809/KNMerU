import { Gift } from './gift'

declare global {
  type Color = 'pink' | 'orange' | 'blue' | 'green' | 'yellow'
  interface Social {
    id: number
    icon: string
    variant: Color
  }

  interface Information {
    id: number
    title: string
    desc: string[]
    variant: Color
  }

  interface SelectedFile {
    name: string
    url: string
    file: File
  }
}

export { Gift }
