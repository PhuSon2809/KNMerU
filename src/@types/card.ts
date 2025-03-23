export interface Card {
  id: number
  title: string
  description: string
  imageUrl: string
  cardId: number
  cardName: string
  cardDescription: string
  cardImageUrl: string
  isUsed: boolean
  routeId: number | null
  routeTitle: string | null
}
