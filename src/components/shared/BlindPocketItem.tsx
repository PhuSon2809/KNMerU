import classNames from 'classnames'
import { FC, memo } from 'react'

interface BlindPocketItemProps {
  onClick: () => void
  variant?: 'collected' | 'not-collected'
}

const BlindPocketItem: FC<BlindPocketItemProps> = memo(({ onClick, variant = 'not-collected' }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        variant === 'collected'
          ? 'border-pink-main bg-pink-main text-gray-1'
          : 'border-gray-2 bg-gray-1 text-gray-3 hover:border-gray-3 hover:bg-gray-2',
        'group relative h-[87px] w-[82px] flex-col gap-[6px] rounded-xl border transition-all duration-300 ease-in-out flex-center'
      )}
    >
      <span className='mgc_gift_fill' />

      <p className='text-[20px]/[30px]'>Túi mù</p>

      {variant === 'not-collected' && (
        <>
          <span className='mgc_bling_fill text-yellow-light absolute -top-2 right-1' />
          <div className='bg-yellow-light absolute -right-5 -top-4 rotate-[18deg] items-center justify-center rounded-full px-2 py-1 font-dongle text-gray-7 opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'>
            <p className='text-nowrap text-[20px]/[20px]'>Quà đặc biệt</p>
          </div>
        </>
      )}
    </div>
  )
})

export default BlindPocketItem
