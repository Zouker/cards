import axios from 'axios';
import {UserDataType} from '../bll/reducers/profile-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:7542/2.0/`,
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const profileAPI = {
    updateUserData(params: UserDataType) {
        return instance.put('auth/me', params)
    },
};

// types
export type UpdateUserParamsType = {
    name: string
    avatar: string
}