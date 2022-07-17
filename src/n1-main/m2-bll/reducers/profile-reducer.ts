import {profileAPI} from '../../m3-dal/profileAPI';
import {setAppStatusAC} from './app-reducer';
import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';

const initialState = {
    _id: '',
    name: 'Enter your name',
    avatar: '',
    publicCardPacksCount: 0,
}

export const profileReducer = (state: UserDataType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-USER-DATA': {
            return {...state, ...action.userData}
            // return {...state, ...action.userData.updatedUser}
        }
        default:
            return state
    }
}

// thunks
export const updateUserDataTC = (userData: UserDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileAPI.updateUserData(userData)
        .then((res) => {
            dispatch(setUserDataAC(res.data))
            console.log(res.data)
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// actions
export const setUserDataAC = (userData: UserDataType) => ({type: 'profile/SET-USER-DATA', userData} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setUserDataAC>

export type UpdateResponseType = {
    updatedUser: UserDataType
    token: string
    tokenDeathTime: string
}

export type UserDataType = {
    _id: string
    email?: string
    rememberMe?: boolean
    isAdmin?: boolean
    name: string
    verified?: boolean
    publicCardPacksCount: number
    created?: Date
    updated?: Date
    __v?: number
    token?: string
    tokenDeathTime?: number
    avatar: string
}