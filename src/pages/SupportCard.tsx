import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { claimCards, getCards } from '~/store/card/card.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

const SupportCard = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { userCards } = useAppSelector((s) => s.card)

  const [idCardActive, setIdCardActive] = useState<number>(0)
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const onClick = useCallback(() => {
    if (!showDetail) {
      setShowDetail(true)
    } else if (userCards.length === 0) {
      dispatch(claimCards())
      navigate(path.event)
    }
  }, [showDetail, userCards])

  useEffect(() => {
    dispatch(getCards())
  }, [])

  return (
    <div className='relative flex w-full max-w-3xl flex-col items-stretch justify-center'>
      <div className='-bottom-80 size-[729px] shrink-0 rounded-full bg-skin-main absolute-center-x' />

      <div className='flex w-full flex-col justify-center'>
        <Logo className='h-auto w-[185px]' />
        <h3 className='text-center text-[32px]/[36px] text-pink-main'>🎉 Chúc mừng 🎉</h3>
        <p className='text-xl text-blue-main'>Bạn đã nhận được 3 thẻ bài hỗ trợ!</p>
      </div>

      <div className='flex-1'></div>

      <div className='w-full'>
        <div className='relative'>
          <div className='z-20 rounded-2xl border border-orange-main bg-orange-main p-3 text-center text-sm text-gray-1'>
            “Hãy sử dụng chúng một cách khéo léo để tạo ra cơ hội và vượt qua thử thách phía trước!”
          </div>
          <img src={images.triangle} alt='triangle' className='absolute left-0 z-10' />
        </div>
        <ButtonBase
          variant='pink'
          className=''
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
