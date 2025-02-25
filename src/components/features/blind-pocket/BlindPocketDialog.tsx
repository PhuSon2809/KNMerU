import { Dispatch, FC, memo, SetStateAction, useCallback, useState } from 'react'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import GiftItem from '~/components/shared/GiftItem'
import CharactersChooseItem from '../choose-characters/CharactersChooseItem'
import classNames from 'classnames'

interface BlindPocketDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BlindPocketDialog: FC<BlindPocketDialogProps> = memo(({ open, setOpen }) => {
  const [isViewPocket, setIsViewPocket] = useState<boolean>(false)
  const [isUnboxed, setIsUnboxed] = useState<boolean>(false)

  const handelOpenBlindPocket = useCallback(() => {
    if (isUnboxed) {
      setIsViewPocket(true)
    } else {
      setIsUnboxed(true)
    }
  }, [isUnboxed])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent noOverlayBackground noBlur>
        <div className='relative flex h-full flex-col gap-6 overflow-hidden p-6'>
          {isViewPocket ? (
            <>
              <CharactersChooseItem isShowDetail isInline className='z-10' />
              <div className={classNames('flex flex-1 flex-col gap-3 transition-500')}>
                <div className='grid h-full flex-1 grid-cols-3 gap-3'>
                  <GiftItem className='col-span-1' />
                  <GiftItem className='col-span-1' />
                  <GiftItem className='col-span-1' />
                  <GiftItem className='col-span-1' />
                  <GiftItem className='col-span-1' />
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
                <GiftItem variant={isUnboxed ? 'gift' : 'unbox'} />
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
