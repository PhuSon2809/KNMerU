import { memo, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { icons } from '~/assets'
import ProfileDialog, { TitleDialog } from '~/components/features/profile/ProfileDialog'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { logout } from '~/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'

const Header = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { generalInfo } = useAppSelector((s) => s.rootData)

  const [open, setOpen] = useState<boolean>(false)
  const [titleDialog, setTitleDialog] = useState<TitleDialog>(TitleDialog.infor)

  const handleOpenDialog = useCallback((title: TitleDialog) => {
    setTitleDialog(title)
    setOpen(true)
  }, [])

  const handleLogout = useCallback(async () => {
    await dispatch(logout())
    navigate(path.login)
    toast.success('Bạn đã dăng xuất thành công')
  }, [])

  return (
    <>
      <header className='h-[126px] w-full rounded-1 border-2 border-gray-2 bg-gray-1 p-3 flex-between'>
        <div className='flex h-full items-center gap-6'>
          <ButtonBase variant='green' size='icon' onClick={handleLogout}>
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <CharactersAvatar />
          <p className='text-[32px]/[48px] text-pink-main'>TRANG GIỮ CHUỖI</p>
        </div>
        <div className='flex h-full items-center gap-[10px]'>
          <div className='flex w-[202px] flex-col gap-[10px]'>
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
          <div className='h-full w-[189px] flex-col rounded-2xl border border-gray-2 p-3 text-[20px]/[20px] text-orange-main flex-center'>
            <p className='font-dongle'>Chuỗi hiện tại</p>
            <div className='flex items-center gap-1'>
              <p>{generalInfo?.streak}</p>
              <img src={icons.rose} alt='rose' className='h-auto w-[21px]' />
            </div>
          </div>
          <Logo className='h-full w-auto' />
        </div>
      </header>
      <ProfileDialog
        open={open}
        setOpen={setOpen}
        titleDialog={titleDialog}
        setTitleDialog={setTitleDialog}
      />
    </>
  )
})

export default Header
