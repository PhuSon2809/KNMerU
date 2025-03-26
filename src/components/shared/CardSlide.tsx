import { Dispatch, FC, memo, SetStateAction, useCallback } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { Card } from '~/@types'
import CardItem from '../features/card/CardItem'

interface CardItemProps {
  cards: Card[]
  idCardActive: number
  setIdCardActive: Dispatch<SetStateAction<number>>
  setIdChoose?: Dispatch<SetStateAction<number>>
}

const CardSlide: FC<CardItemProps> = ({ cards, setIdChoose, setIdCardActive, idCardActive }) => {
  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      setIdChoose?.(cards[swiper.realIndex].id)
    },
    [setIdChoose, cards]
  )

  return (
    <div className='my-10 flex flex-1 items-center justify-center'>
      <Swiper
        loop
        initialSlide={1}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        className='max-w-[353px]'
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <CardItem
              card={card}
              className='mx-auto'
              isUsed={card.isUsed}
              onOpen={(idSelect) => setIdCardActive(idSelect)}
              status={(card.id || card.cardId) === idCardActive ? 'detail' : 'default'}
              variants={
                card.id === 1 || card.cardId === 1
                  ? 'green'
                  : card.id === 2 || card.cardId === 2
                    ? 'pink'
                    : 'blue'
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default memo(CardSlide)
