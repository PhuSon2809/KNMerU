import { Dispatch, FC, memo, ReactNode, SetStateAction } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/shared/Popover'

const activities = [
  { id: 1, label: 'Mua merchandise' },
  { id: 2, label: 'Tham gia events' },
  { id: 3, label: 'Quyên góp hỗ trợ' }
]

interface PopoverActivitiesProps {
  children: ReactNode
  popoverOpen: boolean
  setPopoverOpen: Dispatch<SetStateAction<boolean>>
}

const PopoverActivities: FC<PopoverActivitiesProps> = memo(
  ({ children, popoverOpen, setPopoverOpen }) => {
    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent align='center' side='top'>
          <div className='flex min-w-[242px] flex-col gap-1 rounded-1 border border-dashed border-gray-2 bg-gray-1 p-2'>
            {activities.map((activ) => (
              <div
                key={activ.id}
                className='flex items-center gap-[10px] rounded-xl p-2 hover:bg-gray-2'
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
