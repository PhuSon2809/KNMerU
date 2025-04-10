import classNames from 'classnames'
import { Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import GiftItem from '~/components/shared/GiftItem'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getRandomGift, getUserGifts } from '~/store/gift/gift.slice'
import { getErrorMessage, isSuccessRes } from '~/utils'
import CharactersChooseItem from '../choose-characters/CharactersChooseItem'
import { getGeneralInfor } from '~/store/root/root.slice'

interface BlindPocketDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  idxPocket: number
}

const BlindPocketDialog: FC<BlindPocketDialogProps> = memo(({ open, setOpen, idxPocket }) => {
  const dispatch = useAppDispatch()

  const { userInfo } = useAppSelector((s) => s.auth)
  const { characters } = useAppSelector((s) => s.character)
  const { generalInfo } = useAppSelector((s) => s.rootData)
  const {randomGifts, isLoading } = useAppSelector((s) => s.gift)

  const [isViewPocket, setIsViewPocket] = useState<boolean>(false)
  const [isUnboxed, setIsUnboxed] = useState<boolean>(false)

  const character = useMemo(
    () =>
      characters.find((c) => {
        if (userInfo) return c.id === userInfo?.characterId
        return false
      }),
    [characters, userInfo]
  )

  const handelOpenBlindPocket = useCallback(async () => {
    if (!generalInfo) return
    try {
      if (isUnboxed) {
        setIsViewPocket(true)
      } else {
        const res = await dispatch(getRandomGift(generalInfo.classLevel)).unwrap()
        console.log('getRandomGift res 2 ===>', res)
        if (isSuccessRes(res.status)) {
          await dispatch(getGeneralInfor())
          setIsUnboxed(true)
        }
      }
    } catch (error) {
      console.log('Failed to', error)
      toast.error(getErrorMessage(error) || 'Mở quà lỗi! Thử lại nhé')
    }
  }, [isUnboxed, generalInfo, dispatch])

  const handleAddToPocket = useCallback(async () => {
    try {
      await dispatch(getUserGifts()).unwrap()
      setIsViewPocket(true)
      toast.success('Bạn đã nhận thành công món quà! Vui lòng kiểm tra túi quà.', {
        position: 'top-right',
      })
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    } catch (error) {
      console.log('Failed to get user gifts:', error)
      toast.error(getErrorMessage(error) || 'Không thể lấy danh sách quà! Thử lại nhé')
    }
  }, [dispatch])
  
  useEffect(() => {
    if (randomGifts) {
      console.log('randomGifts updated:', randomGifts)
    }
  }, [randomGifts])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent noOverlayBackground noBlur disabledClose={isLoading}>
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
                <div className='rounded-2xl bg-orange-main p-4 text-gray-1 text-dongle-24'>
                  Những món quà này sẽ được gửi đến các bé
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogTitle className='pr-[50px]'>Chúc mừng bạn đã hoàn thành mốc</DialogTitle>
              <div
                className={classNames(
                  isUnboxed && 'justify-center',
                  'flex w-full flex-1 flex-col items-center gap-3'
                )}
              >
                <GiftItem
                  gift={randomGifts || undefined}
                  variant={isUnboxed ? 'gift' : 'unbox'}
                />
                {generalInfo?.classLevel === 1 ||
                generalInfo?.classLevel === 2 ||
                generalInfo?.classLevel === 4 ? (
                  <p className='text-xl'>Bạn chỉ có thể mở khi lên lớp {idxPocket === 0 ? 3 : 5}</p>
                ) : (
                  <ButtonBase
                    disabled={isLoading}
                    variant={isUnboxed ? 'green' : 'pink'}
                    className='w-fit'
                    onClick={isUnboxed ? handleAddToPocket : handelOpenBlindPocket}
                  >
                    {isUnboxed ? 'Bỏ vào túi ngay' : 'Xé túi mù ngay'}
                  </ButtonBase>
                )}
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






// import classNames from 'classnames'
// import { Dispatch, FC, memo, SetStateAction, useCallback, useMemo, useState } from 'react'
// import toast from 'react-hot-toast'
// import BgTexture from '~/components/shared/BgTexture'
// import ButtonBase from '~/components/shared/ButtonBase'
// import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
// import GiftItem from '~/components/shared/GiftItem'
// import { useAppDispatch, useAppSelector } from '~/store/configStore'
// import { getRandomGift, getUserGifts } from '~/store/gift/gift.slice'
// import { getErrorMessage, isSuccessRes } from '~/utils'
// import CharactersChooseItem from '../choose-characters/CharactersChooseItem'
// import { getGeneralInfor } from '~/store/root/root.slice'

// interface BlindPocketDialogProps {
//   open: boolean
//   setOpen: Dispatch<SetStateAction<boolean>>
//   idxPocket: number
// }

// const BlindPocketDialog: FC<BlindPocketDialogProps> = memo(({ open, setOpen, idxPocket }) => {
//   const dispatch = useAppDispatch()

//   const { userInfo } = useAppSelector((s) => s.auth)
//   const { characters } = useAppSelector((s) => s.character)
//   const { generalInfo } = useAppSelector((s) => s.rootData)
//   const { userGifts, randomGifts, isLoading } = useAppSelector((s) => s.gift)

//   const [isViewPocket, setIsViewPocket] = useState<boolean>(false)
//   const [isUnboxed, setIsUnboxed] = useState<boolean>(false)

//   const character = useMemo(
//     () =>
//       characters.find((c) => {
//         if (userInfo) return c.id === userInfo?.characterId
//       }),
//     []
//   )

//   const handelOpenBlindPocket = useCallback(async () => {
//     if (!generalInfo) return
//     try {
//       if (isUnboxed) {
//         setIsViewPocket(true)
//       } else {
//         const res = await dispatch(getRandomGift(generalInfo.classLevel)).unwrap()
//         console.log('getRandomGift res 2 ===>', res)
//         if (isSuccessRes(res.status)) {
//           await dispatch(getGeneralInfor())
//           setIsUnboxed(true)
//         }
//       }
//     } catch (error) {
//       console.log('Failed to', error)
//       toast.error(getErrorMessage(error) || 'Mở quà lỗi! Thử lại nhé')
//     }
//   }, [isUnboxed])

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent noOverlayBackground noBlur disabledClose={isLoading}>
//         <div className='relative flex h-full flex-col gap-6 overflow-hidden p-6'>
//           {isViewPocket ? (
//             <>
//               {character && (
//                 <CharactersChooseItem
//                   character={character}
//                   isShowDetail
//                   isInline
//                   className='z-10'
//                 />
//               )}
//               <div className={classNames('flex flex-1 flex-col gap-3 transition-500')}>
//                 <div className='grid h-full flex-1 grid-cols-3 gap-3'>
//                   {userGifts.map((gift) => (
//                     <GiftItem key={gift.giftId} gift={gift} className='col-span-1' />
//                   ))}
//                 </div>
//                 <div className='rounded-2xl bg-orange-main p-4 text-gray-1 text-dongle-24'>
//                   Những món quà này sẽ được gửi đến các bé
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <DialogTitle className='pr-[50px]'>Chúc mừng bạn đã hoàn thành mốc</DialogTitle>
//               <div
//                 className={classNames(
//                   isUnboxed && 'justify-center',
//                   'flex w-full flex-1 flex-col items-center gap-3'
//                 )}
//               >
//                 <GiftItem
//                   gift={randomGifts ? randomGifts : undefined}
//                   variant={isUnboxed && !isLoading ? 'gift' : 'unbox'}
//                 />
//                 {generalInfo?.classLevel === 1 ||
//                 generalInfo?.classLevel === 2 ||
//                 generalInfo?.classLevel === 4 ? (
//                   <p className='text-xl'>Bạn chỉ có thể mở khi lên lớp {idxPocket === 0 ? 3 : 5}</p>
//                 ) : (
//                   <ButtonBase
//                     disabled={isLoading}
//                     variant={isUnboxed ? 'green' : 'pink'}
//                     className='w-fit'
//                     onClick={isUnboxed ? () => dispatch(getUserGifts()) : handelOpenBlindPocket}
//                   >
//                     {isUnboxed ? 'Bỏ vào túi ngay' : 'Xé túi mù ngay'}
//                   </ButtonBase>
//                 )}
//               </div>
//             </>
//           )}
//           <BgTexture />
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// })

// export default BlindPocketDialog