import Cookie from 'js-cookie'
//
import { StorageKeys } from '~/constants/storage'

export const setAccessToken = (accessToken: string) =>
  Cookie.set(StorageKeys.ACCESS_TOKEN, accessToken)
export const getAccessToken = () =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(StorageKeys.ACCESS_TOKEN))
    ?.split('=')[1]

export const removeAccessToken = () => Cookie.remove(StorageKeys.ACCESS_TOKEN)
