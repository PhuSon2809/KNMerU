export interface Card {
  id: number
  title: string
  description: string
  imageUrl: string
  isUsed: boolean
  routeId: number | null
  routeTitle: string | null
}
