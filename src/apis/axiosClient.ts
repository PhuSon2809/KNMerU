import axios, { AxiosResponse } from 'axios'
import { getAccessToken } from '~/utils'

const API_URL = import.meta.env.VITE_API_URL

interface ErrorResponse {
  status: number
  errorMessageCode: string
  data: null
}

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosFormData = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// Setup Interceptors
const setupAxiosClient = () => {
  axiosClient.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (err) => {
      const errorData: ErrorResponse | undefined = err.response?.data
      return Promise.reject(errorData || err)
    }
  )
}

const setupAxiosFormData = () => {
  axiosFormData.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken()
      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosFormData.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (err) => {
      const errorData: ErrorResponse | undefined = err.response?.data
      return Promise.reject(errorData || err)
    }
  )
}

export { axiosClient, axiosFormData, setupAxiosClient, setupAxiosFormData }
