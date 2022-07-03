import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:7542/2.0/`,
})

export const profileAPI = {
    updateUserData(params: UpdateUserParamsType) {
        return instance.put<UpdateUserDataResponseType>('/auth/me', params)
    },
};

// types
export type UpdateUserParamsType = {
    name: string
    avatar: string
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