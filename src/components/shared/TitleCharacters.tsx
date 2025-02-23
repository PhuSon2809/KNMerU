import { FC, memo } from 'react'
import { icons } from '~/assets'
import Logo from './Logo'

interface TitleCharactersProps {
  title: string
}

const TitleCharacters: FC<TitleCharactersProps> = memo(({ title }) => {
  return (
    <div className='flex w-full flex-col items-center gap-8'>
      <Logo className='h-auto w-[176px]' />
      <div className='flex items-center gap-3'>
        <img src={icons.star} alt='star' className='w-[78px]' />
        <h1 className='text-[60px]/[90px] text-pink-main'>{title}</h1>
      </div>
    </div>
  )
})

export default TitleCharacters
