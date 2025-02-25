import classNames from 'classnames'
import { FC, memo } from 'react'
import { images } from '~/assets'

interface BgTextureProps {
  className?: string
}

const BgTexture: FC<BgTextureProps> = memo(({ className }) => {
  return (
    <img
      src={images.bg_texture}
      alt='bg-texture'
      className={classNames(
        'pointer-events-none absolute inset-0 isolate z-50 size-full opacity-55',
        className
      )}
    />
  )
})

export default BgTexture
