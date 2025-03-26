import classNames from 'classnames'
import { FC, memo } from 'react'
import { images } from '~/assets'

interface CommentProps {
  content: string
  className?: string
}

const Comment: FC<CommentProps> = ({ content, className }) => {
  return (
    <div className={classNames('relative', className)}>
      <div className='z-20 rounded-2xl border border-orange-main bg-orange-main p-3 text-center text-sm text-gray-1'>
        {content}
      </div>
      <img src={images.triangle} alt='triangle' className='absolute -bottom-4 left-0 z-10' />
    </div>
  )
}

export default memo(Comment)
