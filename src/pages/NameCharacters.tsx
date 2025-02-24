import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import CharactersChooseItem from '~/components/features/choose-characters/CharactersChooseItem'
import ButtonBase from '~/components/shared/ButtonBase'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import TitleCharacters from '~/components/shared/TitleCharacters'
import { path } from '~/constants/path'

export const nameFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Tên phải có ít nhất 3 ký tự.')
    .max(20, 'Tên không được vượt quá 20 ký tự.')
    .regex(
      /^[A-Za-z0-9]+$/,
      'Tên chỉ được chứa chữ cái (A-Z, a-z) và số (0-9), không chứa ký tự đặc biệt, dấu cách hoặc dấu gạch dưới.'
    )
})

const NameCharacters = memo(() => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { name: '' }
  })

  const onSubmitForm = async (values: z.infer<typeof nameFormSchema>) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      console.log('name from ===> ', values)
      navigate(path.home)
    } catch (error) {
      console.log('error', error)
      toast.error('Đặt tên thất bại! Thử lại nhé.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative flex size-full flex-1 flex-col items-stretch overflow-hidden pb-[200px] pt-[50px]'>
      <div className='z-[10] flex w-full flex-col gap-20'>
        <TitleCharacters title='Đặt tên nhân vật' />
        <div className='flex w-full items-start justify-center gap-10 pt-10'>
          <CharactersChooseItem isSelected />
          <FormProvider {...form}>
            <div className='flex flex-col items-start gap-3'>
              <div className='flex items-center gap-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Tên nhân vật'
                          placeholder='Nguyễn Văn A'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                          containerClassName='w-[318px]'
                        />
                        {fieldState.error?.message && (
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className='mgc_check_circle_line mt-8 text-gray-5' />
              </div>

              <div className='rounded-1 bg-blue-main px-2 pb-[2px] pt-1 font-dongle text-gray-1'>
                Tên nhân vật sẽ không thể thay đổi, bạn lưu ý khi đặt tên cho bé nha*
              </div>

              <ul className='font-dongle text-[20px]/[20px] text-orange-main'>
                <li>Tên phải có từ 3 đến 20 ký tự.</li>
                <li>Chỉ bao gồm chữ cái (A-Z, a-z) và số (0-9).</li>
                <li>Không chứa ký tự đặc biệt (!@#$%^&...), dấu cách hoặc dấu gạch dưới.</li>
              </ul>
            </div>
          </FormProvider>
        </div>
        <div className='w-full gap-[25px] flex-center'>
          <ButtonBase variant='green' size='icon' onClick={() => navigate(-1)}>
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <ButtonBase
            variant='pink'
            onClick={() => form.handleSubmit(onSubmitForm)()}
            LeftIcon={() => <span className='mgc_palette_2_fill' />}
          >
            Xác nhận
          </ButtonBase>
        </div>
      </div>
      <div className='-bottom-[1340px] size-[1570px] shrink-0 rounded-full bg-yellow-main absolute-center-x' />
    </div>
  )
})

export default NameCharacters
