import { memo, useCallback } from 'react'
import InformationItem from '~/components/features/home/InformationItem'
import ButtonBase from '~/components/shared/ButtonBase'
import Header from '~/layouts/components/Header'
import { informations } from '~/mocks/data'

const Home = memo(() => {
  const handleAttendance = useCallback(() => {}, [])

  const handleStudyBeyondLevel = useCallback(() => {}, [])

  return (
    <div className='flex size-full flex-1 flex-col items-stretch'>
      <div className='w-full bg-green-main px-[50px] py-14'>
        <Header />
        <div className='rounded-1 border-[3px] border-dashed border-blue-main bg-gray-1 p-6'></div>
        <div className='flex items-center gap-3'>
          <ButtonBase
            variant='pink'
            className=''
            LeftIcon={() => <span className='mgc-' />}
            onClick={handleAttendance}
          >
            Điểm danh
          </ButtonBase>
          <ButtonBase
            variant='orange'
            className=''
            LeftIcon={() => <span className='mgc-' />}
            onClick={handleStudyBeyondLevel}
          >
            Học vượt cấp
          </ButtonBase>
          <ButtonBase
            className=''
            RightIcon={() => (
              <span>
                <span className='' />
              </span>
            )}
            onClick={() => {}}
          >
            Tham gia hoạt động
          </ButtonBase>
        </div>
      </div>

      <div className='flex flex-1 items-end justify-between pb-[60px] pl-[50px]'>
        <div className='flex items-center gap-[15px]'>
          {informations.map((infor) => (
            <InformationItem key={infor.id} information={infor} />
          ))}
        </div>
        <div className='min-w-[171px] rounded-bl-1 rounded-tl-1 border border-gray-2 bg-gray-1 p-[14px] pr-[50px]'>
          <p className='text-[20px]/[30px] text-gray-7'>Contact us</p>
          <div className='flex items-center gap-5'>
            <ButtonBase variant='orange' size='circleIcon' className='!rounded-1'>
              <span className='mgc_mail_fill' />
            </ButtonBase>
            <ButtonBase size='circleIcon' className='!rounded-1'>
              <span className='mgc_facebook_fill' />
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Home
