import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react'
import BgTexture from '~/components/shared/BgTexture'
import toast from 'react-hot-toast'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import { Dialog, DialogContent, DialogTitle } from '~/components/shared/Dialog'
import UploadFile from '~/components/shared/UploadFile'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import TextareaBase from '~/components/shared/TextareaBase'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'

export const commentFormSchema = z.object({
  comment: z.string().min(1, 'Vui lòng nhập bình luận')
})

interface AcitivitiesDialogProps {
  titleDialog: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AcitivitiesDialog: FC<AcitivitiesDialogProps> = memo(({ titleDialog, open, setOpen }) => {
  const [isSent, setIsSent] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

  console.log('isSent', isSent)

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { comment: '' }
  })

  const onSubmitForm = async (values: z.infer<typeof commentFormSchema>) => {
    console.log('click')
    if (isLoading) return
    if (selectedFiles.length === 0) return toast.error('Bạn chọn file để gửi bình luận nhé!')
    try {
      setIsLoading(true)
      setIsSent(true)
      console.log('comment from ===> ', values)
    } catch (error) {
      console.log('error', error)
      toast.error('Gửi bình luận thất bại! Thử lại nhé.')
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
        <div className='relative flex h-full flex-col gap-6 overflow-hidden p-6'>
          <div className='flex items-start justify-between pr-[50px]'>
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
            <div className='flex h-full flex-1 flex-col justify-between'>
              <div className='rounded-1 bg-green-main/30 p-[22px]'>
                <p className='text-[32px]/[48px] text-gray-7'>Bạn đã gửi thành công</p>
                <div className='flex w-full items-end gap-3'>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className='size-[157px] shrink-0 overflow-hidden rounded-1 border border-solid border-gray-1'
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
              <div className='text-dongle-24 rounded-2xl bg-orange-main p-4 text-gray-1'>
                Sau khi xét duyệt xong bạn sẽ được cộng điểm
              </div>
            </div>
          ) : (
            <FormProvider {...form}>
              <div className='flex w-full flex-1 flex-col gap-6'>
                <div className='mt-5 flex w-full gap-6'>
                  <CharactersAvatar />
                  <p className='mt-4 text-[32px]/[48px] text-blue-main'>
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
