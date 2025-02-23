import classNames from 'classnames'
import { FC, memo, useState } from 'react'
import { images } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'

interface CharactersChooseItemProps {
  className?: string
  isSelected: boolean
  onClick?: () => void
}

const CharactersChooseItem: FC<CharactersChooseItemProps> = memo(
  ({ className, isSelected, onClick }) => {
    const [showDetail, setShowDetail] = useState<boolean>(false)

    console.log('showDetail', showDetail)

    return (
      <div
        onClick={() => setShowDetail((prev) => !prev)}
        className={classNames(
          showDetail ? 'w-[587px] shrink-0 rounded-1 bg-pink-main py-[12.5px] pl-3 pr-6' : 'w-fit',
          'transition-500 flex items-center'
        )}
      >
        <div
          className={classNames(
            isSelected
              ? 'rounded-1 rounded-tl-[80px] rounded-tr-[80px] bg-pink-main'
              : 'rounded-1 border-2 border-dashed border-orange-main',
            showDetail ? 'bg-orange-main' : 'hover:border-none hover:bg-orange-main',
            'transition-300 group relative h-[278px] w-[266px] shrink-0 bg-gray-1',
            className
          )}
        >
          <img
            src={images.characters}
            alt='characters'
            draggable={false}
            className={classNames(
              isSelected && 'rotate-[-6.84deg]',
              !showDetail && 'group-hover:rotate-[-6.84deg] group-hover:scale-[85%]',
              'transition-300 bottom-[25px] w-[243px] border-none absolute-center-x'
            )}
          />
          <div
            className={classNames(
              isSelected ? 'rotate-[7.6deg] bg-green-main text-gray-7' : 'bg-pink-main text-white',
              showDetail ? '-bottom-[14px]' : '-bottom-[25px] group-hover:rotate-[7.6deg]',
              'transition-300 h-[50px] px-6 py-[10px] uppercase flex-center absolute-center-x'
            )}
          >
            <p className='text-nowrap text-[20px]/[30px]'>Tên nhân Vật</p>
          </div>

          {(!showDetail || isSelected) && (
            <div
              className={classNames(
                isSelected
                  ? 'bottom-6 left-[9px] bg-yellow-light text-gray-7 opacity-100'
                  : '-bottom-12 left-12 bg-red-main text-white opacity-0',
                'transition-500 absolute flex items-center gap-2 rounded-full px-2 py-1 group-hover:bottom-6 group-hover:left-[9px] group-hover:rotate-[-1.79deg] group-hover:opacity-100'
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
            showDetail ? 'flex' : 'hidden',
            'transition-500 w-[285px] shrink-0 flex-col items-start gap-1 pl-6 text-white'
          )}
        >
          <div className='flex items-center gap-3'>
            <h4 className='text-[32px]/[48px]'>Tên nhân vật</h4>
            <span className='text font-dongle text-[24px]/[24px]'>12 tuổi</span>
          </div>
          <div>
            <h4 className='text-[32px]/[48px]'>Thông tin cá nhân</h4>
            <p className='text font-dongle text-[24px]/[24px]'>
              er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper su
            </p>
          </div>
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
        </div>
      </div>
    )
  }
)

export default CharactersChooseItem
