import {AppThunk} from '../store';
import {authAPI} from '../../m3-dal/authAPI';
import {setIsLoggedInAC} from './auth-reducer';
import {setUserAvatarAC, setUserNameAC} from './profile-reducer';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// thunks
export const authMeTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then((res) => {
            dispatch(setInitializedAC(true))
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserNameAC(res.data.name))
            dispatch(setUserAvatarAC(res.data.avatar))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setInitializedAC>