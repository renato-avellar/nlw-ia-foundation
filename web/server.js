import axios from 'axios'

export const server = axios.create({
  baseURL: "http://192.168.15.80:3333",
})