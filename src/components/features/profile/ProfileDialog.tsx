import classNames from 'classnames'
import Lottie from 'lottie-react'
import { Dispatch, FC, memo, SetStateAction, useMemo } from 'react'
import { lotties } from '~/assets'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent } from '~/components/shared/Dialog'
import GiftItem from '~/components/shared/GiftItem'
import InputBase from '~/components/shared/InputBase'
import { useAppSelector } from '~/store/configStore'
import CharactersChooseItem from '../choose-characters/CharactersChooseItem'

export enum TitleDialog {
  infor = 'Xem thông tin cá nhân',
  pocket = 'Xem túi quà'
}
interface ProfileDialogProps {
  titleDialog: TitleDialog
  open: boolean
  setOpen: (open: boolean) => void
  setTitleDialog: Dispatch<SetStateAction<TitleDialog>>
}

const ProfileDialog: FC<ProfileDialogProps> = memo(
  ({ titleDialog, open, setOpen, setTitleDialog }) => {
    const { userInfo } = useAppSelector((s) => s.auth)
    const { userGifts } = useAppSelector((s) => s.gift)
    const { characters } = useAppSelector((s) => s.character)

    const character = useMemo(
      () =>
        characters.find((c) => {
          if (userInfo) return c.id === userInfo?.characterId
        }),
      []
    )

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent noOverlayBackground noBlur>
          <div
            className={classNames(
              titleDialog === TitleDialog.infor ? 'gap-6' : '',
              'relative flex h-full flex-col overflow-hidden p-6'
            )}
          >
            <div
              className={classNames(
                titleDialog === TitleDialog.pocket && 'mb-5',
                'flex justify-end pr-[50px]'
              )}
            >
              <ButtonBase
                variant='pink'
                onClick={() =>
                  setTitleDialog(
                    titleDialog === TitleDialog.pocket ? TitleDialog.infor : TitleDialog.pocket
                  )
                }
              >
                {titleDialog}
              </ButtonBase>
            </div>
            <div
              className={classNames(
                titleDialog === TitleDialog.pocket
                  ? 'hide-scrollbar overflow-y-auto pt-5 md:pt-11 lg:pt-16'
                  : 'overflow-hidden pt-0',
                'flex max-h-full w-full flex-1 flex-col items-center gap-5 transition-300 md:gap-3'
              )}
            >
              {character && (
                <CharactersChooseItem
                  disable
                  isShowDetail
                  isInDialog
                  className='z-10'
                  character={character}
                  isInline={titleDialog === TitleDialog.infor}
                  numberOfGift={userGifts.length}
                />
              )}
              {titleDialog === TitleDialog.pocket && (
                <>
                  <div className='flex w-full flex-col items-center gap-5 md:flex-row md:gap-6'>
                    <InputBase
                      label='Tên của bạn'
                      value={userInfo?.fullName}
                      disabled
                      containerClassName='w-full'
                    />
                    <InputBase
                      label='Email'
                      value={userInfo?.email}
                      disabled
                      containerClassName='w-full'
                    />
                  </div>
                  {/* <div className='flex w-full flex-col items-center gap-5 md:flex-row md:gap-6'>
                    <InputBase
                      label='Số điện thoại'
                      value={userInfo?.phoneNumber || '**********'}
                      disabled
                      containerClassName='w-full'
                    />
                    <InputBase
                      label='Mật khẩu'
                      value='************'
                      disabled
                      containerClassName='w-full'
                    />
                  </div> */}
                </>
              )}
              {titleDialog === TitleDialog.infor && (
                <>
                  <div className='hide-scrollbar grid h-full flex-1 grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3'>
                    {userGifts.length > 0 ? (
                      userGifts.map((gift) => (
                        <GiftItem key={gift.id} gift={gift} className='col-span-1' />
                      ))
                    ) : (
                      <div className='col-span-3 flex flex-col items-center justify-center'>
                        <Lottie
                          animationData={lotties.emptyBox}
                          className='w-[150px] lg:w-[200px]'
                        />
                        <p className='px-5 text-center'>Bạn chưa có món quà nào trong túi</p>
                      </div>
                    )}
                  </div>
                  <div className='w-full rounded-2xl bg-orange-main p-4 pb-3 text-gray-1 text-dongle-24'>
                    Những món quà này sẽ được gửi đến các bé
                  </div>
                </>
              )}
            </div>
            <BgTexture />
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

export default ProfileDialog
