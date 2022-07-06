import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const authAPI = {
    authMe() {
        return instance.post<ResponseType>('/auth/me')
    },
    login(data: DataLoginType) {
        return instance.post<ResponseType>(`auth/login`, data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('/auth/me')
    }
}

// types
export type DataLoginType = {
    email: string
    password: string
    rememberMe: boolean
};

export type ResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string
    __v: any,
    token: string,
    tokenDeathTime: number,
    deviceTokens: TokenType[],
};

type TokenType = {
    '_id': string
    'device': string
    'token': string
    'tokenDeathTime': number
}

type LogoutResponseType = {
    info: string
    error: string
}