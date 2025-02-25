import { AxiosResponse } from 'axios'
//
import { getAccessToken } from '~/utils'
import { axiosFormData } from './axiosClient'

const setupAxiosFormData = () => {
  axiosFormData.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken()
      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosFormData.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    async (err) => {
      return Promise.reject(err.response)
    }
  )
}

export default setupAxiosFormData
