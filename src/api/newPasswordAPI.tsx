import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const newPasswordAPI = {
    sendNewPassword: (newPasswordData: newPasswordType) => {
        return instance.post<newPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', newPasswordData)
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
