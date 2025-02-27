import Cookie from 'js-cookie'
import { ERROR_MESSAGES } from '~/constants/error'
import { StorageKeys } from '~/constants/storage'

export const setAccessToken = (accessToken: string) =>
  Cookie.set(StorageKeys.ACCESS_TOKEN, accessToken)
export const getAccessToken = () =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(StorageKeys.ACCESS_TOKEN))
    ?.split('=')[1]

export const removeAccessToken = () => Cookie.remove(StorageKeys.ACCESS_TOKEN)

export const isSuccessRes = (statusCode: number) => statusCode === 200

export const getErrorMessage = (errorCode: string): string => {
  return ERROR_MESSAGES[errorCode] || 'Lỗi không xác định'
}
