import {registerAC, setErrorAC} from "./register-reducer";
import {RegDataType, registerAPI} from "../../m3-dal/registerAPI";
import {AppDispatch} from "../store";


type InitialStateType = {
    isRegistered: boolean
    error: string | null
}

const initialState: InitialStateType = {
    isRegistered: false,
    error: null
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "IS-SIGNED-UP":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

// actions
export const profileAC = (isRegistered: boolean) => ({type: 'IS-SIGNED-UP', isRegistered} as const)

// thunks
export const profileTC = (regData: RegDataType) => {
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
type ActionsType = ReturnType<typeof profileAC> | ReturnType<typeof setErrorAC>