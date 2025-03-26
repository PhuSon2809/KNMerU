import classNames from 'classnames'
import { memo, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { EnumQuestionType } from '~/@types/question'
import { icons } from '~/assets'
import CertificateDialog from '~/components/features/certificate/CertificateDialog'
import ClassPercent from '~/components/features/home/ClassPercent'
import DrawerMenu from '~/components/features/home/DrawerMenu'
import InformationItem from '~/components/features/home/InformationItem'
import ProfileDialog, { TitleDialog } from '~/components/features/profile/ProfileDialog'
import QuestionDialog from '~/components/features/question/QuestionDialog'
import ButtonBase from '~/components/shared/ButtonBase'
import { path } from '~/constants/path'
import Header from '~/layouts/components/Header'
import { informations, socials } from '~/mocks/data'
import { getCards } from '~/store/card/card.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getUserGifts } from '~/store/gift/gift.slice'
import { getQuestion } from '~/store/question/question.slice'
import { getErrorMessage } from '~/utils'

export type OpenState = {
  event: boolean
  popover: boolean
  question: boolean
  drawer: boolean
  profile: boolean
  certificate: boolean
}

const Home = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector((s) => s.auth)
  const { userCards } = useAppSelector((s) => s.card)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const [questionType, setQuestionType] = useState<EnumQuestionType>(EnumQuestionType.daily)
  const [titleProfile, setTitleProfile] = useState<TitleDialog>(TitleDialog.infor)
  const [open, setOpen] = useState<OpenState>({
    event: false,
    popover: false,
    question: false,
    drawer: false,
    profile: false,
    certificate: true
  })

  const setOpenState = useCallback(
    (key: keyof OpenState) => (open: boolean) => {
      setOpen((prev) => ({ ...prev, [key]: open }))
    },
    []
  )

  const handleOpenDialogProfile = useCallback((title: TitleDialog) => {
    setTitleProfile(title)
    setOpenState('profile')(true)
  }, [])

  const handleOpenDialogQuestion = useCallback(
    (type: EnumQuestionType) => async () => {
      try {
        setQuestionType(type)
        setOpenState('question')(true)
        await dispatch(getQuestion(type)).unwrap()
      } catch (error) {
        console.log('error', error)
        toast.error(getErrorMessage(error))
      }
    },
    []
  )

  const handleOpenEventDialog = useCallback(() => {
    if (userCards.length === 0) {
      navigate(path.supportCard)
    } else {
      navigate(path.event)
    }
  }, [userCards])

  useEffect(() => {
    dispatch(getUserGifts())
    dispatch(getCards())
  }, [])

  return (
    <>
      <div className='flex size-full flex-1 flex-col items-stretch'>
        <div className='relative flex w-full flex-col gap-5 rounded-bl-3xl rounded-br-3xl bg-green-main/[.56] px-5 py-14 pt-5 md:pt-5 lg:gap-9 lg:px-10 lg:pt-10 xl:px-[50px] xl:py-14'>
          <Header
            onOpenDrawer={() => setOpenState('drawer')(true)}
            handleOpenDialog={handleOpenDialogProfile}
          />
          <ClassPercent />
          <div className='-bottom-9 z-10 flex items-center gap-3 absolute-center-x'>
            <ButtonBase
              size='lg'
              isLoading={isLoading}
              variant={generalInfo?.isCheckedIn ? 'green' : 'pink'}
              className={classNames(
                generalInfo?.isCheckedIn ? 'min-w-[280px]' : 'min-w-[212px]',
                'hidden md:flex'
              )}
              LeftIcon={() => <span className='mgc_bling_fill' />}
              onClick={
                generalInfo?.isCheckedIn
                  ? () => {}
                  : handleOpenDialogQuestion(
                      generalInfo?.hasPromotedQuestion
                        ? EnumQuestionType.promoted
                        : EnumQuestionType.daily
                    )
              }
            >
              {generalInfo?.isCheckedIn ? 'Điểm danh thành công' : 'Điểm danh'}
            </ButtonBase>
            {(generalInfo?.classLevel === 1 || generalInfo?.classLevel === 2) &&
              !generalInfo.isSkippedClass && (
                <ButtonBase
                  variant='orange'
                  size='lg'
                  className='hidden min-w-[212px] lg:flex'
                  LeftIcon={() => <span className='mgc_pen_fill' />}
                  onClick={handleOpenDialogQuestion(EnumQuestionType.skipped)}
                >
                  Học vượt cấp
                </ButtonBase>
              )}
            <ButtonBase
              size='lg'
              className='min-w-[212px]'
              LeftIcon={() => <span className='mgc_fire_fill' />}
              onClick={handleOpenEventDialog}
            >
              Tham gia sự kiện <br />
              Khơi Nguồn Mer Ước
            </ButtonBase>
          </div>
        </div>

        <div className='relative flex min-h-[435px] flex-1 flex-col items-end justify-between gap-[15px] overflow-hidden px-5 pb-[60px] pt-20 md:items-center md:px-24 lg:items-end lg:px-10 xl:flex-row xl:gap-0 xl:pl-[50px] xl:pr-0'>
          <div className='flex w-full flex-col items-center gap-[15px] lg:h-[225px] lg:w-fit lg:flex-row lg:items-stretch xl:h-fit xl:items-center'>
            {informations.map((infor) => (
              <InformationItem key={infor.id} information={infor} />
            ))}
          </div>
          <div className='w-full min-w-[171px] rounded-1 border border-gray-2 bg-gray-1 p-[14px] xl:w-fit xl:rounded-br-none xl:rounded-tr-none xl:pr-[50px]'>
            <p className='mb-3 text-center text-[20px]/[30px] text-gray-7 xl:mb-0 xl:text-left'>
              Contact us
            </p>
            <div className='flex w-full items-center justify-center gap-5 xl:w-fit xl:justify-start'>
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
          <img src={icons.flower} alt='icon-flower' className='absolute -left-40 bottom-5 z-[-1]' />
          <img src={icons.coffee} alt='icon-coffee' className='absolute -right-16 top-5 z-[-1]' />
        </div>
      </div>

      <QuestionDialog
        questionType={questionType}
        open={open.question}
        setOpen={(open) => setOpenState('question')(open)}
        onOpenSuccessLevel={() => {
          setOpenState('question')(false)
          setOpenState('certificate')(true)
        }}
      />
      <ProfileDialog
        open={open.profile}
        setOpen={(open) => setOpenState('profile')(open)}
        titleDialog={titleProfile}
        setTitleDialog={setTitleProfile}
      />
      <DrawerMenu
        open={open.drawer}
        setOpen={(open) => setOpenState('drawer')(open)}
        handleOpenDialog={handleOpenDialogProfile}
        handleOpenQuestion={handleOpenDialogQuestion}
      />
      <CertificateDialog
        open={open.certificate}
        setOpen={(open) => setOpenState('certificate')(open)}
      />
    </>
  )
})

export default Home
