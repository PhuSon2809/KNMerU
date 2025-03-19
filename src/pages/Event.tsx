import { memo } from 'react'
import { icons } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'
import { useAppSelector } from '~/store/configStore'

const Event = memo(() => {
  const { generalInfo } = useAppSelector((s) => s.rootData)

  return (
    <div className='flex w-full max-w-3xl flex-col items-stretch'>
      <div className='flex items-center justify-between'>
        <Logo />
        <div className='h-full w-full flex-1 flex-col rounded-2xl border border-gray-2 p-3 text-[20px]/[20px] text-orange-main flex-center md:w-[170px] xl:w-[189px]'>
          <p className='text-nowrap font-dongle'>Chuỗi hiện tại</p>
          <div className='flex items-center gap-1'>
            <p>{generalInfo?.streak}</p>
            <img src={icons.rose} alt='rose' className='h-auto w-[21px]' />
          </div>
        </div>
      </div>

      {/* Step */}
      <div></div>

      <ButtonBase variant='pink'></ButtonBase>
    </div>
  )
})

export default Event
