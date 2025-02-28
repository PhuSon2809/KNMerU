export enum EnumQuestionType {
  promoted = 1,
  skipped = 2,
  daily = 3
}

export interface Question {
  id: number
  content: string
  choices: Choice[]
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

export interface AnswerCheck {
  questionId: number
  isCorrect: boolean
}

export interface TestResult {
  answers: AnswerCheck[]
  totalCorrectQuestion: number
  totalQuestion: number
}
