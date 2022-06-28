import {DataLoginType, loginApi} from '../../m3-dal/authAPI';
import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

const initialState = {
    isLogin: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLogin: action.value}
        default:
            return state
    }
}

// thunks
export const loginTC = (data: DataLoginType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    loginApi.postLogin(data)
        .then(() => {
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

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setIsLoggedInAC>







