import React from 'react'
import classNames from 'classnames'
import { images } from '~/assets'

interface Icon {
  className?: string
}

export interface TextareaBaseProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  labelClassName?: string
  containerClassName?: string
  containerInputClassName?: string
  LeftIcon?: React.ComponentType<Icon>
  RightIcon?: React.ComponentType<Icon>
  label?: string
  error?: string
  iconClassName?: string
}

const TextareaBase = React.forwardRef<HTMLTextAreaElement, TextareaBaseProps>((props, ref) => {
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
          'relative flex h-[103px] items-center gap-2 rounded px-3 py-2',
          LeftIcon || RightIcon ? '' : '',
          containerInputClassName
        )}
      >
        {LeftIcon && <LeftIcon className={classNames('h-6 w-6', iconClassName)} />}

        <textarea
          ref={ref}
          className={classNames(
            'h-full w-full appearance-none bg-transparent px-3 font-dongle text-2xl leading-tight focus:outline-none',
            className
          )}
          {...inputProps}
        />

        {RightIcon && <RightIcon className={classNames('h-6 w-6', iconClassName)} />}
        <img
          src={images.bg_textarea}
          alt='bg-textarea'
          className='absolute inset-0 -z-[1] h-full'
        />
      </div>
    </div>
  )
})

TextareaBase.displayName = 'TextareaBase'
export default React.memo(TextareaBase)
