import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { icons } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { socials } from '~/mocks/data'
import { getUserInfor, login } from '~/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { isSuccessRes } from '~/utils'

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không đúng định dạng'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu')
})

const Login = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isLoading } = useAppSelector((s) => s.auth)

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmitForm = useCallback(async (values: z.infer<typeof loginFormSchema>) => {
    if (isLoading) return
    try {
      const payload = await dispatch(login(values)).unwrap()
      if (!isSuccessRes(payload.status)) return toast.error('Đăng nhập thất bại! Thử lại nhé.')
      const payloadUserInfor = await dispatch(getUserInfor()).unwrap()
      if (isSuccessRes(payloadUserInfor.status) && payloadUserInfor.data.characterId !== null) {
        navigate(path.home)
      } else {
        navigate(path.chooseCharacters)
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Đăng nhâp thất bại! Thử lại nhé.')
    }
  }, [])

  return (
    <div className='relative size-full flex-1 pb-40 pt-20 flex-center'>
      <div className='z-10 flex min-w-[569px] flex-col gap-11'>
        <div className='flex items-center justify-between'>
          <ButtonBase variant='green' size='icon' onClick={() => navigate(path.welcome)}>
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
              <ButtonBase
                size='md'
                className='!mt-[46px] w-full'
                isLoading={isLoading}
                onClick={() => form.handleSubmit(onSubmitForm)()}
                LeftIcon={() => <span className='mgc_moon_stars_fill' />}
              >
                Đăng nhập
              </ButtonBase>
            </div>
          </FormProvider>
          <div className='flex items-center gap-3'>
            <div className='h-[1px] w-full bg-orange-main' />
            <p className='font-dongle text-2xl text-orange-main'>Hoặc</p>
            <div className='h-[1px] w-full bg-orange-main' />
          </div>
          <div className='flex items-center gap-[25px]'>
            {socials.map((social) => (
              <ButtonBase key={social.id} size='md' variant='gray' className='w-full'>
                <span className={social.icon} />
              </ButtonBase>
            ))}
          </div>
        </div>
      </div>

      <img src={icons.leaf} alt='leaf' className='absolute inset-0 w-[88px] -rotate-45' />
      <img
        src={icons.crown}
        alt='crown'
        className='absolute -top-5 right-0 w-[90px] rotate-[19deg]'
      />
      <img
        src={icons.blink_1}
        alt='blink-1'
        className='xl 2xl: absolute bottom-[0] right-5 w-[105px]'
      />
    </div>
  )
})

export default Login
