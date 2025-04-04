import classNames from 'classnames'
import Lottie from 'lottie-react'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { Character } from '~/@types'
import ButtonBase from '~/components/shared/ButtonBase'
import useResponsive from '~/hooks/useResponsive'
import { ShowDetail } from '~/pages/ChooseCharacters'
import { useAppSelector } from '~/store/configStore'
import { getLottieFile } from '~/utils'

interface CharactersChooseItemProps {
  tabActive?: number
  idx?: number
  className?: string
  isSelected?: boolean
  isShowDetail?: boolean
  isInDialog?: boolean
  disable?: boolean
  isInline?: boolean
  onClick?: () => void
  setShowDetailCheck?: Dispatch<SetStateAction<ShowDetail>>
  character: Character
  numberOfGift?: number
  numberOfCertificate?: number
}

const CharactersChooseItem: FC<CharactersChooseItemProps> = memo(
  ({
    idx,
    className,
    isSelected,
    isShowDetail = false,
    isInDialog = false,
    disable = false,
    isInline = false,
    numberOfGift,
    numberOfCertificate,
    onClick,
    setShowDetailCheck,
    character,
    tabActive = 0
  }) => {
    const { userInfo } = useAppSelector((s) => s.auth)

    const [showDetail, setShowDetail] = useState<boolean>(isShowDetail)

    const xsDown = useResponsive('down', 'xs')

    return (
      <div
        onClick={() => {
          if (!disable) {
            setShowDetail((prev) => !prev)
            if (idx) setShowDetailCheck?.((prev) => ({ ...prev, [idx + 1]: !prev[idx + 1] }))
          }
        }}
        className={classNames(
          isInline
            ? 'relative h-[81px] !w-full justify-center overflow-hidden rounded-xl p-0'
            : 'rounded-1 py-[12.5px] pl-3 pr-3 md:pr-5 lg:pr-6',
          isShowDetail && '!w-full',
          showDetail
            ? `w-full min-w-[266px] max-w-[340px] shrink-0 bg-pink-main md:w-[587px] md:max-w-full`
            : 'w-full min-w-[266px] md:w-fit md:min-w-fit',
          'flex flex-col items-stretch transition-500 md:flex-row'
        )}
      >
        <div
          className={classNames(
            isSelected
              ? 'rounded-1 rounded-tl-[80px] rounded-tr-[80px] bg-pink-main'
              : 'rounded-1 border-2 border-dashed border-orange-main',
            showDetail ? 'bg-orange-main' : 'hover:border-none hover:bg-orange-main',
            `group relative h-[278px] ${isInDialog ? (xsDown ? 'w-[214px]' : 'w-full') : 'w-full'} shrink-0 bg-gray-1 transition-300 md:h-[210px] md:w-[200px] lg:h-[278px] lg:w-[266px]`,
            isInline ? 'mb-20 border-none bg-transparent' : '',
            className
          )}
        >
          {/* <img
            src={character.imageUrl || images.characters}
            alt='characters'
            draggable={false}
            className={classNames(
              character.name === 'Bé họ Kim' &&
                (isInDialog
                  ? !isInline
                    ? '!bottom-[5px] !w-[165px] md:!w-[130px] lg:!w-[165px]'
                    : '!bottom-[5px] !w-[65px] md:!top-[-15px] md:!w-[130px] lg:!w-[65px]'
                  : '!bottom-[5px] !w-[175px] md:!w-[140px] lg:!w-[175px]'),
              isInline
                ? `bottom-auto top-[100px] w-[112px] transition-500 md:top-[-40px]`
                : 'w-[243px] transition-300 md:w-[180px] lg:w-[243px]',
              isSelected && 'rotate-[-6.84deg]',
              !showDetail && 'group-hover:rotate-[-6.84deg] group-hover:scale-[85%]',
              'bottom-[20px] border-none absolute-center-x'
            )}
          /> */}
          <Lottie
            animationData={getLottieFile(character.name)}
            className={classNames(
              isInline
                ? `bottom-auto top-[100px] w-[160px] transition-500 md:top-[-40px]`
                : 'w-[320px] transition-300 md:w-[240px] lg:w-[360px]',
              isSelected && 'rotate-[-6.84deg]',
              !showDetail && 'group-hover:rotate-[-6.84deg] group-hover:scale-[85%]',
              character.name === 'Bé họ Thạch' ? 'bottom-[0px]' : 'bottom-[20px]',
              'border-none absolute-center-x'
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
            <p className='text-nowrap text-[16px]/[18px] md:text-[20px]/[30px]'>
              {character.name || 'Tên nhân Vật'}
            </p>
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
            isShowDetail && 'w-full md:w-[320px]',
            showDetail ? 'flex' : 'hidden',
            'w-full flex-1 shrink-0 flex-col items-start gap-1 text-white transition-500 md:min-h-full md:w-[285px] md:pl-5 lg:pl-6'
          )}
        >
          <div className='flex items-center gap-3'>
            <h4 className='text-[28px]/[48px]'>{character.name || 'Tên nhân vật'}</h4>
            {/* <span className='text-dongle-24'>Giới tính: {characterContent.gender}</span> */}
          </div>
          <div className='flex-1'>
            <h4
              className={classNames(
                isInDialog ? 'text-[24px]/[32px]' : 'text-[28px]/[36px]',
                'md:text-[24px]/[32px] lg:text-[32px]/[48px]'
                // 'text-[20px]/[28px]'
              )}
            >
              Thông tin cá nhân
            </h4>
            {/* <ul className='list-disc pl-5'>
              <li className='text-dongle-24'>Giới tính: {characterContent.gender}</li>
              <li className='text-dongle-24'>Ngoại hình: {characterContent.appearance}</li>
              <li className='text-dongle-24'>Tính cách: {characterContent.character}</li>
            </ul> */}
            <p className='text-dongle-24'>{character.description}</p>
          </div>
          {!isShowDetail && !isSelected && (
            <ButtonBase
              variant='green'
              className='ml-auto mt-5 md:mt-0'
              onClick={(e) => {
                e?.preventDefault()
                e?.stopPropagation()
                setShowDetail(false)
                onClick?.()
                if (idx) setShowDetailCheck?.((prev) => ({ ...prev, [idx + 1]: false }))
              }}
            >
              Chọn nhân vật
            </ButtonBase>
          )}
        </div>
        {isInline && (
          <div className='absolute bottom-[-1px] z-10 h-[22px] w-full rounded-1 bg-yellow-light flex-center'>
            <p className='mt-0.5 font-dongle text-[16px]/[16px] uppercase text-gray-6'>
              [{userInfo?.characterOriginalName?.split(' ')[2]} {character.name || 'TÊN NHÂN VẬT'}]
              - Đang có {tabActive === 0 ? numberOfGift : numberOfCertificate}{' '}
              {tabActive === 0 ? 'món quà' : 'giấy khen'}
            </p>
          </div>
        )}
      </div>
    )
  }
)

export default CharactersChooseItem
