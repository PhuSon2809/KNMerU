import classNames from 'classnames'
import { FC, memo } from 'react'
import { Question } from '~/@types/question'

interface QuestionItemProps {
  isTrue: boolean
  question?: Question
  sequenceNumber: number
  onSelectAnswer?: () => void
}

const QuestionItem: FC<QuestionItemProps> = memo((props) => {
  const { isTrue, sequenceNumber } = props

  return (
    <div className='flex w-full flex-col gap-[6px]'>
      <div className='flex w-full items-start gap-3'>
        <div className='flex flex-col gap-3 rounded-xl bg-gray-1 p-3'>
          <div className='flex items-start gap-2'>
            <span className='text-[20px]/[30px] text-blue-main'>
              {sequenceNumber < 10 ? `0${sequenceNumber}` : sequenceNumber}
            </span>
            <p className='text-dongle-24 text-gray-7'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis eius odio veritatis
              eaque! Qui eaque inventore saepe dolores dolore vitae minima eligendi, nihil deserunt
              sit laudantium exercitationem, sunt veritatis excepturi.
            </p>
          </div>
          <div className='grid grid-cols-4'>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className='col-span-1 flex items-center gap-2'>
                <div
                  className={classNames(
                    'border-gray-3',
                    'size-5 shrink-0 rounded-full border-2 flex-center'
                  )}
                >
                  <div className='size-3 shrink-0 rounded-full border-2 border-inherit' />
                </div>
                <p className='text-dongle-24 mt-1 text-gray-7'>Câu trả lời {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
        <span
          className={
            isTrue ? 'mgc_check_circle_fill text-green-main' : 'mgc_close_circle_fill text-red-main'
          }
        />
      </div>
      {!isTrue && <p className='text-dongle-24 text-gray-7'>Đáp án đúng: B</p>}
    </div>
  )
})

export default QuestionItem
