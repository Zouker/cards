import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const profileAPI = {
    updateUserData(params:UpdateUserParamsType) {
        return instance.put<UpdateUserDataResponseType>('/auth/me',params)
    },
    logout() {
        return instance.delete<LogoutResponseType>('/auth/me')
    }
}

// types
export type UpdateUserParamsType={
    name: string
    avatar:string
}

type UpdateUserDataResponseType = {
    updatedUser: {
        _id: string,
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
        avatar: string
    },
    error?: string
    token: string,
    tokenDeathTime: number
}

type LogoutResponseType={
    info:string
    error:string
}