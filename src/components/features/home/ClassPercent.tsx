import classNames from 'classnames'
import { memo, useMemo, useState } from 'react'
import { images } from '~/assets'
import BlindPocketItem from '~/components/shared/BlindPocketItem'
import BlindPocketDialog from '../blind-pocket/BlindPocketDialog'
import { useAppSelector } from '~/store/configStore'

const ClassPercent = memo(() => {
  const { userInfo } = useAppSelector((s) => s.auth)

  const [open, setOpen] = useState<boolean>(false)

  const percent = 2 * 25

  const classes = useMemo(() => Array.from({ length: 5 }).map((_, i) => i + 1), [])

  return (
    <>
      <div className='flex w-full flex-col gap-8 rounded-1 border-[3px] border-dashed border-blue-main bg-gray-1 p-6'>
        <div className='flex-between'>
          <img
            src={userInfo?.characterImageUrl || images.characters}
            alt={userInfo?.characterName || 'characters'}
            className='h-[130px] w-auto'
          />
          {Array.from({ length: 2 }).map((_, idx) => (
            <BlindPocketItem key={idx} onClick={() => setOpen(true)} />
          ))}
        </div>
        <div className='h-9 rounded-1 border border-gray-2 bg-gray-1 p-1 shadow-pink'>
          <div className='size-full rounded-1 bg-gray-2'>
            <div
              style={{ width: `${percent}%` }}
              className={classNames(
                percent === 100 ? 'rounded-1' : 'rounded-bl-1 rounded-tl-1',
                'h-full bg-blue-main'
              )}
            />
          </div>
        </div>
        <div className='flex-between'>
          {classes.map((item) => (
            <p
              key={item}
              className={classNames(
                item === 3 || item === 5 ? 'text-pink-main' : 'text-blue-main',
                'text-[20px]/[30px]'
              )}
            >
              Lớp {item}
            </p>
          ))}
        </div>
      </div>

      <BlindPocketDialog open={open} setOpen={setOpen} />
    </>
  )
})

export default ClassPercent
