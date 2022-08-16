import axios from 'axios'

axios.defaults.baseURL = 'http://backend'
axios.defaults.withCredentials = true

export default axios