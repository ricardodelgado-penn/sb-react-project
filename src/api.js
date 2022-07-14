import axios from 'axios'

export const api = {
  get: (url) => callAxios({ url }),
  post: (url, { data }) => callAxios({ method: 'post', url, data }),
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/'
})

const callAxios = ({
  method,
  url = 'get',
  data
} = {}) => axiosInstance({ method, url, data })
