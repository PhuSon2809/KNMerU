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
          <div
            className={classNames(
              titleDialog === 'Xem thông tin cá nhân' ? 'gap-6' : '',
              'relative flex h-full flex-col overflow-hidden p-6'
            )}
          >
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
            <div
              className={classNames(
                titleDialog === 'Xem túi quà' ? 'pt-16' : 'pt-0',
                'hide-scrollbar flex w-full flex-1 flex-col gap-3 overflow-y-auto transition-300'
              )}
            >
              <CharactersChooseItem
                isShowDetail={true}
                isInline={titleDialog === 'Xem thông tin cá nhân'}
                className='z-10'
              />
              {titleDialog === 'Xem túi quà' && (
                <>
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
                </>
              )}
              <div
                className={classNames(
                  titleDialog === 'Xem thông tin cá nhân' ? 'translate-y-0' : 'translate-y-[56px]',
                  'flex flex-1 flex-col gap-3 transition-500'
                )}
              >
                <div className='h-full flex-1'></div>
                <div className='text-dongle-24 rounded-2xl bg-orange-main p-4 text-gray-1'>
                  Những món quà này sẽ được gửi đến các bé
                </div>
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
