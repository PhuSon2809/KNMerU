import { FC, memo } from 'react'
import ButtonBase from './ButtonBase'

interface ActionDialogProps {
  title: string
  onClick: () => void
}

const ActionDialog: FC<ActionDialogProps> = memo(({ title }) => {
  return (
    <div className='flex items-center gap-3'>
      <ButtonBase className='' variant='pink'>
        {title}
      </ButtonBase>
      <div className='size-[38px] shrink-0'></div>
    </div>
  )
})

export default ActionDialog
