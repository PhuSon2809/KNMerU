import { memo } from 'react'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent, DialogTrigger } from '~/components/shared/Dialog'
import ActionDialog from '~/components/shared/ActionDialog'

const ActivitiesDialog = memo(() => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonBase
          variant='orange'
          size='lg'
          className='min-w-[212px]'
          LeftIcon={() => <span className='mgc_pen_fill' />}
        >
          Học vượt cấp
        </ButtonBase>
      </DialogTrigger>
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
          <ActionDialog title='Nộp bài' />
        </div>
        <div className='flex w-full flex-col gap-3'></div>
      </DialogContent>
    </Dialog>
  )
})

export default ActivitiesDialog
