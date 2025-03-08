import classNames from 'classnames'
import Lottie from 'lottie-react'
import { Dispatch, FC, memo, SetStateAction, useMemo, useState } from 'react'
import { lotties } from '~/assets'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import { Dialog, DialogContent } from '~/components/shared/Dialog'
import GiftItem from '~/components/shared/GiftItem'
import InputBase from '~/components/shared/InputBase'
import { useAppSelector } from '~/store/configStore'
import CharactersChooseItem from '../choose-characters/CharactersChooseItem'
import ToggleTab from '~/components/shared/ToggleTab'
import CertificateItem from '../certificate/CertificateItem'

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
    const { generalInfo } = useAppSelector((s) => s.rootData)

    const [tabActive, setTabActive] = useState<number>(0)

    const certificateData = useMemo(
      () => Array.from({ length: (generalInfo?.classLevel as number) - 1 }).map((_, i) => i + 1),
      [generalInfo]
    )

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
                'flex items-center justify-between pr-[50px]'
              )}
            >
              {titleDialog === TitleDialog.infor ? (
                <ToggleTab
                  tabActive={tabActive}
                  allTab={['Túi quà', 'Giấy khen']}
                  onChange={(i: number) => setTabActive(i)}
                  className='h-7 w-40 rounded-full border border-blue-main'
                  selectedClass={{ content: 'bg-blue-main' }}
                />
              ) : (
                <div></div>
              )}
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
                  numberOfCertificate={certificateData.length}
                  tabActive={tabActive}
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
                  <div className='hide-scrollbar h-full flex-1 overflow-y-auto'>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                      {(tabActive === 0 ? userGifts.length > 0 : certificateData.length > 0) ? (
                        tabActive === 0 ? (
                          userGifts.map((gift) => (
                            <GiftItem key={gift.id} gift={gift} className='col-span-1' />
                          ))
                        ) : (
                          certificateData.map((i) => (
                            <CertificateItem key={i} percent={i * 20} className='col-span-1' />
                          ))
                        )
                      ) : (
                        <div className='col-span-3 flex flex-col items-center justify-center'>
                          <Lottie
                            animationData={lotties.emptyBox}
                            className='w-[150px] lg:w-[200px]'
                          />
                          <p className='px-5 text-center'>
                            {tabActive === 0
                              ? 'Bạn chưa có món quà nào trong túi'
                              : 'Bạn chưa nhận giấy khen nào'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='w-full rounded-2xl bg-orange-main p-4 pb-3 text-gray-1 text-dongle-24'>
                    {tabActive === 0
                      ? 'Những món quà này sẽ được gửi đến các bé'
                      : 'Giấy khen bạn đã nhận được'}
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
