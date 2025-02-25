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
  const isGift = useMemo(() => gift && variant === 'gift', [gift, variant])

  return (
    <div
      className={classNames(
        isGift ? 'w-[200px]' : 'w-full',
        'relative flex-col gap-[14px] rounded-1 border border-pink-main bg-white flex-center hover:bg-blue-main'
      )}
    >
      <p className='z-10 text-blue-main hover:text-pink-main'>
        {gift && variant === 'gift' ? gift.name : ''}
      </p>
      <div className={classNames('z-10 size-full flex-1')}>
        <img
          src={gift && variant === 'gift' ? gift.image : images.unbox}
          alt={gift && variant === 'gift' ? gift.name : 'unbox'}
          className='size-full object-cover object-center'
        />
      </div>
      <div className='top-10 size-[100px] shrink-0 rounded-full absolute-center-x' />
    </div>
  )
})

export default GiftItem
