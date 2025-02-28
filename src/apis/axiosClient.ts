import axios, { AxiosResponse } from 'axios'
import { getAccessToken } from '~/utils'

const API_URL = import.meta.env.VITE_API_URL

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
      return Promise.reject(err.response || err)
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
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosFormData.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    async (err) => {
      return Promise.reject(err.response || err)
    }
  )
}

export { axiosClient, axiosFormData, setupAxiosClient, setupAxiosFormData }
