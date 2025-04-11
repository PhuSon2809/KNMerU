import { FC, memo, useCallback, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { images, lotties } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import CardSlide from '~/components/shared/CardSlide'
import { Dialog, DialogContent } from '~/components/shared/Dialog'
import { chooseCard, getUserCards } from '~/store/card/card.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getErrorMessage, isSuccessRes } from '~/utils'
import Lottie from 'lottie-react'

interface DialogCardsProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogCards: FC<DialogCardsProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()
  const { isLoading, userCards } = useAppSelector((s) => s.card)

  const [idChoose, setIdChoose] = useState<number>(0)
  const [idCardActive, setIdCardActive] = useState<number>(0)

  useEffect(() => {
    if (userCards.length > 0 && idCardActive >= 0 && idCardActive < userCards.length) {
      const selectedCard = userCards[idCardActive]
      const cardId = selectedCard.cardId ?? selectedCard.id
      if (cardId !== undefined) {
        setIdChoose(cardId)
        console.log('Selected card ID:', cardId)
      } else {
        console.error('Card does not have valid ID:', selectedCard)
        setIdChoose(0)
      }
    }
  }, [idCardActive, userCards])

  useEffect(() => {
    if (open && userCards.length > 0) {
      setIdCardActive(0)
      const firstCardId = userCards[0].cardId ?? userCards[0].id
      setIdChoose(firstCardId ?? 0)
    }
  }, [open, userCards])

  const handleUseCard = useCallback(async () => {
    if (!idChoose) {
      toast.error('Vui lòng chọn thẻ để dùng!')
      return
    }

    const selectedCard = userCards.find(card => 
      (card.cardId ?? card.id) === idChoose
    )

    if (!selectedCard) {
      toast.error('Thẻ không tồn tại!')
      return
    }

    if (selectedCard.isUsed) {
      toast.error('Thẻ đã được dùng!')
      return
    }

    try {
      console.log('Attempting to use card with ID:', idChoose)
      const res = await dispatch(chooseCard(idChoose)).unwrap()
      
      if (isSuccessRes(res.status)) {
        toast.success('Dùng thẻ thành công!')
        setOpen(false)
        dispatch(getUserCards())
      } else {
        toast.error(res.data?.message || 'Dùng thẻ không thành công!')
      }
    } catch (error) {
      console.error('Error using card:', error)
      toast.error(getErrorMessage(error))
    }
  }, [userCards, idChoose, dispatch, setOpen])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        disabledBgDialog
        hideClose
        className='hide-scrollbar max-h-[100vh] !overflow-visible overflow-y-auto sm:!overflow-y-auto'
        aria-labelledby="dialog-title"
      >
        <div id="dialog-title" className="sr-only">Card Selection Dialog</div>
        <div className='hide-scrollbar relative flex h-full flex-col items-center gap-6 overflow-y-auto p-5 md:p-6'>
          <ButtonBase
            isLoading={isLoading}
            variant='pink'
            size='circleIcon'
            className='ml-1 mr-auto shrink-0'
            onClick={() => setOpen(false)}
          >
            <span className='mgc_fullscreen_exit_2_fill' />
          </ButtonBase>
          {userCards.length === 0 ? (
            <div className='col-span-3 flex flex-col items-center justify-center'>
              <Lottie animationData={lotties.emptyBox} className='w-[150px] lg:w-[200px]' />
              <p className='px-5 text-center'>Bạn chưa nhận thẻ</p>
            </div>
          ) : (
            <CardSlide
              cards={userCards}
              idCardActive={idCardActive}
              setIdCardActive={setIdCardActive}
              setIdChoose={setIdChoose}
            />
          )}
          <button
            onClick={() => setOpen(false)}
            className='flex size-[87px] shrink-0 items-center justify-center rounded-full bg-pink-main'
            aria-label="Close dialog"
          >
            <img src={images.cardWhite} alt='card-white' />
          </button>
          <ButtonBase
            variant='pink'
            className='w-full'
            onClick={handleUseCard}
            isLoading={isLoading}
            disabled={!idChoose || userCards.length === 0}
          >
            Dùng thẻ này
          </ButtonBase>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default memo(DialogCards)