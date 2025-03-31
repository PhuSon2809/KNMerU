import Cookie from 'js-cookie'
import { lotties } from '~/assets'
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
  const baseLevels = [1, 6, 11, 16] // Cấp độ bắt đầu của từng Grade

  // Hàm kiểm tra cấp độ bị bỏ qua giữa hai cấp
  const checkSkipped = (currentProgress: number, nextProgress: number, gradeIndex: number) => {
    if (
      nextProgress > 0 ||
      (nextProgress === 0 && infor.classLevel === gradeIndex + 2 && infor.isSkippedClass)
    ) {
      const currentLevel = baseLevels[gradeIndex] + currentProgress - 1
      const expectedEnd = baseLevels[gradeIndex] + maxLevelPerGrade - 1

      if (currentLevel < expectedEnd) {
        for (let i = currentLevel + 1; i <= expectedEnd; i++) {
          skippedLevels.push(i)
        }
      }
    }
  }

  checkSkipped(progress.FirstGrade, progress.SecondGrade, 0)
  checkSkipped(progress.SecondGrade, progress.ThirdGrade, 1)
  checkSkipped(progress.ThirdGrade, progress.FourthGrade, 2)
  // checkSkipped(progress.FourthGrade, progress.FifthGrade, 3)

  return skippedLevels
}

export const getLottieFile = (name: string) => {
  return name === 'Bé họ Lâm'
    ? lotties.BeLam
    : name === 'Bé họ Sơn'
      ? lotties.BeSon
      : name === 'Bé họ Thạch'
        ? lotties.BeThach
        : lotties.BeKim
}
