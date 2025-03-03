import { memo, useState } from 'react'
import classNames from 'classnames'

interface SelectedProps {
  wrap?: string
  content?: string
  text?: string
}

interface IToggleTab {
  tabActive: number
  allTab: string[]
  defaultTab?: string
  onChange?: any
  className?: string
  selectedClass?: SelectedProps
}

const ToggleTab = memo(
  ({ allTab, defaultTab, onChange, className, selectedClass, tabActive }: IToggleTab) => {
    const [tab, setTab] = useState(defaultTab ? allTab.indexOf(defaultTab) : 0)

    const handleChange = (i) => () => {
      setTab(i)
      onChange?.(i)
    }

    return (
      <div className={classNames(className, 'relative')}>
        <div className={classNames('flex size-full rounded-[inherit] bg-transparent')}>
          {allTab.map((item, i) => (
            <div key={item} onClick={handleChange(i)} className='z-10 size-full flex-center'>
              <p
                className={classNames(
                  'text-center',
                  selectedClass?.text,
                  tabActive === i && 'font-semibold'
                )}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <div
          className={classNames(
            'rounded-[inherit] transition-transform duration-200 ease-in-out',
            selectedClass?.wrap ?? 'absolute left-0 top-0 h-full p-1'
          )}
          style={{
            width: `${100 / allTab.length}%`,
            transform: `translateX(${100 * tab}%)`
          }}
        >
          <div
            className={classNames(
              selectedClass?.content ?? 'bg-white',
              'h-full w-full rounded-[inherit]'
            )}
          />
        </div>
      </div>
    )
  }
)

export default ToggleTab
