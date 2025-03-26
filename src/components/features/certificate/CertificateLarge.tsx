import classNames from 'classnames'
import { FC, memo } from 'react'
import { icons } from '~/assets'
import Logo from '~/components/shared/Logo'
import { useAppSelector } from '~/store/configStore'

interface CertificateLargeProps {
  type?: 'normal' | 'final'
}

const CertificateLarge: FC<CertificateLargeProps> = memo(({ type = 'normal' }) => {
  const { userInfo } = useAppSelector((s) => s.auth)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  return (
    <div
      className={classNames(
        type === 'normal' && 'justify-between rounded-1 border-4 border-blue-main',
        type === 'final' &&
          'bg-certificate-mobile h-full justify-center bg-cover bg-no-repeat object-center md:bg-certificate md:bg-contain',
        'relative flex max-h-[500px] w-full flex-1 flex-col items-center px-5 py-5 text-center md:max-h-[400px] md:px-0 lg:max-h-[460px]'
      )}
    >
      <div></div>
      <div className='flex flex-col items-center gap-1'>
        {type === 'normal' && (
          <img src={icons.certificate} alt='certificate' className='size-10 md:size-[56px]' />
        )}
        <div className='flex flex-col-reverse items-center gap-3 md:flex-row'>
          {type === 'final' && (
            <img
              src={icons.graduction}
              alt='graduction'
              className='hidden size-10 md:flex md:size-[40px] lg:size-[72px]'
            />
          )}
          <h1 className='relative text-2xl uppercase text-pink-main md:text-[32px]/[36px] lg:text-[45px]/[68px]'>
            Giấy khen{' '}
            {type === 'normal' && (
              <img
                src={icons.arrow}
                alt='arrow'
                className='absolute -left-12 top-6 hidden w-10 md:flex'
              />
            )}
          </h1>
          {type === 'final' && (
            <img
              src={icons.graduction}
              alt='graduction'
              className='size-10 md:size-[40px] lg:size-[72px]'
            />
          )}
        </div>
        <div className='flex flex-col items-center md:flex-row'>
          <p className='text-[20px]/[48px] uppercase text-blue-main'>Khen tặng bạn</p>
          <span className='relative ml-1 text-2xl text-orange-main md:text-[32px]/[48px]'>
            {userInfo?.fullName}{' '}
            {type === 'normal' && (
              <img
                src={icons.blink_3}
                alt='blink_3'
                className='absolute -right-6 -top-4 md:-right-6 md:-top-6'
              />
            )}
          </span>
        </div>
        <p className='px-5 font-dongle text-base text-orange-main md:px-0 md:text-[20px]/[20px] lg:text-[24px]/[24px]'>
          Đã đạt thành tích xuất sắc chăm bé {userInfo?.characterOriginalName?.split(' ')[2]}{' '}
          {generalInfo?.characterName}{' '}
          {type === 'normal' ? `lên lớp ${Number(generalInfo?.classLevel)}` : `tốt nghiệp Tiểu học`}
        </p>
        <p className='font-dongle text-base text-orange-main md:text-[20px]/[20px] lg:text-[24px]/[24px]'>
          (Hoàn thành {(Number(generalInfo?.classLevel) - 1) * 25}% tiến độ)
        </p>
      </div>
      <div
        className={classNames(
          type === 'normal' ? 'md:justify-between' : 'md:justify-center',
          'flex w-full items-end justify-center px-[20px]'
        )}
      >
        {type === 'normal' && (
          <img src={icons.mushroom} alt='mushroom' className='hidden w-[112px] md:flex' />
        )}
        <Logo className='w-[156px]' />
      </div>
      {type === 'normal' && (
        <>
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
        </>
      )}
      {/* <img src={images.bg_certificate} alt='plane' className='absolute inset-0 z-[-1] h-full' /> */}
    </div>
  )
})

export default CertificateLarge
