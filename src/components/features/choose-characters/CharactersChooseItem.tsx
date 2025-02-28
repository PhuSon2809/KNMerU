import classNames from 'classnames'
import { FC, memo, useState } from 'react'
import { Character } from '~/@types'
import { images } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'

interface CharactersChooseItemProps {
  className?: string
  isSelected?: boolean
  isShowDetail?: boolean
  isInline?: boolean
  onClick?: () => void
  character: Character
}

const CharactersChooseItem: FC<CharactersChooseItemProps> = memo(
  ({ className, isSelected, isShowDetail = false, isInline = false, onClick, character }) => {
    const [showDetail, setShowDetail] = useState<boolean>(isShowDetail)

    return (
      <div
        onClick={() => setShowDetail((prev) => !prev)}
        className={classNames(
          isInline
            ? 'relative h-[81px] justify-center overflow-hidden rounded-xl p-0'
            : 'rounded-1 py-[12.5px] pl-3 pr-6',
          isShowDetail && 'w-full',
          showDetail ? 'w-[587px] shrink-0 bg-pink-main' : 'w-fit',
          'flex items-stretch transition-500'
        )}
      >
        <div
          className={classNames(
            isSelected
              ? 'rounded-1 rounded-tl-[80px] rounded-tr-[80px] bg-pink-main'
              : 'rounded-1 border-2 border-dashed border-orange-main',
            showDetail ? 'bg-orange-main' : 'hover:border-none hover:bg-orange-main',
            'group relative h-[278px] w-[266px] shrink-0 bg-gray-1 transition-300',
            isInline ? 'mb-20 border-none bg-transparent' : '',
            className
          )}
        >
          <img
            src={character.imageUrl || images.characters}
            alt='characters'
            draggable={false}
            className={classNames(
              isInline
                ? 'bottom-auto top-[-40px] w-[112px] transition-500'
                : 'w-[243px] transition-300',
              isSelected && 'rotate-[-6.84deg]',
              !showDetail && 'group-hover:rotate-[-6.84deg] group-hover:scale-[85%]',
              'bottom-[20px] border-none absolute-center-x'
            )}
          />

          <div
            className={classNames(
              !isInline ? 'flex' : 'hidden',
              isSelected ? 'rotate-[7.6deg] bg-green-main text-gray-7' : 'bg-pink-main text-white',
              showDetail ? '-bottom-[14px]' : '-bottom-[25px] group-hover:rotate-[7.6deg]',
              'h-[50px] items-center justify-center px-6 py-[10px] uppercase absolute-center-x transition-300'
            )}
          >
            <p className='text-nowrap text-[20px]/[30px]'>{character.name || 'Tên nhân Vật'}</p>
          </div>

          {(!showDetail || isSelected) && (
            <div
              className={classNames(
                isSelected
                  ? 'bottom-6 left-[9px] bg-yellow-light text-gray-7 opacity-100'
                  : '-bottom-12 left-12 bg-red-main text-white opacity-0',
                'absolute flex items-center gap-2 rounded-full px-2 py-1 transition-500 group-hover:bottom-6 group-hover:left-[9px] group-hover:rotate-[-1.79deg] group-hover:opacity-100'
              )}
            >
              <span className='mgc_folder_fill scale-[77%]' />
              <p className='mt-1 font-dongle text-[20px]/[20px]'>
                {isSelected ? 'Đã chọn' : 'Xem thông tin'}
              </p>
            </div>
          )}
        </div>
        <div
          className={classNames(
            isInline ? 'hidden' : 'flex',
            isShowDetail && 'w-[320px]',
            showDetail ? 'flex' : 'hidden',
            'min-h-full w-[285px] flex-1 shrink-0 flex-col items-start gap-1 pl-6 text-white transition-500'
          )}
        >
          <div className='flex items-center gap-3'>
            <h4 className='text-[32px]/[48px]'>{character.name || 'Tên nhân vật'}</h4>
            <span className='text-dongle-24'>12 tuổi</span>
          </div>
          <div className='flex-1'>
            <h4 className='text-[32px]/[48px]'>Thông tin cá nhân</h4>
            <p className='text-dongle-24'>{character.description}</p>
          </div>
          {!isShowDetail && (
            <ButtonBase
              variant='green'
              className='ml-auto'
              onClick={(e) => {
                e?.preventDefault()
                e?.stopPropagation()
                setShowDetail(false)
                onClick?.()
              }}
            >
              Chọn nhân vật
            </ButtonBase>
          )}
        </div>
        {isInline && (
          <div className='absolute bottom-[-1px] z-10 h-[22px] w-full rounded-1 bg-yellow-light flex-center'>
            <p className='font-dongle text-[16px]/[16px] uppercase text-gray-6'>
              [{character.name || 'TÊN NHÂN VẬT'}] - Đang có 2 món quà
            </p>
          </div>
        )}
      </div>
    )
  }
)

export default CharactersChooseItem
