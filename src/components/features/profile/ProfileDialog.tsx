import { Dispatch, FC, memo, SetStateAction } from 'react'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent } from '~/components/shared/Dialog'
import InputBase from '~/components/shared/InputBase'
import CharactersChooseItem from '../choose-characters/CharactersChooseItem'
import classNames from 'classnames'

interface ProfileDialogProps {
  titleDialog: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setTitleDialog: Dispatch<SetStateAction<string>>
}

const ProfileDialog: FC<ProfileDialogProps> = memo(
  ({ titleDialog, open, setOpen, setTitleDialog }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent noOverlayBackground noBlur>
          <div className={classNames('relative flex h-full flex-col overflow-hidden p-6')}>
            <div className='flex justify-end pr-[50px]'>
              <ButtonBase
                variant='pink'
                onClick={() =>
                  setTitleDialog(
                    titleDialog === 'Xem túi quà' ? 'Xem thông tin cá nhân' : 'Xem túi quà'
                  )
                }
              >
                {titleDialog}
              </ButtonBase>
            </div>
            <div className='hide-scrollbar flex w-full flex-1 flex-col gap-3 overflow-y-auto pt-16'>
              <CharactersChooseItem isShowDetail={true} className='z-10' />
              <div className='flex w-full items-center gap-6'>
                <InputBase
                  label='Tên của bạn'
                  value='Nguyễn Văn A'
                  disabled
                  containerClassName='w-full'
                />
                <InputBase
                  label='Email'
                  value='VanA111@gmail.com'
                  disabled
                  containerClassName='w-full'
                />
              </div>
              <div className='flex w-full items-center gap-6'>
                <InputBase
                  label='Số điện thoại'
                  value='0192381923'
                  disabled
                  containerClassName='w-full'
                />
                <InputBase
                  label='Mật khẩu'
                  value='************'
                  disabled
                  containerClassName='w-full'
                />
              </div>
            </div>
            <BgTexture />
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

export default ProfileDialog
