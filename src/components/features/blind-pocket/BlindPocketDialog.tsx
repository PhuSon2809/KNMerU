import { Dispatch, FC, memo, SetStateAction, useCallback, useMemo, useState } from 'react'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import GiftItem from '~/components/shared/GiftItem'
import CharactersChooseItem from '../choose-characters/CharactersChooseItem'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getRandomGift } from '~/store/gift/gift.slice'
import { Gift } from '~/@types'
import toast from 'react-hot-toast'
import { getErrorMessage } from '~/utils'

interface BlindPocketDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BlindPocketDialog: FC<BlindPocketDialogProps> = memo(({ open, setOpen }) => {
  const dispatch = useAppDispatch()

  const { userInfo } = useAppSelector((s) => s.auth)
  const { userGifts } = useAppSelector((s) => s.gift)
  const { characters } = useAppSelector((s) => s.character)

  const [isViewPocket, setIsViewPocket] = useState<boolean>(false)
  const [isUnboxed, setIsUnboxed] = useState<boolean>(false)

  const character = useMemo(
    () =>
      characters.find((c) => {
        if (userInfo) return c.id === userInfo?.characterId
      }),
    []
  )

  const gift: Gift = {
    id: 0,
    name: 'Gift',
    description: 'Gift',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/f235/4d99/e616487ea79e07dde8649b73e2eb9785?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FKI7lKDjp-xg-p0y5iUZ3Ub-qPIGooEzJI9GfpdiydMDezblhZkyQN35WMnYMy~JD2WGqXGaN05JY5jh7hq8UOmuw7REYu-4m46hxXLaxOg-sjeL2HIbgJCnVyurhs-GlYxrT59cjDiEEqCn26Frcnr0joFb7tD5UTO3hZlbCd7AduqaK2o495hZ9Hn6qh-61ntUcTLdQBuDLo3d2UNcmDegH7-zy~sejo8vHskNJPGT9n7tM5JENiGWVxs5bilWdtLeLAZlqma3hyTnm1tkjsMXoRHq-wt2yVqrB7pB4KpR6~77gl6Hqpn0aTiiz4QX-oHQv7B0bs8PMkOMbUGo-g__'
  }

  const handelOpenBlindPocket = useCallback(async () => {
    try {
      const res = await dispatch(getRandomGift(1))
      console.log('getRandomGift res 2 ===>', res)
      if (isUnboxed) {
        setIsViewPocket(true)
      } else {
        setIsUnboxed(true)
      }
    } catch (error) {
      console.log('Failed to', error)
      toast.error(getErrorMessage(error))
    }
  }, [isUnboxed])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent noOverlayBackground noBlur>
        <div className='relative flex h-full flex-col gap-6 overflow-hidden p-6'>
          {isViewPocket ? (
            <>
              {character && (
                <CharactersChooseItem
                  character={character}
                  isShowDetail
                  isInline
                  className='z-10'
                />
              )}
              <div className={classNames('flex flex-1 flex-col gap-3 transition-500')}>
                <div className='grid h-full flex-1 grid-cols-3 gap-3'>
                  {userGifts.map((gift) => (
                    <GiftItem key={gift.id} gift={gift} className='col-span-1' />
                  ))}
                </div>
                <div className='rounded-2xl bg-orange-main p-4 text-gray-1 text-dongle-24'>
                  Những món quà này sẽ được gửi đến các bé
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogTitle>Chúc mừng bạn đã hoàn thành mốc</DialogTitle>
              <div
                className={classNames(
                  isUnboxed && 'justify-center',
                  'flex w-full flex-1 flex-col items-center gap-3'
                )}
              >
                <GiftItem gift={gift} variant={isUnboxed ? 'gift' : 'unbox'} />
                <ButtonBase
                  variant={isUnboxed ? 'green' : 'pink'}
                  className='w-fit'
                  onClick={handelOpenBlindPocket}
                >
                  {isUnboxed ? 'Xé túi mù ngay' : 'Thêm vào túi'}
                </ButtonBase>
              </div>
            </>
          )}
          <BgTexture />
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default BlindPocketDialog
