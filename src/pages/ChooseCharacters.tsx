import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CharactersChooseItem from '~/components/features/choose-characters/CharactersChooseItem'
import ButtonBase from '~/components/shared/ButtonBase'
import TitleCharacters from '~/components/shared/TitleCharacters'
import { path } from '~/constants/path'
import useHorizontalScroll from '~/hooks/useHorizontalScroll'
import { getCharacters } from '~/store/character/character.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

const ChooseCharacters = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { characters } = useAppSelector((s) => s.characters)

  const { containerRef, handleMouseDown, handleTouchStart } = useHorizontalScroll()

  const [idSelected, setIdSelected] = useState<number>(-1)

  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  return (
    <div className='relative flex size-full flex-1 flex-col items-stretch overflow-hidden pb-[200px] pt-[50px]'>
      <div className='z-[10] flex w-full flex-col gap-10'>
        <TitleCharacters title='Lựa chọn nhân vật' />
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          className='flex items-center gap-6 overflow-y-hidden overflow-x-scroll px-[50px] pb-10 pt-20'
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <CharactersChooseItem
              key={idx}
              isSelected={idSelected === idx}
              onClick={() => setIdSelected(idx)}
            />
          ))}
        </div>
        <div className='w-full gap-[25px] flex-center'>
          <ButtonBase variant='green' size='icon' onClick={() => navigate(-1)}>
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <ButtonBase
            variant='pink'
            onClick={() => navigate(path.nameCharacters)}
            LeftIcon={() => <span className='mgc_magic_3_fill' />}
          >
            Xác nhận
          </ButtonBase>
        </div>
      </div>
      <div className='-bottom-[1340px] size-[1570px] shrink-0 rounded-full bg-yellow-main absolute-center-x' />
    </div>
  )
})

export default ChooseCharacters
