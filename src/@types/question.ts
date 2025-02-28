export enum EnumQuestionType {
  promoted = 1,
  skipped = 2,
  daily = 3
}

export interface Question {
  id: number
  choices: Choice[]
  answer: number
  content: string
  classLevel: number | null
  dailyQuestionDate: string
}

export interface Choice {
  option: number
  content: string
}

export interface Answer {
  questionId: number
  answer: number
}

export interface AnswerInput {
  answers: Answer[]
  type: number
}
