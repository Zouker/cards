import {RegDataType, registerAPI} from '../../m3-dal/registerAPI';
import {AppDispatch, AppThunk} from '../store';

const initialState: InitialStateType = {
    isRegistered: false,
    error: null
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SIGN-UP':
            return {...state, isRegistered: action.isRegistered}
        case 'SET-ERROR':
            return {...state, error: action.error}
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
        registerAPI.register(regData)
            .then(() => {
                dispatch(registerAC(true))
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(setErrorAC(error.response.data.error))
                }
            })
    }
}

// types
type ActionsType = ReturnType<typeof registerAC> | ReturnType<typeof setErrorAC>

type InitialStateType = {
    isRegistered: boolean
    error: string | null
}