import { AxiosResponse } from 'axios'
//
import { getAccessToken } from '~/utils'
import { axiosClient } from './axiosClient'

const setupAxiosClient = () => {
  axiosClient.interceptors.request.use(
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

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    async (err) => {
      return Promise.reject(err.response)
    }
  )
}

export default setupAxiosClient
