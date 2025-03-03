import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React, { FC, memo } from 'react'
import BgTexture from '~/components/shared/BgTexture'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import CertificateLarge from './CertificateLarge'

interface CertificateDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const CertificateDialog: FC<CertificateDialogProps> = memo(({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent noBlur noOverlayBackground>
        <VisuallyHidden>
          <DialogTitle>Hidden Title</DialogTitle>
        </VisuallyHidden>
        <div className='relative flex h-full flex-col gap-6 overflow-hidden p-5 md:p-6'>
          <div className='flex flex-col-reverse items-start justify-between gap-3 md:flex-row md:gap-0'>
            <h4 className='mr-[50px] text-[24px]/[32px] text-blue-main lg:text-[32px]/[48px]'>
              Chúc mừng bạn đã hoàn thành mốc
            </h4>
          </div>
          <CertificateLarge />
          <BgTexture />
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default CertificateDialog
