import { memo } from 'react'
import { icons } from '~/assets'
import Logo from '~/components/shared/Logo'
import { useAppSelector } from '~/store/configStore'

const CertificateLarge = memo(() => {
  const { userInfo } = useAppSelector((s) => s.auth)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  return (
    <div className='relative flex max-h-[406px] w-full flex-1 flex-col items-center justify-between rounded-1 border-4 border-blue-main px-5 py-5 text-center md:px-0'>
      <div></div>
      <div className='flex flex-col items-center gap-1'>
        <img src={icons.certificate} alt='certificate' className='size-10 md:size-[56px]' />
        <h1 className='relative text-[40px]/[60px] uppercase text-pink-main md:text-[45px]/[68px]'>
          Giấy khen{' '}
          <img
            src={icons.arrow}
            alt='arrow'
            className='absolute -left-12 top-6 hidden w-10 md:flex'
          />
        </h1>
        <div className='flex flex-col items-center md:flex-row'>
          <p className='text-[20px]/[48px] uppercase text-blue-main'>Khen tặng bạn </p>
          <span className='relative ml-1 text-[32px]/[48px] text-orange-main'>
            {userInfo?.fullName}{' '}
            <img
              src={icons.blink_3}
              alt='blink_3'
              className='absolute -right-6 -top-4 md:-right-6 md:-top-6'
            />
          </span>
        </div>
        <p className='font-dongle text-[24px]/[24px] text-orange-main'>
          Đã đạt thành tích xuất sắc chăm bé {generalInfo?.characterName} lên lớp{' '}
          {generalInfo?.classLevel}
        </p>
        <p className='font-dongle text-[24px]/[24px] text-orange-main'>
          (Hoàn thành {25}% tiến độ)
        </p>
      </div>
      <div className='flex w-full items-end justify-center px-[20px] md:justify-between'>
        <img src={icons.mushroom} alt='mushroom' className='hidden w-[112px] md:flex' />
        <Logo className='w-[156px]' />
      </div>
      <img
        src={icons.exclamation}
        alt='exclamation'
        className='absolute left-5 top-5 w-12 md:w-[53px]'
      />
      <img
        src={icons.small_flower}
        alt='small_flower'
        className='absolute right-4 top-4 w-10 md:right-8 md:top-8 md:w-[62px]'
      />
      <img
        src={icons.blink_4}
        alt='blink_4'
        className='absolute bottom-[140px] left-8 hidden w-[45px] lg:flex'
      />
      <img
        src={icons.plane}
        alt='plane'
        className='absolute right-0 top-1/2 hidden w-[80px] -translate-y-1/2 lg:flex'
      />
    </div>
  )
})

export default CertificateLarge
