export interface UserInfor {
  id: string
  username: string
  fullName: string
  email: string
  phoneNumber: string
  imageUrl: string
  characterId: number | null
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
  password: string
}

export interface LoginRes {
  token: string
  durationInHours: number
}

export interface LoginSocialInput {
  idToken: string
  provider: number
}
