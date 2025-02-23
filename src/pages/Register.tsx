import { memo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { icons } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import toast from 'react-hot-toast'

export const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên'),
    email: z
      .string()
      .min(1, 'Vui lòng nhập email')
      .email('Định dạng email không hợp lệ'),
    phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu nhập lại chưa khớp'
  })

const Register = memo(() => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmitForm = async (values: z.infer<typeof registerFormSchema>) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      console.log('register form ===> ', values)
      toast.success('Đăng ký thành công!')
    } catch (error) {
      console.log('error', error)
      toast.error('Đăng ký thất bại! Thử lại nhé.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative size-full flex-1 flex-center'>
      <div className='flex min-w-[569px] flex-col gap-11'>
        <div className='flex items-center justify-between'>
          <ButtonBase variant='green' size='icon' onClick={() => navigate(-1)}>
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <Logo className='h-[110px] w-auto' />
          <div></div>
        </div>

        <div className='space-y-5 rounded-1 border-[3px] border-dashed border-pink-main bg-white/90 p-6 backdrop-blur-[20px]'>
          <FormProvider {...form}>
            <div className='space-y-[18px]'>
              <FormField
                control={form.control}
                name='name'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <InputBase
                        {...field}
                        label='Tên của bạn*'
                        placeholder='Nguyễn Văn A'
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

              <FormField
                control={form.control}
                name='email'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <InputBase
                        {...field}
                        label='Email*'
                        placeholder='VanA111@gmail.com'
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

              <FormField
                control={form.control}
                name='phone'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <InputBase
                        {...field}
                        label='Số điện thoại*'
                        placeholder='0123456789'
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
              <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full md:w-1/2 relative">
                      <FormControl>
                        <InputBase
                          {...field}
                          type={showPassword ? "text" : "password"}
                          label="Mật khẩu*"
                          placeholder="Nhập mật khẩu"
                          value={field.value || ""}
                          className="bg-password"
                          error={fieldState.error?.message}
                        />
                        {fieldState.error?.message && (
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full md:w-1/2 relative">
                      <FormControl>
                        <InputBase
                          {...field}
                          type={showPassword ? "text" : "password"}
                          label="Nhập lại mật khẩu*"
                          placeholder="Nhập lại mật khẩu"
                          value={field.value || ""}
                          className="bg-confirm-password"
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

              <ButtonBase
                size='md'
                className='!mt-[46px] w-full'
                onClick={() => form.handleSubmit(onSubmitForm)()}
                LeftIcon={() => <span className='mgc_moon_stars_fill' />}
                disabled={isLoading}
              >
                Đăng ký ngay
              </ButtonBase>
            </div>
          </FormProvider>

          {/* Phần line hoặc */}
          <div className='flex items-center gap-3'>
            <div className='h-[1px] w-full bg-orange-main' />
            <p className='font-dongle text-2xl text-orange-main'>Hoặc</p>
            <div className='h-[1px] w-full bg-orange-main' />
          </div>

          {/* Các nút đăng nhập social */}
          <div className='flex items-center gap-[25px]'>
            <ButtonBase size='md' variant='gray' className='w-full'>
              <span className='mgc_facebook_fill' />
            </ButtonBase>
            <ButtonBase size='md' variant='gray' className='w-full'>
              <span className='mgc_mail_fill' />
            </ButtonBase>
          </div>
        </div>
      </div>

      {/* Các icon trang trí */}
      <img
        src={icons.leaf}
        alt='leaf'
        className='absolute inset-0 -rotate-45 scale-75'
      />
      <img
        src={icons.crown}
        alt='crown'
        className='absolute right-0 top-5 scale-75'
      />
      <img
        src={icons.blink_1}
        alt='blink-1'
        className='xl 2xl: absolute bottom-0 right-10 scale-75'
      />
    </div>
  )
})

export default Register
