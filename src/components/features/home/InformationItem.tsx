import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'

interface InformationItemProps {
  information: Information
  className?: string
}

const InformationItem: FC<InformationItemProps> = memo((props) => {
  const { information, className } = props

  const bgCard = useMemo(
    () => ({
      pink: 'bg-pink-main',
      orange: 'bg-orange-main',
      blue: 'bg-blue-main'
    }),
    []
  )
  return (
    <div
      className={classNames(
        className,
        bgCard[information.variant],
        'relative flex h-full min-h-[195px] w-[388px] flex-col gap-3 rounded-2xl p-4 text-gray-1'
      )}
    >
      <p className='text-[20px]/[30px]'>
        0{information.id} {information.title}
      </p>
      <ul>
        {information.desc.map((item) => (
          <li key={item} className='text-dongle-24'>
            {item}
          </li>
        ))}
      </ul>
      <span className='absolute -bottom-8 right-0 text-[149px] opacity-20'>0{information.id}</span>
    </div>
  )
})

export default InformationItem
