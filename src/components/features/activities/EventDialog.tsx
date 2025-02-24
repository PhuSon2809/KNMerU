import { memo } from 'react'
import { Dialog, DialogContent } from '~/components/shared/Dialog'

const EventDialog = memo(() => {
  return (
    <Dialog>
      <DialogContent
        noOverlayBackground
        noBlur
        hideClose
        className='w-[calc(100vw-1rem)] max-w-[360px] rounded-xl lg:w-full'
      >
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-1'>
            <h4 className='text-[px]/[px] text-blue-main'>Học vượt cấp</h4>
            <span className='font-dongle'>Đây là bài kiểm tra vượt cấp</span>
            <div className='rounded-1 bg-orange-main flex-center'>
              <span className='font-dongle'>Bao gồm 6 câu hỏi</span>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-3'></div>
      </DialogContent>
    </Dialog>
  )
})

export default EventDialog
