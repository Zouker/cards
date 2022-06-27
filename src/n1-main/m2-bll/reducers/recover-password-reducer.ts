import {AppDispatch} from '../store';
import {recoverAPI} from '../../m3-dal/recoverAPI';

const initialState: InitialStateType = {
    info: '',
    error: null
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CONFIRM-STATUS':
            return {...state, info: action.info}
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// thunk
export const recoverTC = (email: string) => {
    return (dispatch: AppDispatch) => {
        recoverAPI.sendEmail(email)
            .then((res) => {
                dispatch(recoverAC(res.data.info))
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(setErrorAC(error.response.data.error))
                }
            })
    }
}

// actions
export const recoverAC = (info: string) => ({type: 'CONFIRM-STATUS', info} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)

// types
type ActionsType = ReturnType<typeof recoverAC> | ReturnType<typeof setErrorAC>

type InitialStateType = {
    info: string
    error: string | null
}