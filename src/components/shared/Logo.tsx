import classNames from 'classnames'
import { FC, memo } from 'react'
import { logo } from '~/assets'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={classNames(className)}>
      <img src={logo} alt='logo-KNMerU' className='size-full' />
    </div>
  )
}

Logo.displayName = 'Logo'
export default memo(Logo)
