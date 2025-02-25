export interface Question {
  id: number
}

export interface Answer {
  questionId: number
  answer: number
}

export interface AnswerInput {
  answers: Answer[]
  type: number
}
