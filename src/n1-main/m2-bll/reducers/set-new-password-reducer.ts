import {AppDispatch, AppThunk} from '../store';
import {newPasswordAPI, newPasswordType} from '../../m3-dal/newPasswordAPI';

const initialState: InitialStateType = {
    info: '',
    error: null,
    isPassChanged: false
}

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'NEW-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'IS-PASS-CHANGED':
            return {...state, isPassChanged: action.isPassChanged}
        default:
            return state
    }
}

// thunks
export const setInfoTC = (newPasswordData: newPasswordType): AppThunk => {
    return (dispatch: AppDispatch) => {
        newPasswordAPI.sendNewPassword(newPasswordData)
            .then((res) => {
                dispatch(setInfoAC(res.data.info))
                dispatch(setPassChangedAC(true))
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(setErrorAC(error.response.data.error))
                }
            })
    }
}


// actions
export const setInfoAC = (info: string) => ({type: 'NEW-PASSWORD-SUCCESS', info} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const setPassChangedAC = (isPassChanged: boolean) => ({type: 'IS-PASS-CHANGED', isPassChanged} as const)

// types
type InitialStateType = {
    info: string
    error: string | null
    isPassChanged: boolean
}

type ActionsType = ReturnType<typeof setInfoAC> | ReturnType<typeof setErrorAC> | ReturnType<typeof setPassChangedAC>