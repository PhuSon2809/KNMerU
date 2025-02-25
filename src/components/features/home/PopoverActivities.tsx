import { Dispatch, FC, memo, ReactNode, SetStateAction } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/shared/Popover'

interface PopoverActivitiesProps {
  children: ReactNode
  popoverOpen: boolean
  setPopoverOpen: Dispatch<SetStateAction<boolean>>
  onOpenEventDialog: (title: string) => void
}

const PopoverActivities: FC<PopoverActivitiesProps> = memo(
  ({ children, popoverOpen, setPopoverOpen, onOpenEventDialog }) => {
    const activities = [
      { id: 1, label: 'Mua merchandise', onClick: onOpenEventDialog },
      { id: 2, label: 'Tham gia events', onClick: onOpenEventDialog },
      { id: 3, label: 'Quyên góp hỗ trợ', onClick: onOpenEventDialog }
    ]

    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent align='center' side='top'>
          <div className='flex min-w-[242px] flex-col gap-1 rounded-1 border border-dashed border-gray-2 bg-gray-1 p-2'>
            {activities.map((activ) => (
              <div
                key={activ.id}
                onClick={() => activ.onClick(activ.id === 1 ? activ.label : 'Sự kiện')}
                className='flex items-center gap-[10px] rounded-xl p-2 hover:bg-gray-2 hover:text-pink-main'
              >
                <span className='mgc_fire_fill' />
                <p className='text-dongle-24 mt-1'>{activ.label}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

export default PopoverActivities
