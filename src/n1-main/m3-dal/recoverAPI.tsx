import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const recoverAPI = {
    sendEmail: (email: string, message: string) => {
        return instance.post<ResponseType>('/auth/forgot', {email, message})
    }
}

// types
type ResponseType = {
    info: string
    error: string
}

