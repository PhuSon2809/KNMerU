import { memo, useCallback, useMemo } from 'react'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent, DialogTrigger } from '~/components/shared/Dialog'
import QuestionItem from './QuestionItem'
import ActionDialog from '~/components/shared/ActionDialog'
import BgTexture from '~/components/shared/BgTexture'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

const QuestionDialog = memo(() => {
  const dispatch = useAppDispatch()

  const { questions } = useAppSelector((s) => s.question)

  const isAllTrue = useMemo(() => false, [])

  const handleQuestionClick = useCallback(() => {}, [])

  const hanndleAnswerQuestions = useCallback(() => {}, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonBase
          variant='orange'
          size='lg'
          className='min-w-[212px]'
          LeftIcon={() => <span className='mgc_pen_fill' />}
        >
          Học vượt cấp
        </ButtonBase>
      </DialogTrigger>
      <DialogContent noOverlayBackground noBlur>
        <div className='relative flex flex-col gap-6 overflow-hidden p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-1'>
              <h4 className='text-[32px]/[48px] text-blue-main'>Học vượt cấp</h4>
              <span className='text-dongle-24'>Đây là bài kiểm tra vượt cấp</span>
              <div className='w-fit rounded-1 bg-orange-main px-3 pb-1 pt-[6px] flex-center'>
                <span className='text-gray-1 text-dongle-24'>
                  {!isAllTrue ? `Bạn đạt ${3}/${6} điểm` : `Bao gồm ${6} câu hỏi`}
                </span>
              </div>
            </div>
            {!isAllTrue && (
              <ActionDialog title={!isAllTrue ? 'Làm lại' : 'Nộp bài'} onClick={() => {}} />
            )}
          </div>
          <div className='hide-scrollbar flex w-full flex-1 flex-col gap-6 overflow-y-auto'>
            {Array.from({ length: 6 }).map((question, idx) => (
              <QuestionItem
                key={idx}
                isTrue={idx !== 0 && idx !== 2 && idx !== 4}
                sequenceNumber={idx + 1}
                question={question as any}
              />
            ))}
          </div>
          <p className='absolute right-48 top-0 font-purenotes text-[116px] text-red-main opacity-20'>
            5đ
          </p>
          <BgTexture />
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default QuestionDialog
