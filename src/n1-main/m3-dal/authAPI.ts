import axios from "axios";

const instance=axios.create({
    withCredentials: true,
    baseURL:`http://localhost:7542/2.0/`  //базовый урл автоматически приклеивается к строке
})

export const loginApi={
    postLogin(data:DataLoginType){   //в data обьект с полей формы
        return instance.post<PostStatus>(`auth/login`, data)
            .then(res=>res.data)

    }}

export type DataLoginType={
    email:string,
    password:string,
    rememberMe:boolean,

}

export type PostStatus={ //что ожидаем с сервера
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
// количество колод
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean, // подтвердил ли почту
    rememberMe: boolean,
    error?: string,
}