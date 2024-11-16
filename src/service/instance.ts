import axios, { InternalAxiosRequestConfig } from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_KEY,
  headers: {
    'Content-Type': 'application/json'
  }
})
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const cid = localStorage.getItem('cid')

    if (config.headers.Authorization !== localStorage.getItem('cid') && cid) {
      config.headers.setAuthorization(cid)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
