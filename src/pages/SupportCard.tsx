import { memo, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CardItem from '~/components/features/card/CardItem'
import ButtonBase from '~/components/shared/ButtonBase'
import CardSlide from '~/components/shared/CardSlide'
import Comment from '~/components/shared/Comment'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { claimCards, getCards, getUserCards } from '~/store/card/card.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getErrorMessage, isSuccessRes } from '~/utils'

const SupportCard = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { userCards, cards } = useAppSelector((s) => s.card)

  const [idCardActive, setIdCardActive] = useState<number>(0)
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const onClick = useCallback(async () => {
    try {
      if (!showDetail) {
        setShowDetail(true)
      } else if (userCards.length === 0) {
        const res = await dispatch(claimCards()).unwrap()
        if (isSuccessRes(res.status)) {
          dispatch(getUserCards())
          toast.error('Chúc mừng bạn đã nhận được 3 thẻ!')
          navigate(path.event)
        }
      } else if (userCards.length > 0) {
        navigate(path.event)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(getErrorMessage(error))
    }
  }, [showDetail, userCards])

  useEffect(() => {
    dispatch(getCards())
    dispatch(getUserCards())
  }, [])

  return (
    <div className='relative mx-auto flex size-full max-w-3xl flex-1 flex-col items-stretch justify-center overflow-hidden px-4 py-[30px]'>
      <div className='-bottom-[300px] z-[-1] size-[729px] shrink-0 rounded-full bg-skin-main opacity-30 absolute-center-x md:-bottom-[400px] md:size-[900px]' />
      <div className='flex w-full flex-col items-center gap-3 text-center'>
        <Logo className='mb-8 h-auto w-[185px]' />
        <h3 className='text-[32px]/[36px] text-pink-main'>🎉 Chúc mừng 🎉</h3>
        <p className='text-xl text-blue-main'>Bạn đã nhận được 3 thẻ bài hỗ trợ!</p>
      </div>

      {showDetail ? (
        <CardSlide cards={cards} idCardActive={idCardActive} setIdCardActive={setIdCardActive} />
      ) : (
        <div className='relative my-10 flex flex-1 items-center justify-center'>
          {cards[0] && (
            <CardItem
              status='default'
              variants='green'
              card={cards[0]}
              onOpen={(id) => setIdCardActive(id)}
              className='rotate-left absolute z-10 w-full'
            />
          )}
          {cards[1] && (
            <CardItem
              status='default'
              variants='pink'
              card={cards[1]}
              onOpen={(id) => setIdCardActive(id)}
              className='scale z-30 mr-5'
            />
          )}
          {cards[2] && (
            <CardItem
              status='default'
              variants='blue'
              card={cards[2]}
              onOpen={(id) => setIdCardActive(id)}
              className='rotate-Right absolute z-20'
            />
          )}
        </div>
      )}

      <div className='mx-auto flex w-full max-w-[359px] flex-col items-center gap-8'>
        <Comment content='“Hãy sử dụng chúng một cách khéo léo để tạo ra cơ hội và vượt qua thử thách phía trước!”' />
        <ButtonBase
          variant='pink'
          className='w-full'
          LeftIcon={() => <span className='mgc_mailbox_fill' />}
          onClick={onClick}
        >
          Xem chi tiết
        </ButtonBase>
      </div>
    </div>
  )
})

export default SupportCard
