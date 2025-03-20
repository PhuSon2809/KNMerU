import { FC, memo } from 'react'

interface ICardItemProps {
  variants: 'default' | 'detail'
}

const CardItem: FC<ICardItemProps> = memo(({ variants = 'default' }) => {
  return <div className=''>CardItem</div>
})

export default CardItem
