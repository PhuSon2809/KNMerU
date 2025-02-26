import { memo } from 'react'
import { images } from '~/assets'
import { useAppSelector } from '~/store/configStore'

const CharactersAvatar = memo(() => {
  const { userInfo } = useAppSelector((s) => s.auth)
  return (
    <div className='relative flex h-20 w-[120px] items-end rounded-xl bg-pink-main'>
      <div className='absolute bottom-[22px] h-[105px] overflow-hidden'>
        <img
          src={userInfo?.characterImageUrl || images.characters}
          alt='characters'
          className='h-auto w-[112px] object-cover'
        />
      </div>
      <div className='z-10 mt-auto h-[22px] w-full rounded-1 bg-yellow-light flex-center'>
        <p className='font-dongle text-[16px]/[16px] uppercase text-gray-6'>
          {userInfo?.characterName || 'TÊN NHÂN VẬT'}
        </p>
      </div>
    </div>
  )
})

export default CharactersAvatar
