import classNames from 'classnames'
import Lottie from 'lottie-react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import BlindPocketItem from '~/components/shared/BlindPocketItem'
import { useAppSelector } from '~/store/configStore'
import { getLottieFile, getSkippedLevels } from '~/utils'
import BlindPocketDialog from '../blind-pocket/BlindPocketDialog'
import { lotties } from '~/assets'
import useResponsive from '~/hooks/useResponsive'

const ClassPercent = memo(() => {
  const { userInfo } = useAppSelector((s) => s.auth)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const divRef = useRef<HTMLDivElement>(null)

  const mdDown = useResponsive('down', 'md')

  const [open, setOpen] = useState<boolean>(false)
  const [idxPocket, setIdxPocket] = useState<number>(0)
  const [divWidth, setDivWidth] = useState<number>(0)

  const classes = useMemo(() => Array.from({ length: 5 }).map((_, i) => i + 1), [])
  const streak = useMemo(() => Array.from({ length: 20 }).map((_, i) => i + 1), [])
  const skippedLevels = useMemo(
    () => (generalInfo ? getSkippedLevels(generalInfo?.classLevelProgress, generalInfo) : []),
    [generalInfo]
  )

  useEffect(() => {
    if (!divRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setDivWidth(entry.contentRect.width)
    })
    observer.observe(divRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className='flex w-full flex-row justify-center gap-8 rounded-1 border-[3px] border-dashed border-blue-main bg-gray-1 p-5 md:flex-col lg:p-6'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          {/* <img
            src={userInfo?.characterImageUrl || images.characters}
            alt={userInfo?.characterName || 'characters'}
            className='h-[130px] w-auto'
          /> */}
          {/* <Lottie
            animationData={getLottieFile(userInfo?.characterOriginalName || '')}
            className='h-[130px] w-auto -translate-x-5'
          /> */}
          <Lottie animationData={lotties.flag} className='h-auto w-[100px] -translate-x-4' />
          {/* <div className='w-[82px]'></div> */}
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
        <div className='mt-5 h-fit rounded-1 border border-gray-2 bg-gray-1 p-1 shadow-pink md:h-9'>
          <div className='relative flex size-full flex-col rounded-1 bg-gray-2 md:flex-row'>
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
              console.log('learnedLevels', learnedLevels)
              return (
                <>
                  <div
                    key={str}
                    ref={divRef}
                    className={classNames(
                      idx === 0 && 'md:rounded-lt-1 rounded-t-1 md:rounded-bl-1 md:rounded-tr-none',
                      idx === streak.length - 1 &&
                        'rounded-b-1 md:rounded-bl-none md:rounded-br-1 md:rounded-tr-1',
                      idx !== streak.length - 1 &&
                        'border-b border-white md:border-b-0 md:border-r',
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
                </>
              )
            })}
            <Lottie
              animationData={getLottieFile(userInfo?.characterOriginalName || '')}
              className={classNames(
                'absolute h-[80px] w-20 transition-transform duration-500 ease-in-out md:top-[-65px] md:h-[60px] md:w-auto lg:top-[-80px] lg:h-[80px]',
                skippedLevels.length === 0 &&
                  Number(generalInfo?.streak) === 0 &&
                  !mdDown &&
                  '-left-7',
                mdDown ? '-left-20' : 'top-0'
              )}
              style={{
                transform: mdDown
                  ? `translateY(${(divWidth + 12) * (skippedLevels.length + Number(generalInfo?.streak)) + 20}%)`
                  : `translateX(${divWidth * 1.1 * (skippedLevels.length + Number(generalInfo?.streak)) + 20}%)`
              }}
            />
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
