import axios from 'axios'

axios.defaults.baseURL = 'http://0.0.0.0:5000'
axios.defaults.withCredentials = true

export default axios