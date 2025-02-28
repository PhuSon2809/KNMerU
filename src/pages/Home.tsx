import classNames from 'classnames'
import { memo, useCallback, useEffect, useState } from 'react'
import { EnumQuestionType } from '~/@types/question'
import { icons } from '~/assets'
import AcitivitiesDialog from '~/components/features/activities/AcitivitiesDialog'
import ClassPercent from '~/components/features/home/ClassPercent'
import InformationItem from '~/components/features/home/InformationItem'
import PopoverActivities from '~/components/features/home/PopoverActivities'
import QuestionDialog from '~/components/features/question/QuestionDialog'
import ButtonBase from '~/components/shared/ButtonBase'
import Header from '~/layouts/components/Header'
import { informations, socials } from '~/mocks/data'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getUserGifts } from '~/store/gift/gift.slice'
import { getQuestion } from '~/store/question/question.slice'
import { isPromoted } from '~/utils'

export type OpenState = {
  event: boolean
  popover: boolean
  question: boolean
}

const Home = memo(() => {
  const dispatch = useAppDispatch()

  const { isLoading } = useAppSelector((s) => s.auth)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const [titleDialog, setTitleDialog] = useState<string>('')
  const [questionType, setQuestionType] = useState<EnumQuestionType>(EnumQuestionType.daily)
  const [open, setOpen] = useState<OpenState>({
    event: false,
    popover: false,
    question: false
  })

  const setOpenState = useCallback(
    (key: keyof OpenState) => (open: boolean) => {
      setOpen((prev) => ({ ...prev, [key]: open }))
    },
    []
  )

  const handleOpenDialog = useCallback(
    (type: EnumQuestionType) => () => {
      setQuestionType(type)
      setOpenState('question')(true)
      dispatch(getQuestion(type))
    },
    []
  )

  const handleOpenEventDialog = useCallback((title: string) => {
    setTitleDialog(title)
    setOpenState('event')(true)
  }, [])

  useEffect(() => {
    dispatch(getUserGifts())
  }, [])

  return (
    <>
      <div className='flex size-full flex-1 flex-col items-stretch'>
        <div className='relative flex w-full flex-col gap-9 rounded-bl-3xl rounded-br-3xl bg-green-main/[.56] px-[50px] py-14'>
          <Header />
          <ClassPercent />
          <div className='-bottom-9 z-10 flex items-center gap-3 absolute-center-x'>
            <ButtonBase
              size='lg'
              isLoading={isLoading}
              variant={generalInfo?.isCheckedIn ? 'green' : 'pink'}
              className={generalInfo?.isCheckedIn ? 'min-w-[280px]' : 'min-w-[212px]'}
              LeftIcon={() => <span className='mgc_bling_fill' />}
              onClick={
                generalInfo?.isCheckedIn
                  ? () => {}
                  : handleOpenDialog(
                      isPromoted(generalInfo?.streak as number)
                        ? EnumQuestionType.promoted
                        : EnumQuestionType.daily
                    )
              }
            >
              {generalInfo?.isCheckedIn ? 'Điểm danh thành công' : 'Điểm danh'}
            </ButtonBase>
            {(generalInfo?.classLevel === 1 || generalInfo?.classLevel === 2) && (
              <ButtonBase
                variant='orange'
                size='lg'
                className='min-w-[212px]'
                LeftIcon={() => <span className='mgc_pen_fill' />}
                onClick={handleOpenDialog(EnumQuestionType.skipped)}
              >
                Học vượt cấp
              </ButtonBase>
            )}
            <PopoverActivities
              popoverOpen={open.popover}
              setPopoverOpen={(open) => setOpenState('popover')(open)}
              onOpenEventDialog={handleOpenEventDialog}
            >
              <ButtonBase
                size='lg'
                className='min-w-[212px]'
                RightIcon={() => (
                  <span
                    className={classNames(
                      'mgc_square_arrow_down_fill origin-center transition-all duration-300 ease-in-out',
                      open.popover ? 'rotate-180' : 'rotate-0'
                    )}
                  />
                )}
              >
                Tham gia hoạt động
              </ButtonBase>
            </PopoverActivities>
          </div>
        </div>

        <div className='relative flex min-h-[435px] flex-1 items-end justify-between overflow-hidden pb-[60px] pl-[50px]'>
          <div className='flex items-center gap-[15px]'>
            {informations.map((infor) => (
              <InformationItem key={infor.id} information={infor} />
            ))}
          </div>
          <div className='min-w-[171px] rounded-bl-1 rounded-tl-1 border border-gray-2 bg-gray-1 p-[14px] pr-[50px]'>
            <p className='text-[20px]/[30px] text-gray-7'>Contact us</p>
            <div className='flex items-center gap-5'>
              {socials.map((social) => (
                <ButtonBase
                  key={social.id}
                  variant={social.variant}
                  size='circleIcon'
                  className='!rounded-1'
                >
                  <span className={social.icon} />
                </ButtonBase>
              ))}
            </div>
          </div>
          <img src={icons.flower} alt='icon-flower' className='absolute -left-40 bottom-5' />
          <img src={icons.coffee} alt='icon-coffee' className='absolute -right-16 top-5' />
        </div>
      </div>

      <QuestionDialog
        questionType={questionType}
        open={open.question}
        setOpen={(open) => setOpenState('question')(open)}
      />
      <AcitivitiesDialog
        titleDialog={titleDialog}
        open={open.event}
        setOpen={(open) => setOpenState('event')(open)}
      />
    </>
  )
})

export default Home
