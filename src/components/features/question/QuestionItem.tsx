import classNames from 'classnames'
import { FC, memo } from 'react'
import { Question } from '~/@types/question'

interface QuestionItemProps {
  isDone: boolean
  isCorrect: boolean
  question: Question
  sequenceNumber: number
  answersSelect: number[]
  onSelectAnswer: (questionIndex: number, selectedAnswer: number) => void
}

const QuestionItem: FC<QuestionItemProps> = memo((props) => {
  const { isDone, isCorrect, question, sequenceNumber, answersSelect, onSelectAnswer } = props

  return (
    <div className='flex w-full flex-col gap-[6px]'>
      <div className='flex w-full items-start gap-3'>
        <div className='flex w-full flex-col gap-3 rounded-xl bg-gray-1 p-3'>
          <div className='flex items-start gap-2'>
            <span className='text-[20px]/[30px] text-blue-main'>
              {sequenceNumber < 10 ? `0${sequenceNumber}` : sequenceNumber}
            </span>
            <p className='mt-[5px] text-gray-7 text-dongle-24'>{question.content}</p>
          </div>
          <div className='grid grid-cols-4'>
            {question.choices.map((choice) => {
              return (
                <div
                  key={choice.option}
                  onClick={() => onSelectAnswer(sequenceNumber - 1, choice.option)}
                  className='group col-span-1 flex items-center gap-2'
                >
                  <div
                    className={classNames(
                      answersSelect[sequenceNumber - 1] === choice.option
                        ? 'border-blue-main'
                        : 'border-gray-3',
                      'size-5 shrink-0 rounded-full border-2 flex-center transition-500 group-hover:scale-110'
                    )}
                  >
                    <div className='size-3 shrink-0 rounded-full border-2 border-inherit' />
                  </div>
                  <p className='mt-0 text-gray-7 text-dongle-24'>{choice.content}</p>
                </div>
              )
            })}
          </div>
        </div>
        {isDone && (
          <span
            className={
              isCorrect
                ? 'mgc_check_circle_fill text-green-main'
                : 'mgc_close_circle_fill text-red-main'
            }
          />
        )}
      </div>
    </div>
  )
})

export default QuestionItem
