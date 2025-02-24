import { memo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { icons } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import toast from 'react-hot-toast'
import { path } from '~/constants/path'

export const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên'),
    email: z.string().email('Email không hợp lệ'),
    phone: z
      .string()
      .min(1, 'Vui lòng nhập số điện thoại')
      .regex(/^(?:\+84|0)(?:\d{9}|\d{10})$/, 'Số điện thoại không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    checkPassword: z.string().min(6, 'Mật khẩu xác nhận phải có ít nhất 6 ký tự')
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['checkPassword']
  })

const Register = memo(() => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: '', email: '', phone: '', password: '', checkPassword: '' }
  })

  const onSubmitForm = async (values: z.infer<typeof registerFormSchema>) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      console.log('register from ===> ', values)
      navigate(path.chooseCharacters)
    } catch (error) {
      console.log('error', error)
      toast.error('Đăng ký thất bại! Thử lại nhé.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative size-full flex-1 pb-40 pt-20 flex-center'>
      <div className='z-10 flex h-full min-w-[569px] flex-col gap-11'>
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
                        type='number'
                        placeholder='0192381923'
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
              <div className='flex items-center gap-[18px]'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Nhập mật khẩu*'
                          placeholder='************'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                          type={showPassword ? 'text' : 'password'}
                          RightIcon={() => (
                            <button onClick={() => setShowPassword((prev) => !prev)}>
                              <span
                                className={showPassword ? 'mgc_eye_fill' : 'mgc_eye_close_fill'}
                              />
                            </button>
                          )}
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
                  name='checkPassword'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Nhập lại mật khẩu*'
                          placeholder='************'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                          type={showPassword ? 'text' : 'password'}
                          RightIcon={() => (
                            <button onClick={() => setShowPassword((prev) => !prev)}>
                              <span
                                className={showPassword ? 'mgc_eye_fill' : 'mgc_eye_close_fill'}
                              />
                            </button>
                          )}
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
                variant='green'
                className='!mt-[46px] w-full'
                onClick={() => form.handleSubmit(onSubmitForm)()}
                LeftIcon={() => <span className='mgc_sun_fill' />}
              >
                Đăng ký ngay
              </ButtonBase>
            </div>
          </FormProvider>
          <div className='flex items-center gap-3'>
            <div className='h-[1px] w-full bg-orange-main' />
            <p className='font-dongle text-2xl text-orange-main'>Hoặc</p>
            <div className='h-[1px] w-full bg-orange-main' />
          </div>
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

      <img src={icons.leaf} alt='leaf' className='absolute inset-0 -rotate-45 scale-75' />
      <img
        src={icons.crown}
        alt='crown'
        className='absolute right-0 top-16 rotate-[25deg] scale-[60%]'
      />
      <img
        src={icons.blink_1}
        alt='blink-1'
        className='xl 2xl: absolute bottom-0 right-5 scale-75'
      />
    </div>
  )
})

export default Register
