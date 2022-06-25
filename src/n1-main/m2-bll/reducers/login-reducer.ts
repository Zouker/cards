

const initialState = {
    isLogin: false //сразу мы не залогинены
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

// thunks
// export const loginTC = (data:LoginParamsType) => {
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatusAC('loading')) //крутилка вкл
//         authAPI.login(data)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(setAppStatusAC('failed')) //крутилка выкл
//                     dispatch(setIsLoggedInAC(true));
//                 } else {
//                     dispatch(setAppStatusAC('failed'))
//                     dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
//                 }
//             })
//             .catch((err: AxiosError) => {
//                 handleServerNetworkError(err, dispatch)
//             })
//     };
// }
//
// export const logautTC = () => {  //санка вылогинивания
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatusAC('loading')) //крутилка вкл
//         authAPI.logaut()
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(setAppStatusAC('failed')) //крутилка выкл
//                     dispatch(setIsLoggedInAC(false));
//                 } else {
//                     dispatch(setAppStatusAC('failed'))
//                     dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
//                 }
//             })
//             .catch((err: AxiosError) => {
//                 handleServerNetworkError(err, dispatch)
//             })
//     };
// }
//
//
// // types
// type ActionsType
// ReturnType<typeof setIsLoggedInAC>
//     | ReturnType<typeof setAppStatusAC> //крутилка
//     | ReturnType<typeof errorAppMessageAC> //ошибка
//
