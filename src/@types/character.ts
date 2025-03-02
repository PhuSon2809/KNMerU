export interface Character {
  id: number
  name: string
  description: string
  imageUrl: string
}

export interface SelectCharacterInput {
  characterId: number
  characterName: string
}

export interface CharacterContent {
  name: string
  gender: string
  appearance: string
  character: string
}
