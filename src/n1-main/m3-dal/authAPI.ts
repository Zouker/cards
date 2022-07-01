import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:7542/2.0/`,
})

export const loginApi = {
    postLogin(data: DataLoginType) {   //в data обьект с полей формы
        return instance.post<PostStatus>(`auth/login`, data)
    }
};

export type DataLoginType = {
    email: string
    password: string
    rememberMe: boolean
};

export type PostStatus = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
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

type TokenType={
    "_id": string
    "device": string
    "token": string
    "tokenDeathTime": number
}