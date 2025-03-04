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
  console.log(
    'ERROR_MESSAGES[errorCode.errorMessageCode]',
    ERROR_MESSAGES[errorCode.errorMessageCode]
  )
  return ERROR_MESSAGES[errorCode.errorMessageCode]
}

/**
 * Kiểm tra các lớp đã bị bỏ qua.
 * Chỉ xét 2 trường hợp:
 * 1. FirstGrade → SecondGrade
 * 2. SecondGrade → ThirdGrade
 */
export const getSkippedLevels = (progress: ClassLevelProgress, infor: GeneralInfor): number[] => {
  let skippedLevels: number[] = []

  const maxLevelPerGrade = 5
  const baseLevels = [1, 6, 11, 16, 21] // Cấp độ bắt đầu của từng Grade

  // Kiểm tra nếu có bỏ qua từ FirstGrade → SecondGrade
  if (
    progress.SecondGrade > 0 ||
    (progress.SecondGrade === 0 && infor.classLevel === 2 && infor.isSkippedClass)
  ) {
    const currentLevel = baseLevels[0] + progress.FirstGrade - 1 // Cấp độ đang học
    const expectedEnd = baseLevels[0] + maxLevelPerGrade - 1 // Cấp độ tối đa

    if (currentLevel < expectedEnd) {
      for (let i = currentLevel + 1; i <= expectedEnd; i++) {
        skippedLevels.push(i)
      }
    }
  }

  // Kiểm tra nếu có bỏ qua từ SecondGrade → ThirdGrade
  if (
    progress.ThirdGrade > 0 ||
    (progress.ThirdGrade === 0 && infor.classLevel === 3 && infor.isSkippedClass)
  ) {
    const currentLevel = baseLevels[1] + progress.SecondGrade - 1
    const expectedEnd = baseLevels[1] + maxLevelPerGrade - 1

    if (currentLevel < expectedEnd) {
      for (let i = currentLevel + 1; i <= expectedEnd; i++) {
        skippedLevels.push(i)
      }
    }
  }

  return skippedLevels
}
