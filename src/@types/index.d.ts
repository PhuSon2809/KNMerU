export * from './user'
export * from './gift'
export * from './question'
export * from './character'

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

  interface ApiResponse<T> {
    status: number
    errorMessageCode: string | null
    data: T
  }
}
