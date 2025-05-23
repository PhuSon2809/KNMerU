import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import classNames from 'classnames'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={classNames(
      'fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  noOverlayBackground?: boolean
  noBlur?: boolean
  hideClose?: boolean
  disabledClose?: boolean
  disabledBgDialog?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      noOverlayBackground = false,
      noBlur = false,
      hideClose = false,
      disabledClose = false,
      disabledBgDialog = false,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay
        className={classNames(
          noOverlayBackground ? 'bg-transparent' : 'bg-black/30',
          noBlur ? 'backdrop-blur-none' : 'backdrop-blur-sm'
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={classNames(
          'fixed left-[50%] top-[50%] z-50 flex h-fit min-h-[90%] shrink-0 translate-x-[-50%] translate-y-[-50%] flex-col gap-[10px] rounded-1 border-gray-2 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:h-[500px] md:w-[500px] lg:h-[550px] lg:w-[674px] xl:h-[610px]',
          !disabledBgDialog ? 'max-h-[90%] w-[90%] border bg-white shadow-lg' : 'w-full',
          className
        )}
        onInteractOutside={(event) => disabledClose && event.preventDefault()}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            disabled={disabledClose}
            className='absolute right-5 top-6 size-[38px] rounded-full bg-blue-main text-gray-1 opacity-90 transition-opacity flex-center hover:opacity-100 focus:outline-none disabled:pointer-events-none md:right-6 md:top-7'
          >
            <span className='mgc_fullscreen_exit_2_fill' />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={classNames('text-[28px]/[40px] text-blue-main lg:text-[32px]/[48px]', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={classNames('text-muted-foreground text-sm', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
