import { FC, memo, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ButtonBase from '~/components/shared/ButtonBase'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '~/components/shared/Drawer'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { logout } from '~/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { TitleDialog } from '../profile/ProfileDialog'
import classNames from 'classnames'
import useResponsive from '~/hooks/useResponsive'
import { EnumQuestionType } from '~/@types/question'
import { isPromoted } from '~/utils'

interface DrawerMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleOpenQuestion: (type: EnumQuestionType) => () => void
  handleOpenDialog: (title: TitleDialog) => void
}

const DrawerMenu: FC<DrawerMenuProps> = memo(
  ({ open, setOpen, handleOpenDialog, handleOpenQuestion }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const mdDown = useResponsive('down', 'md')

    const { generalInfo } = useAppSelector((s) => s.rootData)

    const handleLogout = useCallback(async () => {
      setOpen(false)
      await dispatch(logout())
      navigate(path.login)
      toast.success('Bạn đã dăng xuất thành công')
    }, [])

    const menus = [
      {
        id: 0,
        bg: `${generalInfo?.isCheckedIn ? 'bg-green-main' : 'bg-pink-main text-gray-1'}`,
        title: `${generalInfo?.isCheckedIn ? 'Điểm danh thành công' : 'Điểm danh'}`,
        icon: 'mgc_bling_fill',
        onClick: generalInfo?.isCheckedIn
          ? () => setOpen(false)
          : () => {
              setOpen(false)
              handleOpenQuestion(
                (
                  generalInfo?.isSkippedClass
                    ? (generalInfo.classLevel === 1 && generalInfo.streak <= 5) ||
                      (generalInfo.classLevel === 2 && generalInfo.streak <= 10) ||
                      (generalInfo.classLevel === 3 && generalInfo.streak <= 15) ||
                      (generalInfo.classLevel === 4 && generalInfo.streak <= 20)
                    : isPromoted(generalInfo?.streak as number)
                )
                  ? EnumQuestionType.promoted
                  : EnumQuestionType.daily
              )()
            }
      },
      {
        id: 1,
        bg: 'bg-pink-main text-gray-1',
        title: 'Xem thông tin',
        icon: 'mgc_IDcard_fill',
        onClick: () => {
          setOpen(false)
          handleOpenDialog(TitleDialog.pocket)
        }
      },
      {
        id: 2,
        bg: 'bg-blue-main text-gray-1',
        title: 'Túi quà',
        icon: 'mgc_gift_fill',
        onClick: () => {
          setOpen(false)
          handleOpenDialog(TitleDialog.infor)
        }
      },
      {
        id: 3,
        bg: 'bg-orange-main text-gray-1',
        title: 'Học vượt cấp',
        icon: 'mgc_pen_fill',
        onClick: () => {
          setOpen(false)
          handleOpenQuestion(EnumQuestionType.skipped)()
        }
      },
      {
        id: 4,
        bg: 'bg-gray-2',
        title: 'Đăng xuất',
        icon: 'mgc_arrow_to_left_fill',
        onClick: handleLogout
      }
    ]

    const condition = useMemo(
      () =>
        (generalInfo?.classLevel === 1 || generalInfo?.classLevel === 2) &&
        !generalInfo.isSkippedClass,
      [generalInfo]
    )

    const menuRender = useMemo(
      () =>
        mdDown
          ? condition
            ? menus
            : menus.filter((i) => i.id !== 3)
          : condition
            ? menus.filter((i) => i.id !== 0)
            : menus.filter((i) => i.id !== 0 && i.id !== 3),
      [menus, generalInfo, condition]
    )

    return (
      <Drawer open={open} onOpenChange={setOpen} direction='left'>
        <DrawerContent className='max-w-[300px]'>
          <DrawerHeader>
            <DrawerTitle title='menu' />
            <DrawerDescription />
          </DrawerHeader>
          <div className='flex h-full flex-col items-stretch gap-5 p-3'>
            <div className='flex justify-end'>
              <ButtonBase size='circleIcon' onClick={() => setOpen(false)}>
                <span className='mgc_fullscreen_exit_2_fill' />
              </ButtonBase>
            </div>
            <div className='flex flex-1 flex-col items-stretch gap-2'>
              {menuRender.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={classNames(
                    item.bg,
                    'flex h-11 items-center gap-3 rounded-xl px-3 py-1'
                  )}
                >
                  <span className={item.icon} /> <p>{item.title}</p>
                </button>
              ))}
            </div>
            <Logo className='mx-auto w-[80%]' />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
)

export default DrawerMenu
