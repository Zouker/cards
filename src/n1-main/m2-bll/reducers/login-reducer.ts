import {DataLoginType, loginApi} from '../../m3-dal/authAPI';
import {setErrorAC} from './register-reducer';
import {setAppStatusAC} from './app-reducer';
import {AppThunk} from '../store';

const initialState = {
    isLogin: false //сразу мы не залогинены
}
type InitialStateType = typeof initialState
export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLogin: action.value}
        default:
            return state
    }
}

// thunks
export const loginTC = (data: DataLoginType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    loginApi.postLogin(data)
        .then(() => {
            dispatch(setIsLoggedInAC(true));
        })
        .catch((error) => { //error из initialState
            if (error.response) {
                dispatch(setErrorAC(error.response.data.error))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// types
type ActionType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setErrorAC>








