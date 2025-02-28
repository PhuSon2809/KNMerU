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
export const isPromoted = (streak: number) =>
  streak === 5 || streak === 10 || streak === 15 || streak === 20

export const getErrorMessage = (errorCode: any): string => {
  return ERROR_MESSAGES[errorCode.errorMessageCode || errorCode] || 'Lỗi không xác định'
}
