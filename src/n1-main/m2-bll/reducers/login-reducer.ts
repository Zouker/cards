import {DataLoginType, loginApi} from "../../m3-dal/authAPI";
import {Dispatch} from "redux";
import {setErrorAC} from "./register-reducer";
import {setAppStatusAC} from "./app-reducer";


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
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// types
type ActionType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setErrorAC>


// thunks
export const loginTC = (data: DataLoginType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC( 'loading')) //крутилка вкл
    loginApi.postLogin(data).then(data => {
        dispatch(setIsLoggedInAC(true));//если тру-переход в profile
    })
        .catch((error) => { //error из initialState
            if (error.response) {
                dispatch(setErrorAC(error.response.data.error))
            }
        })
        .finally(()=>{
            dispatch(setAppStatusAC('succeeded')) //крутилка выкл
        })
}








