import classNames from 'classnames'
import { memo, useCallback, useState } from 'react'
import { icons } from '~/assets'
import AcitivitiesDialog from '~/components/features/activities/AcitivitiesDialog'
import ClassPercent from '~/components/features/home/ClassPercent'
import InformationItem from '~/components/features/home/InformationItem'
import PopoverActivities from '~/components/features/home/PopoverActivities'
import QuestionDialog from '~/components/features/question/QuestionDialog'
import ButtonBase from '~/components/shared/ButtonBase'
import Header from '~/layouts/components/Header'
import { informations, socials } from '~/mocks/data'
import { checkIn } from '~/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

const Home = memo(() => {
  const dispatch = useAppDispatch()
  const { isLoading, isAttendanced } = useAppSelector((s) => s.auth)
  // const [attendance, setAttendance] = useState<boolean>(false)
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const [eventOpen, setEventOpen] = useState<boolean>(false)
  const [titleDialog, setTitleDialog] = useState<string>('')

  const handleAttendance = useCallback(() => {
    dispatch(checkIn())
  }, [])

  const handleOpenEventDialog = useCallback((title: string) => {
    setTitleDialog(title)
    setEventOpen(true)
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
              variant={isAttendanced ? 'green' : 'pink'}
              className={isAttendanced ? 'min-w-[280px]' : 'min-w-[212px]'}
              LeftIcon={() => <span className='mgc_bling_fill' />}
              onClick={handleAttendance}
            >
              {isAttendanced ? 'Điểm danh thành công' : 'Điểm danh'}
            </ButtonBase>
            <QuestionDialog />
            <PopoverActivities
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              onOpenEventDialog={handleOpenEventDialog}
            >
              <ButtonBase
                size='lg'
                className='min-w-[212px]'
                RightIcon={() => (
                  <span
                    className={classNames(
                      'mgc_square_arrow_down_fill origin-center transition-transform duration-300 ease-in-out',
                      popoverOpen ? 'rotate-180' : 'rotate-0'
                    )}
                  />
                )}
                onClick={() => {}}
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

      <AcitivitiesDialog titleDialog={titleDialog} open={eventOpen} setOpen={setEventOpen} />
    </>
  )
})

export default Home
