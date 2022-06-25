import {registerAPI, RegDataType} from '../../m3-dal/registerAPI';

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

export const registerTC = (regData: RegDataType) => {
    return (dispatch: any) => {
        registerAPI.register(regData)
            .then(() => {
                dispatch(registerAC(true))
            })
            .catch((error) => {
                dispatch(setErrorAC(error.message))
            })
    }
}

// type

type ActionsType = ReturnType<typeof registerAC> | ReturnType<typeof setErrorAC>

type InitialStateType = {
    isRegistered: boolean
    error: string | null
}