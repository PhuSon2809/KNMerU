import classNames from 'classnames'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AnswerInput, EnumQuestionType, TestResult } from '~/@types/question'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { answerQuestion } from '~/store/question/question.slice'
import { getGeneralInfor } from '~/store/root/root.slice'
import { getErrorMessage, isSuccessRes } from '~/utils'
import QuestionItem from './QuestionItem'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface QuestionDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  questionType: EnumQuestionType
}

const QuestionDialog: FC<QuestionDialogProps> = memo(({ open, setOpen, questionType }) => {
  const dispatch = useAppDispatch()

  const { questions } = useAppSelector((s) => s.question)

  const defaultAnswer = Array.from({ length: questions.length }, () => 0)

  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [status, setStatus] = useState({ isDone: false, isLoading: false })
  const [answersSelect, setAnswersSelect] = useState<number[]>(defaultAnswer)

  const isRetry = useMemo(
    () =>
      testResult
        ? questionType === EnumQuestionType.daily || questionType === EnumQuestionType.promoted
          ? testResult?.totalCorrectQuestion < testResult?.totalQuestion
          : testResult?.totalCorrectQuestion < 4
        : false,
    [questionType, testResult]
  )
  const score = useMemo(
    () => (testResult ? (testResult?.totalCorrectQuestion / testResult?.totalQuestion) * 10 : 0),
    [testResult]
  )

  const handleSelectAnswer = useCallback((questionIndex: number, selectedAnswer: number) => {
    setAnswersSelect((prev) => {
      const newAnswers = [...prev]
      newAnswers[questionIndex] = selectedAnswer
      return newAnswers
    })
  }, [])

  const hanndleAnswerQuestions = useCallback(async () => {
    if (answersSelect.some((answer) => answer === 0))
      return toast.error('Hãy chọn đầy đủ câu hỏi trước khi nộp bài nhé!')
    setStatus({ isDone: false, isLoading: true })
    try {
      const answerData: AnswerInput = {
        answers: questions.map((question, idx) => ({
          questionId: question.id,
          answer: answersSelect[idx]
        })),
        type: questionType
      }
      const res = await dispatch(answerQuestion(answerData)).unwrap()
      if (isSuccessRes(res.status)) {
        setTestResult(res.data)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(getErrorMessage(error))
    } finally {
      setStatus({ isDone: true, isLoading: false })
    }
  }, [questions, answersSelect, questionType])

  useEffect(() => {
    if (!open) {
      setTestResult(null)
      setStatus({ isDone: false, isLoading: false })
      setAnswersSelect(defaultAnswer)
      dispatch(getGeneralInfor())
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent noBlur noOverlayBackground disabledClose={status.isLoading}>
        <VisuallyHidden>
          <DialogTitle>Hidden Title</DialogTitle>
        </VisuallyHidden>
        <div className='relative flex h-full flex-col gap-6 overflow-hidden p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-1'>
              <h4 className='text-[32px]/[48px] text-blue-main'>
                {questionType === EnumQuestionType.daily
                  ? 'Điểm danh'
                  : questionType === EnumQuestionType.promoted
                    ? 'Lên lớp'
                    : 'Học vượt cấp'}
              </h4>
              <span className='text-dongle-24'>
                Đây là bài kiểm tra{' '}
                {questionType === EnumQuestionType.daily
                  ? 'điểm danh'
                  : questionType === EnumQuestionType.promoted
                    ? 'lên lớp'
                    : 'vượt cấp'}
              </span>
              <div className='w-fit rounded-1 bg-orange-main px-3 pb-1 pt-[6px] flex-center'>
                <span className='text-gray-1 text-dongle-24'>
                  {status.isDone && testResult
                    ? `Bạn đạt ${testResult.totalCorrectQuestion}/${testResult.totalQuestion} điểm`
                    : `Bao gồm ${questions.length} câu hỏi`}
                </span>
              </div>
            </div>
            {(!status.isDone || isRetry) && (
              <ButtonBase
                variant='pink'
                className='mr-[50px]'
                isLoading={status.isLoading}
                onClick={
                  isRetry
                    ? () => {
                        setTestResult(null)
                        setStatus({ isDone: false, isLoading: false })
                      }
                    : hanndleAnswerQuestions
                }
              >
                {isRetry ? 'Làm lại' : 'Nộp bài'}
              </ButtonBase>
            )}
          </div>
          <div className='hide-scrollbar flex w-full flex-1 flex-col gap-6 overflow-y-auto'>
            {questions.map((question, idx) => {
              return (
                <QuestionItem
                  key={idx}
                  question={question}
                  isDone={status.isDone}
                  isCorrect={
                    testResult?.answers.find((answer) => answer.questionId === question.id)
                      ?.isCorrect || false
                  }
                  sequenceNumber={idx + 1}
                  answersSelect={answersSelect}
                  onSelectAnswer={handleSelectAnswer}
                />
              )
            })}
          </div>
          <p
            className={classNames(
              status.isDone ? 'opacity-20' : 'opacity-0',
              'absolute right-48 top-0 font-purenotes text-[116px] text-red-main transition-300'
            )}
          >
            {parseFloat(score.toFixed(1))}đ
          </p>
          <BgTexture />
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default QuestionDialog
