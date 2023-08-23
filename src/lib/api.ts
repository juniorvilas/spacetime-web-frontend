import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://pure-sands-43982-8154aa045897.herokuapp.com/',
})