import { memo } from 'react'

const BlindPocketItem = memo(() => {
  return (
    <div className='relative h-[87px] w-[82px] rounded-xl border border-gray-2 text-gray-3 flex-center'>
      <span className='mgc_' />
      <span className='mgc_ absolute' />
      <p className='text-[20px]/[30px]'>Túi mù</p>
    </div>
  )
})

export default BlindPocketItem
