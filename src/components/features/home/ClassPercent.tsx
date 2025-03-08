import classNames from 'classnames'
import Lottie from 'lottie-react'
import { memo, useMemo, useState } from 'react'
import BlindPocketItem from '~/components/shared/BlindPocketItem'
import { useAppSelector } from '~/store/configStore'
import { getLottieFile, getSkippedLevels } from '~/utils'
import BlindPocketDialog from '../blind-pocket/BlindPocketDialog'

const ClassPercent = memo(() => {
  const { userInfo } = useAppSelector((s) => s.auth)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const [open, setOpen] = useState<boolean>(false)
  const [idxPocket, setIdxPocket] = useState<number>(0)

  const classes = useMemo(() => Array.from({ length: 5 }).map((_, i) => i + 1), [])
  const streak = useMemo(() => Array.from({ length: 20 }).map((_, i) => i + 1), [])
  const skippedLevels = useMemo(
    () => (generalInfo ? getSkippedLevels(generalInfo?.classLevelProgress, generalInfo) : []),
    [generalInfo]
  )

  return (
    <>
      <div className='flex w-full flex-row justify-center gap-8 rounded-1 border-[3px] border-dashed border-blue-main bg-gray-1 p-5 md:flex-col lg:p-6'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          {/* <img
            src={userInfo?.characterImageUrl || images.characters}
            alt={userInfo?.characterName || 'characters'}
            className='h-[130px] w-auto'
          /> */}
          <Lottie
            animationData={getLottieFile(userInfo?.characterOriginalName || '')}
            className='h-[130px] w-auto -translate-x-5'
          />
          {Array.from({ length: 2 }).map((_, idx) => (
            <BlindPocketItem
              key={idx}
              variant={
                (idx === 0 ? generalInfo?.isOpenedFirstGift : generalInfo?.isOpenedSecondGift)
                  ? 'collected'
                  : 'not-collected'
              }
              onClick={() => {
                if (
                  (generalInfo?.classLevel === 3 && generalInfo.isOpenedFirstGift && idx === 0) ||
                  (generalInfo?.classLevel === 5 && generalInfo.isOpenedSecondGift && idx === 1)
                )
                  return
                setIdxPocket(idx)
                setOpen(true)
              }}
            />
          ))}
        </div>
        <div className='h-fit rounded-1 border border-gray-2 bg-gray-1 p-1 shadow-pink md:h-9'>
          <div className='flex size-full flex-col rounded-1 bg-gray-2 md:flex-row'>
            {streak.map((str, idx) => {
              const progress = generalInfo?.classLevelProgress || {}
              const learnedLevels = new Set() // Tập hợp các lớp đã học
              let currentLevel = 1 // Bắt đầu từ lớp 1
              for (const grade in progress) {
                const maxInGrade = progress[grade] // Giá trị tối đa của từng cấp
                for (let i = currentLevel; i < currentLevel + maxInGrade; i++) {
                  learnedLevels.add(i) // Thêm vào danh sách đã học
                }
                currentLevel += 5 // Tăng lên 5 lớp mỗi cấp
              }
              const isSkipped = skippedLevels.includes(str)
              return (
                <div
                  key={str}
                  className={classNames(
                    idx === 0 && 'md:rounded-lt-1 rounded-t-1 md:rounded-bl-1 md:rounded-tr-none',
                    idx === streak.length - 1 &&
                      'rounded-b-1 md:rounded-bl-none md:rounded-br-1 md:rounded-tr-1',
                    idx !== streak.length - 1 && 'border-b border-white md:border-b-0 md:border-r',
                    // generalInfo?.classLevel === 2
                    isSkipped
                      ? 'bg-orange-main' // Nếu lớp bị bỏ qua
                      : learnedLevels.has(str)
                        ? 'bg-blue-main' // Nếu lớp đã học
                        : 'bg-transparent',
                    // generalInfo && (generalInfo?.streak === str || str < generalInfo?.streak)
                    //   ? 'bg-blue-main'
                    //   : 'bg-transparent',
                    'h-8 w-5 md:size-full'
                  )}
                />
              )
            })}
          </div>
        </div>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          {classes.map((item) => (
            <p
              key={item}
              className={classNames(
                item === 3 || item === 5 ? 'text-pink-main' : 'text-blue-main',
                'text-nowrap text-[20px]/[30px]'
              )}
            >
              Lớp {item}
            </p>
          ))}
        </div>
      </div>
      <BlindPocketDialog open={open} setOpen={setOpen} idxPocket={idxPocket} />
    </>
  )
})

export default ClassPercent
