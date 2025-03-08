import classNames from 'classnames'
import { FC, memo } from 'react'
import Logo from '~/components/shared/Logo'
import { useAppSelector } from '~/store/configStore'
interface CertificateItemProps {
  percent?: number
  className?: string
}

const CertificateItem: FC<CertificateItemProps> = memo(({ className, percent = 20 }) => {
  const { userInfo } = useAppSelector((s) => s.auth)
  return (
    <div
      className={classNames(
        'flex max-h-[138px] flex-col items-center justify-center gap-1 rounded-md border-2 border-blue-main p-3',
        className
      )}
    >
      <p className='text-2xl uppercase text-pink-main'>Giấy Khen</p>
      <div className='flex items-center gap-1'>
        <p className='text-[8px] text-blue-main'>Bạn</p>
        <span className='text-[13px] text-skin-main'>{userInfo?.fullName}</span>
      </div>
      <p className='font-dongle text-[10px] text-orange-main'>
        ĐÃ ĐẠT THÀNH TÍCH LÊN LỚP THÀNH CÔNG {percent}% TIẾN ĐỘ
      </p>
      <Logo className='h-[30px] w-auto' />
    </div>
  )
})

export default CertificateItem
