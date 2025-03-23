import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'

interface ICardItemProps {
  isUsed?: false
  isActive?: false
  status: 'default' | 'detail'
  variant: 'blue' | 'green' | 'pink'
}

const CardItem: FC<ICardItemProps> = memo(
  ({ isUsed = false, isActive = false, variants = 'pink', status = 'default' }) => {
    const bgDefault = useMemo(
      () => ({
        pink: 'bg-pink-main',
        green: 'bg-green-main',
        blue: 'bg-blue-main'
      }),
      []
    )

    const bgDetail = useMemo(
      () => ({
        pink: 'bg-pink-main',
        green: 'bg-green-main',
        blue: 'bg-blue-main'
      }),
      []
    )

    return (
      <div
        className={classNames(
          'h-[546px] min-w-[300px] max-w-[353px] rounded-3xl border-[2px]',
          status === 'default' ? bgDefault[variants] : bgDetail[variants]
        )}
      >
        CardItem
      </div>
    )
  }
)

export default CardItem
