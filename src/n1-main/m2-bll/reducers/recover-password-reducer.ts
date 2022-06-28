import {AppDispatch, AppThunk} from '../store';
import {recoverAPI} from '../../m3-dal/recoverAPI';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

const initialState: InitialStateType = {
    info: ''
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CONFIRM-STATUS':
            return {...state, info: action.info}
        default:
            return state
    }
}

// thunks
export const recoverTC = (email: string): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        recoverAPI.sendEmail(email)
            .then((res) => {
                dispatch(recoverAC(res.data.info))
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

// actions
export const recoverAC = (info: string) => ({type: 'CONFIRM-STATUS', info} as const)

// types
type ActionsType = ReturnType<typeof recoverAC>

type InitialStateType = {
    info: string
}