import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'
import { Gift } from '~/@types'
import { images } from '~/assets'

interface GiftItemProps {
  gift?: Gift
  variant?: 'unbox' | 'gift'
  className?: string
}

const GiftItem: FC<GiftItemProps> = memo(({ gift, variant = 'unbox' }) => {
  const isGift = useMemo(() => variant === 'gift', [gift, variant])

  return (
    <div
      className={classNames(
        isGift ? 'w-[200px]' : 'w-full',
        'group relative h-[187px] flex-col gap-[14px] overflow-hidden rounded-1 border border-pink-main bg-white px-5 py-3 flex-center transition-500 hover:bg-blue-main'
      )}
    >
      <p
        className={classNames(
          variant === 'gift' ? 'text-blue-main' : 'text-pink-main',
          'text-[20px]/[30px] transition-300 group-hover:text-gray-1'
        )}
      >
        {gift && variant === 'gift' ? gift.giftName : 'Món quà của bạn là ?'}
      </p>
      <div className={classNames('z-10 size-full flex-1')}>
        <img
          src={gift && variant === 'gift' ? gift.giftImageUrl : images.unbox}
          alt={gift && variant === 'gift' ? gift.giftName : 'unbox'}
          className='size-full object-cover object-center'
        />
      </div>
      <div className='absolute left-20 top-28 aspect-square w-[120%] shrink-0 rounded-full opacity-0 transition-500 group-hover:top-[46px] group-hover:bg-green-main group-hover:opacity-100 group-hover:absolute-center-x' />
    </div>
  )
})

export default GiftItem
