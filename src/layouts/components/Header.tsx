import { FC, memo, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { icons } from '~/assets'
import { TitleDialog } from '~/components/features/profile/ProfileDialog'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { logout } from '~/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

interface HeaderProps {
  onOpenDrawer: () => void
  handleOpenDialog: (title: TitleDialog) => void
}

const Header: FC<HeaderProps> = memo(({ onOpenDrawer, handleOpenDialog }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { generalInfo } = useAppSelector((s) => s.rootData)

  const handleLogout = useCallback(async () => {
    await dispatch(logout())
    navigate(path.login)
    toast.success('Bạn đã dăng xuất thành công')
  }, [])

  return (
    <header className='flex h-fit w-full flex-col items-center justify-between gap-5 rounded-1 border-2 border-gray-2 bg-gray-1 p-3 md:h-[126px] md:flex-row'>
      <div className='flex h-full w-full items-center gap-3 md:w-fit xl:gap-6'>
        <ButtonBase variant='green' size='icon' className='hidden lg:flex' onClick={handleLogout}>
          <span className='mgc_arrow_left_fill' />
        </ButtonBase>
        <ButtonBase variant='green' size='icon' className='flex lg:hidden' onClick={onOpenDrawer}>
          <span className='mgc_menu_fill' />
        </ButtonBase>
        <CharactersAvatar className='hidden md:flex' />
        <p className='text-xl text-pink-main md:text-2xl xl:text-[32px]/[48px]'>TRANG GIỮ CHUỖI</p>
      </div>
      <CharactersAvatar className='mt-5 flex md:hidden' />
      <div className='flex h-full w-full items-center gap-[10px] md:w-fit'>
        <div className='hidden w-[202px] flex-col gap-[10px] lg:flex'>
          <ButtonBase
            variant='pink'
            className='w-full !justify-start'
            LeftIcon={() => <span className='mgc_IDcard_fill' />}
            onClick={() => handleOpenDialog(TitleDialog.pocket)}
          >
            Xem thông tin
          </ButtonBase>
          <ButtonBase
            className='w-full !justify-start'
            LeftIcon={() => <span className='mgc_gift_fill' />}
            onClick={() => handleOpenDialog(TitleDialog.infor)}
          >
            Túi quà
          </ButtonBase>
        </div>
        <div className='h-full w-full flex-1 flex-col rounded-2xl border border-gray-2 p-3 text-[20px]/[20px] text-orange-main flex-center md:w-[170px] xl:w-[189px]'>
          <p className='text-nowrap font-dongle'>Chuỗi hiện tại</p>
          <div className='flex items-center gap-1'>
            <p>{generalInfo?.streak}</p>
            <img src={icons.rose} alt='rose' className='h-auto w-[21px]' />
          </div>
        </div>
        <Logo className='hidden h-full w-auto lg:flex' />
      </div>
    </header>
  )
})

export default Header
