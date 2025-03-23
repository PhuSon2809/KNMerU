import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'
import { Card } from '~/@types'
import { images } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import { cardDescs } from '~/mocks/data'

interface ICardItemProps {
  card: Card
  isUsed?: boolean
  status: 'default' | 'detail'
  variants: 'blue' | 'green' | 'pink'
  className?: string
  onOpen?: (id: number) => void
}

const CardItem: FC<ICardItemProps> = memo(
  ({ card, isUsed = false, variants = 'pink', status = 'default', className, onOpen }) => {
    const bgDefault = useMemo(
      () => ({
        pink: 'bg-ln-white-pink',
        green: 'bg-gray-9',
        blue: 'bg-ln-white-blue'
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

    const border = useMemo(
      () => ({
        pink: 'border-pink-main',
        green: 'border-green-main',
        blue: 'border-blue-main'
      }),
      []
    )

    const textColor = useMemo(
      () => ({
        pink: 'text-pink-main',
        green: 'text-green-main',
        blue: 'text-blue-main'
      }),
      []
    )

    const desc = cardDescs.find((d) => d.id === (card.id || card.cardId))?.desc

    return (
      <div
        className={classNames(
          className,
          'relative flex h-[480px] w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border-[2px] pt-6 sm:h-[546px] sm:w-[353px]',
          status === 'default' ? bgDefault[variants] : bgDetail[variants],
          border[variants]
        )}
      >
        <div
          className={classNames(
            'absolute left-[18px] top-[14px] rounded-2xl px-6 py-3 text-xl text-white',
            bgDetail[variants]
          )}
        >
          {card.id || card.cardId}
        </div>

        <div
          className={classNames(
            status === 'default' ? 'h-full flex-1 pb-1 sm:pb-3' : 'mb-5',
            'flex flex-col items-center justify-around px-[12.5px]'
          )}
        >
          <img
            src={
              card.id === 1 || card.cardId === 1
                ? card.imageUrl || card.cardImageUrl
                : card.id === 2 || card.cardId === 2
                  ? images.teacher
                  : images.cohoi
            }
            alt={card.title}
            className={classNames(
              status === 'default' ? 'h-auto w-full' : 'size-[130px]',
              'object-cover object-center transition-300'
            )}
          />
          {status === 'default' && (
            <ButtonBase
              variant={variants}
              className='text-white'
              onClick={() => onOpen?.(card.id || card.cardId)}
            >
              Xem chi tiết
            </ButtonBase>
          )}
        </div>

        <div
          className={classNames(
            status === 'default' ? 'bottom-[-600px]' : 'bottom-[-360px]',
            'absolute flex size-[600px] shrink-0 flex-col items-center justify-start gap-8 rounded-full bg-white pt-4 absolute-center-x transition-300'
          )}
        >
          <div
            className={classNames(
              'flex max-w-[260px] flex-col justify-center gap-5 text-center sm:max-w-[300px]',
              textColor[variants]
            )}
          >
            <p className='text-xl'>Lợi ích</p>
            <ul className='list-inside'>
              {desc &&
                desc.map((item) => (
                  <li key={item} className='mt-1 text-center text-sm sm:text-base'>
                    {item}
                  </li>
                ))}
            </ul>
            <ButtonBase variant={variants} onClick={() => onOpen?.(0)} className='text-white'>
              Đóng
            </ButtonBase>
          </div>
        </div>
        <div
          className={classNames(
            status === 'default' ? `h-[100px] ${bgDetail[variants]}` : 'h-fit bg-transparent',
            'flex flex-col items-center justify-center space-y-1 text-center transition-300'
          )}
        >
          <p className='text-xl text-white'>{card.title || card.cardName}</p>
          <p
            className={classNames('text-xs', status === 'default' ? 'text-gray-7' : 'text-gray-1')}
          >
            *Lưu ý: thẻ chỉ có giá trị sử dụng 1 lần.
          </p>
        </div>

        {isUsed && (
          <div className='absolute inset-0 flex size-full items-center justify-center bg-black/80'>
            <p className='text-center text-[45px] text-white'>
              Thẻ đã được <br /> sử dụng
            </p>
          </div>
        )}
      </div>
    )
  }
)

export default CardItem
