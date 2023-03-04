import axios from "axios";
import router from "@/router";
import getCookie from "@/js/cookie";

axios.defaults.baseURL = 'http://localhost:8000'

const api = axios.create();

api.interceptors.request.use(config => {
        if (getCookie('x-auth-token')) {
            config.headers.authorization = `Bearer ${getCookie('x-auth-token')}`
        }
        return config
    })
//end request

api.interceptors.response.use(config => {
        if (getCookie('x-auth-token')) {
            config.headers.authorization = `Bearer ${getCookie('x-auth-token')}`
        }
        return config
    },
    error => {
        if (error.response.data.error === 'Unauthorized'){
        alert('Не вірно введені дані')
    }
        if (error.response.data.message === 'Token has expired') {
            return api.post('/api/auth/logout')
                .then(res => {
                        document.cookie = "x-auth-token =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        router.go()
                })
        }
        if (error.response.data.message === 'Unauthenticated.'){
            api.post('/api/auth/logout')
                .then(res => {
                    document.cookie = "x-auth-token =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    router.go()
                })
        }
        if (error.response.data.message === 'Token Signature could not be verified.'){
            api.post('/api/auth/logout')
                .then(res => {
                    document.cookie = "x-auth-token =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    router.go()
                })
        }
    })


export default api