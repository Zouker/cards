import {AppThunk} from '../store';
import {newPasswordAPI, newPasswordType} from '../../m3-dal/newPasswordAPI';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

const initialState: InitialStateType = {
    info: '',
    isPassChanged: false
}

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'NEW-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        case 'IS-PASS-CHANGED':
            return {...state, isPassChanged: action.isPassChanged}
        default:
            return state
    }
}

// thunks
export const setInfoTC = (newPasswordData: newPasswordType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        newPasswordAPI.sendNewPassword(newPasswordData)
            .then((res) => {
                dispatch(setInfoAC(res.data.info))
                dispatch(setPassChangedAC(true))
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
export const setInfoAC = (info: string) => ({type: 'NEW-PASSWORD-SUCCESS', info} as const)
export const setPassChangedAC = (isPassChanged: boolean) => ({type: 'IS-PASS-CHANGED', isPassChanged} as const)

// types
type InitialStateType = {
    info: string
    isPassChanged: boolean
}

type ActionsType = ReturnType<typeof setInfoAC> | ReturnType<typeof setPassChangedAC>