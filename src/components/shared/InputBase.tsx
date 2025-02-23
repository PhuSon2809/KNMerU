import React from 'react'
import classNames from 'classnames'
import { images } from '~/assets'

interface Icon {
  className?: string
}

export interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string
  containerClassName?: string
  containerInputClassName?: string
  LeftIcon?: React.ComponentType<Icon>
  RightIcon?: React.ComponentType<Icon>
  label?: string
  error?: string
  iconClassName?: string
}

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>((props, ref) => {
  const {
    label,
    containerClassName,
    containerInputClassName,
    labelClassName,
    LeftIcon,
    RightIcon,
    className,
    iconClassName,
    ...inputProps
  } = props

  return (
    <div className={containerClassName}>
      {label && (
        <p className={classNames('mb-2 text-[20px]/[30px] text-gray-4', labelClassName)}>{label}</p>
      )}

      <div
        onClick={focus}
        className={classNames(
          'relative flex h-[50px] items-center gap-2 rounded py-2',
          LeftIcon || RightIcon ? 'px-3' : '',
          containerInputClassName
        )}
      >
        {LeftIcon && <LeftIcon className={classNames('h-6 w-6', iconClassName)} />}

        <input
          ref={ref}
          className={classNames(
            'h-full w-full appearance-none bg-transparent px-3 font-dongle text-2xl leading-tight focus:outline-none',
            className
          )}
          {...inputProps}
        />

        {RightIcon && <RightIcon className={classNames('h-6 w-6', iconClassName)} />}
        <img src={images.bg_input} alt='bg-input' className='absolute inset-0 -z-[1]' />
      </div>
    </div>
  )
})

InputBase.displayName = 'InputBase'
export default React.memo(InputBase)
