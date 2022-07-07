import {profileAPI, UpdateUserParamsType} from '../../m3-dal/profileAPI';
import {setAppStatusAC} from './app-reducer';
import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';

const initialState = {
    userName: 'Enter your name',
    userAvatar: 'https://180dc.org/wp-content/uploads/2022/04/Blank-Avatar.png',
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-USER-NAME': {
            return {...state, userName: action.userName}
        }
        case 'profile/SET-USER-AVATAR':
            return {...state, userAvatar: action.userAvatar}
        default:
            return state
    }
}

// thunks
export const updateUserDataTC = (userData: UpdateUserParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileAPI.updateUserData(userData)
        .then((res) => {
            dispatch(setUserNameAC(res.data.updatedUser.name))
            dispatch(setUserAvatarAC(res.data.updatedUser.avatar))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// actions
export const setUserNameAC = (userName: string) => ({type: 'profile/SET-USER-NAME', userName} as const)
export const setUserAvatarAC = (userAvatar: string) => ({type: 'profile/SET-USER-AVATAR', userAvatar} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setUserNameAC>
    | ReturnType<typeof setUserAvatarAC>