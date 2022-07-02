import axios from 'axios'

const http = axios.create({
    // baseURL:"http://localhost:3041/admin/api"
    // baseURL:process.env.VUE_APP_API_URL||'/chatroom/api',

})

export default http