import classNames from 'classnames'
import { FC, memo } from 'react'
import Logo from '~/components/shared/Logo'
import { useAppSelector } from '~/store/configStore'
interface CertificateItemProps {
  percent?: number
  className?: string
  type?: 'normal' | 'final'
}

const CertificateItem: FC<CertificateItemProps> = memo(
  ({ className, percent = 20, type = 'normal' }) => {
    const { userInfo } = useAppSelector((s) => s.auth)
    return (
      <div
        className={classNames(
          type === 'normal' && 'gap-1 border-2 border-blue-main',
          type === 'final' && 'bg-certificate bg-cover object-center p-3',
          'flex h-[138px] flex-col items-center justify-center rounded-md p-3',
          className
        )}
      >
        <p className='text-2xl uppercase text-pink-main'>Giấy Khen</p>
        <div className='flex items-center gap-1'>
          <p className='text-[8px] text-blue-main'>Bạn</p>
          <span className='text-[13px] text-skin-main'>{userInfo?.fullName}</span>
        </div>
        <p
          className={classNames(
            type === 'final' && 'px-8',
            'text-center font-dongle text-[10px]/[12px] text-orange-main'
          )}
        >
          ĐÃ ĐẠT THÀNH TÍCH LÊN LỚP THÀNH CÔNG {percent}% TIẾN ĐỘ
        </p>
        <Logo className={classNames(type === 'normal' ? 'h-[30px]' : 'h-[20px]', 'w-auto')} />
      </div>
    )
  }
)

export default CertificateItem
