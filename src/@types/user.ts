export interface UserInfor {
  id: string
  username: string
  fullName: string
  email: string
  phoneNumber: string
  imageUrl: string
  characterId: string | null
  characterName: string | null
  characterOriginalName: string | null
  characterImageUrl: string | null
}

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
}

export interface LoginInput {
  email: string
  phoneNumber: string
}

export interface LoginSocialInput {
  idToken: string
  provider: number
}
