import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const newPasswordAPI = {
    sendNewPassword: (newPasswordData: newPasswordType) => {
        return instance.post<ResponseType>('/auth/set-new-password', newPasswordData)
    }
}

// types
type ResponseType = {
    info: string
    error: string;
}
export type newPasswordType = {
    password: string
    resetPasswordToken: string
}
