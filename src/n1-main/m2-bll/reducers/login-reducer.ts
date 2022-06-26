import {DataLoginType, loginApi} from "../../m3-dal/authAPI";
import {Dispatch} from "redux";
import {isLoaderAC} from "./loader-reducer";


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


type ActionType = ReturnType<typeof isLoaderAC>
    | ReturnType<typeof setIsLoggedInAC>


// thunks
export const loginTC = (data: DataLoginType) => (dispatch: Dispatch) => {
    dispatch(isLoaderAC(true)) //крутилка вкл
    loginApi.postLogin(data).then(data=>{
        debugger
        dispatch(isLoaderAC(false)) //крутилка выкл
        alert('login');
     })
        .catch((err) => {
            // handleServerNetworkError(err, dispatch)
            alert(err);
        })
}







