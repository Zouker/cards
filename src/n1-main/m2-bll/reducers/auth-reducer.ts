import {DataLoginType, loginApi} from '../../m3-dal/authAPI';
import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {profileAPI, UpdateUserParamsType} from "../../m3-dal/profileAPI";

const initialState = {
    isLogin: false,
    userName: 'name' as string,
    userAvatar: '' as string,


}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLogin: action.value}
        case "login/SET-USER-NAME": {
            return {...state, userName: action.userName}
        }
        case "login/SET-USER-AVATAR":
            return {...state, userAvatar: action.userAvatar}
        default:
            return state
    }
}

// thunks
export const loginTC = (data: DataLoginType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    loginApi.postLogin(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserNameAC(res.data.name))
            dispatch(setUserAvatarAC(res.data.avatar ? res.data.avatar : ''))
        })
        .catch((error) => {
            if (error.response) {
                dispatch(setAppErrorAC(error.response.data.error))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileAPI.authMe()
        .then(res => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch((error) => {
            if (error.response) {
                dispatch(setAppErrorAC(error.response.data.error))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const updateUserDataTC = (userData: UpdateUserParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileAPI.updateUserData(userData)
        .then((res) => {
            dispatch(setUserNameAC(res.data.updatedUser.name))
            dispatch(setUserAvatarAC(res.data.updatedUser.avatar))
        })
        .catch((error) => {
            if (error.response) {
                dispatch(setAppErrorAC(error.response.data.error))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileAPI.logout()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch((error) => {
            if (error.response) {
                dispatch(setAppErrorAC(error.response.data.error))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setUserNameAC = (userName: string) => ({type: 'login/SET-USER-NAME', userName} as const)
export const setUserAvatarAC = (userAvatar: string) => ({type: 'login/SET-USER-AVATAR', userAvatar} as const)



// types
type InitialStateType = typeof initialState

type ActionType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserNameAC>
    | ReturnType<typeof setUserAvatarAC>








