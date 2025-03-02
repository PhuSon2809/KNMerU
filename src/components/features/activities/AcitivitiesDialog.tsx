import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { FC, memo, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import BgTexture from '~/components/shared/BgTexture'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
import TextareaBase from '~/components/shared/TextareaBase'
import UploadFile from '~/components/shared/UploadFile'
import useResponsive from '~/hooks/useResponsive'
import { getErrorMessage } from '~/utils'

export const commentFormSchema = z.object({
  comment: z.string().min(1, 'Vui lòng nhập bình luận')
})

interface AcitivitiesDialogProps {
  titleDialog: string
  open: boolean
  setOpen: (open: boolean) => void
}

const AcitivitiesDialog: FC<AcitivitiesDialogProps> = memo(({ titleDialog, open, setOpen }) => {
  const [isSent, setIsSent] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

  const xsDown = useResponsive('down', 'xs')

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { comment: '' }
  })

  const onSubmitForm = async (values: z.infer<typeof commentFormSchema>) => {
    if (isLoading) return
    if (selectedFiles.length === 0) return toast.error('Bạn chọn file để gửi bình luận nhé!')
    try {
      setIsLoading(true)
      setIsSent(true)
      console.log('comment from ===> ', values)
    } catch (error) {
      console.log('error', error)
      toast.error(getErrorMessage(error) || 'Gửi bình luận thất bại! Thử lại nhé.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!open) {
      form.reset()
      setIsSent(false)
      setIsLoading(false)
      setSelectedFiles([])
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent noOverlayBackground noBlur>
        <div className='relative flex h-full flex-col gap-6 overflow-hidden p-5 md:p-6'>
          <div
            className={classNames(
              isSent && xsDown && 'mt-12',
              'flex flex-col-reverse items-start justify-between gap-5 pr-[0px] md:flex-row md:gap-0 md:pr-[50px]'
            )}
          >
            <DialogTitle>{titleDialog}</DialogTitle>
            {!isSent && (
              <ButtonBase
                onClick={() => form.handleSubmit(onSubmitForm)()}
                LeftIcon={() => <span className='mgc_send_fill' />}
              >
                Gửi
              </ButtonBase>
            )}
          </div>

          {isSent ? (
            <div className='flex h-full flex-1 flex-col justify-between overflow-auto'>
              <div className='mb-5 rounded-1 bg-green-main/30 p-[22px] pt-4'>
                <p className='mb-3 text-[24px]/[32px] text-gray-7 md:text-[28px]/[40px] lg:text-[32px]/[48px]'>
                  Bạn đã gửi thành công
                </p>
                <div className='flex w-full flex-col items-start gap-3 md:flex-row md:items-end'>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className='size-36 shrink-0 overflow-hidden rounded-1 border border-solid border-gray-1 lg:size-[157px]'
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                  ))}
                  <TextareaBase
                    disabled
                    label='Bình luận'
                    value={form.getValues('comment')}
                    containerClassName='w-full'
                    labelClassName='text-gray-7'
                  />
                </div>
              </div>
              <div className='rounded-2xl bg-orange-main p-4 text-gray-1 text-dongle-24'>
                Sau khi xét duyệt xong bạn sẽ được cộng điểm
              </div>
            </div>
          ) : (
            <FormProvider {...form}>
              <div className='hide-scrollbar flex w-full flex-1 flex-col gap-6 overflow-auto'>
                <div className='mt-5 flex w-full flex-col items-center gap-6 md:flex-row'>
                  <CharactersAvatar />
                  <p className='text-center text-[28px]/[40px] text-blue-main md:text-left lg:mt-4 lg:text-[32px]/[48px]'>
                    {titleDialog === 'Mua merchandise'
                      ? 'Bạn đã mua gì nhỉ?'
                      : 'Bạn đã tham gia sự kiện gì nhỉ'}
                  </p>
                </div>
                <UploadFile selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                <FormField
                  control={form.control}
                  name='comment'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextareaBase
                          {...field}
                          label='Nhập bình luận của bạn'
                          placeholder='Comment'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                        />
                        {fieldState.error?.message && (
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </FormProvider>
          )}
          <BgTexture />
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default AcitivitiesDialog
