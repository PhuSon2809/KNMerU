import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { memo, useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import CharactersChooseItem from '~/components/features/choose-characters/CharactersChooseItem'
import ButtonBase from '~/components/shared/ButtonBase'
import { FormControl, FormField, FormItem } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import TitleCharacters from '~/components/shared/TitleCharacters'
import { path } from '~/constants/path'
import { getUserInfor, login } from '~/store/auth/auth.slice'
import { selectCharacter, setCharacterSelected } from '~/store/character/character.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getAccessToken, getErrorMessage, isSuccessRes } from '~/utils'

export const nameFormSchema = z.object({
  name: z.string()
})

const NameCharacters = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { userLogin, isAuthenticated, userInfo } = useAppSelector((s) => s.auth)
  const { isLoading, characterSelected } = useAppSelector((s) => s.character)

  const form = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { name: '' },
    mode: 'onBlur'
  })

  const name = form.watch('name')

  const isLengthValid = useMemo(() => name.length >= 3 && name.length <= 20, [name])
  const isAlphaNumeric = useMemo(() => /^[\p{L}0-9\s]+$/u.test(name), [name])
  const isNoSpecialChars = useMemo(() => /^[\p{L}0-9\s]+$/u.test(name), [name])

  const getValidationStatus = useCallback(
    (condition: boolean) => (condition ? 'text-green-main' : 'text-orange-main'),
    []
  )

  const onSubmitForm = useCallback(
    async (values: z.infer<typeof nameFormSchema>) => {
      if (!isLengthValid || !isAlphaNumeric || !isNoSpecialChars)
        return toast.error('Bạn hãy đặt tên theo yêu cầu nhé!')
      if (isLoading || !characterSelected) return toast.error('Bạn chưa chọn nhân vật!')
      try {
        const accessToken = getAccessToken()
        if (!(isAuthenticated && accessToken)) {
          await dispatch(login(userLogin)).unwrap()
        }
        const payload = await dispatch(
          selectCharacter({ characterId: characterSelected?.id, characterName: values.name })
        ).unwrap()
        const payloadUserInfor = await dispatch(getUserInfor()).unwrap()
        if (isSuccessRes(payload.status) && isSuccessRes(payloadUserInfor.status)) {
          navigate(path.home)
          dispatch(setCharacterSelected(null))
        }
      } catch (error) {
        console.log('error', error)
        toast.error(getErrorMessage(error) || 'Đặt tên thất bại! Thử lại nhé.')
      }
    },
    [
      characterSelected,
      isAuthenticated,
      userInfo,
      userLogin,
      isLengthValid,
      isAlphaNumeric,
      isNoSpecialChars
    ]
  )

  return (
    <div className='relative flex size-full flex-1 flex-col items-stretch overflow-hidden px-5 pb-[200px] pt-[50px]'>
      <div className='z-[10] flex w-full flex-col gap-20'>
        <TitleCharacters title='Đặt tên nhân vật' />
        <div className='flex w-full flex-col items-center justify-center gap-10 pt-10 md:flex-row md:items-start'>
          {characterSelected && <CharactersChooseItem isSelected character={characterSelected} />}
          <FormProvider {...form}>
            <div className='flex flex-col items-start gap-3'>
              <div className='flex w-full items-center gap-3 lg:w-fit'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <FormItem className='w-full md:w-fit'>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Tên nhân vật'
                          placeholder='Nguyễn Văn A'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                          containerClassName='w-full md:w-[318px]'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span
                  className={classNames(
                    isLengthValid && isAlphaNumeric && isNoSpecialChars
                      ? 'text-green-main'
                      : 'text-gray-5',
                    'mgc_check_circle_line mt-8'
                  )}
                />
              </div>

              <div className='rounded-1 bg-blue-main px-3 pb-[2px] pt-1 font-dongle leading-4 text-gray-1 md:px-2'>
                Tên nhân vật sẽ không thể thay đổi, bạn lưu ý khi đặt tên cho bé nha*
              </div>

              <ul className='font-dongle text-[20px]/[20px] text-orange-main'>
                <li className={getValidationStatus(isLengthValid)}>
                  Tên phải có từ 3 đến 20 ký tự.
                </li>
                <li className={getValidationStatus(isAlphaNumeric)}>
                  Chỉ bao gồm chữ cái (A-Z, a-z) và số (0-9).
                </li>
                <li className={getValidationStatus(isNoSpecialChars)}>
                  Không chứa ký tự đặc biệt (!@#$%^&...), dấu cách hoặc dấu gạch dưới.
                </li>
              </ul>
            </div>
          </FormProvider>
        </div>
        <div className='w-full gap-3 flex-center md:gap-5 lg:gap-[25px]'>
          <ButtonBase
            disabled={isLoading}
            variant='green'
            size='icon'
            onClick={() => {
              dispatch(setCharacterSelected(null))
              navigate(-1)
            }}
          >
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <ButtonBase
            variant='pink'
            isLoading={isLoading}
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
