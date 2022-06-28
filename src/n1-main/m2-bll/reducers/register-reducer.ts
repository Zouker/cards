import {RegDataType, registerAPI} from '../../m3-dal/registerAPI';
import {AppDispatch, AppThunk} from '../store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

const initialState: InitialStateType = {
    isRegistered: false
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SIGN-UP':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

// actions
export const registerAC = (isRegistered: boolean) => ({type: 'SIGN-UP', isRegistered} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)

// thunks
export const registerTC = (regData: RegDataType): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        registerAPI.register(regData)
            .then(() => {
                dispatch(registerAC(true))
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
}

// types
type ActionsType = ReturnType<typeof registerAC> | ReturnType<typeof setErrorAC>

type InitialStateType = {
    isRegistered: boolean
}