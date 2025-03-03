import classNames from 'classnames'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CharactersChooseItem from '~/components/features/choose-characters/CharactersChooseItem'
import ButtonBase from '~/components/shared/ButtonBase'
import TitleCharacters from '~/components/shared/TitleCharacters'
import { path } from '~/constants/path'
import useHorizontalScroll from '~/hooks/useHorizontalScroll'
import { setIsSuccess } from '~/store/auth/auth.slice'
import { getCharacters, setCharacterSelected } from '~/store/character/character.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

export type ShowDetail = {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
}

const ChooseCharacters = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { characters } = useAppSelector((s) => s.character)

  const { containerRef, handleMouseDown, handleTouchStart } = useHorizontalScroll()

  const [idSelected, setIdSelected] = useState<number>(0)
  const [showDetail, setShowDetail] = useState<ShowDetail>({
    1: false,
    2: false,
    3: false,
    4: false
  })

  const hasTrueValue = useMemo(
    () => Object.values(showDetail).some((value) => value === true),
    [showDetail]
  )

  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  const handleSelectCharacter = useCallback(() => {
    if (idSelected === 0) return toast.error('Bạn hãy chọn nhân vật trước khi xác nhận nhé.')
    const characterSelected = characters.slice(-4).find((c) => c.id === idSelected)
    if (characterSelected) dispatch(setCharacterSelected(characterSelected))
    navigate(path.nameCharacters)
  }, [idSelected])

  return (
    <div className='relative flex size-full flex-1 flex-col items-stretch overflow-hidden pb-[200px] pt-[50px]'>
      <div className='z-[10] flex w-full flex-col md:gap-10'>
        <TitleCharacters title='Lựa chọn nhân vật' />
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          className={classNames(
            !hasTrueValue && 'xl:justify-center',
            'flex items-stretch gap-5 overflow-y-hidden overflow-x-scroll px-5 pb-10 pt-20 transition-500 lg:gap-6 lg:px-[50px]'
          )}
        >
          {characters.slice(-4).map((character, idx) => {
            return (
              <CharactersChooseItem
                idx={idx}
                key={character.id}
                character={character}
                isSelected={idSelected === character.id}
                onClick={() => setIdSelected(character.id)}
                setShowDetailCheck={setShowDetail}
              />
            )
          })}
        </div>
        <div className='w-full gap-3 flex-center md:gap-5 lg:gap-[25px]'>
          <ButtonBase
            variant='green'
            size='icon'
            onClick={() => {
              dispatch(setIsSuccess(false))
              navigate(-1)
            }}
          >
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <ButtonBase
            variant='pink'
            onClick={handleSelectCharacter}
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
