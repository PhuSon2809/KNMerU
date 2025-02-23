import React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import classNames from 'classnames'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-[20px]/[30px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        blue: 'bg-blue-main text-white-main',
        pink: 'bg-pink-main text-white-main'
      },
      size: {
        default: 'h-[46px] px-4 py-2',
        md: 'h-[60px] px-4 py-2',
        lg: 'h-[73px] px-4 py-2',
        icon: 'h-[49px] w-[56px] px-4 py-2',
        circleIcon: 'size-[38px]'
      },
      shape: {
        default: 'rounded-[20px]',
        largeRounded: 'rounded-[30px]',
        circle: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'blue',
      size: 'default',
      shape: 'default'
    }
  }
)

export interface ButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    VariantProps<typeof buttonVariants> {
  LeftIcon?: React.ComponentType<{ className: string }>
  RightIcon?: React.ComponentType<{ className: string }>
  isLoading?: boolean
  iconClassName?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => void
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>((props, ref) => {
  const {
    LeftIcon,
    RightIcon,
    iconClassName,
    onClick,
    isLoading,
    className,
    children,
    variant,
    size,
    shape,
    ...rest
  } = props

  const iconClass =
    !iconClassName?.includes('w-') || !iconClassName?.includes('h-')
      ? classNames('w-6 h-6', iconClassName)
      : iconClassName

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={isLoading}
      className={classNames(
        buttonVariants({ variant, size, shape, className }),
        (LeftIcon || RightIcon) && 'gap-x-[10px]'
      )}
      {...rest}
    >
      {isLoading ? (
        <span className={classNames(iconClass, 'mgc_loading_fill animate-spin')} />
      ) : (
        <>
          {LeftIcon && <LeftIcon className={iconClass} />}
          {children && children}
          {RightIcon && <RightIcon className={iconClass} />}
        </>
      )}
    </button>
  )
})

ButtonBase.displayName = 'ButtonBase'
export default React.memo(ButtonBase)
