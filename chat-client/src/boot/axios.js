import Vue from 'vue'
import axios from 'axios'

axios.interceptors.request.use(config => {
  config.headers = {
    'Authorization': "Bearer " + localStorage.getItem("token")
  }
  return config
})

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL || "http://localhost:4000"

Vue.prototype.$axios = axios