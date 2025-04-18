export * from './card'
export * from './character'
export * from './gift'
export * from './question'
export * from './route'
export * from './user'

declare global {
  type Color = 'pink' | 'orange' | 'blue' | 'green' | 'yellow'
  interface Social {
    id: number
    icon: string
    variant: Color
    link: string
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

  interface ClassLevelProgress {
    FirstGrade: number
    SecondGrade: number
    ThirdGrade: number
    FourthGrade: number
    FifthGrade: number
  }

  interface GeneralInfor {
    id: string
    streak: number
    isSelectedCharacter: boolean
    characterId: number
    characterName: string
    classLevel: number
    classLevelProgress: ClassLevelProgress
    isCheckedIn: boolean
    hasPromotedQuestion: boolean
    isOpenedFirstGift: boolean
    isOpenedSecondGift: boolean
    isSkippedClass: boolean
    retryDailyQuestion: number
    isDailyQuestionAnsweredCorrect: boolean
    referralCode: string | null
    totalReferral: number
    isAttendedEvent: boolean
  }
}
