const initialState = {
    isLoader: false //сразу мы не залогинены
}
type InitialStateType = typeof initialState

export const isLoaderReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'LOADER':
            return {...state, isLoader:action.value}
        default:
            return state
    }
}

export const isLoaderAC = (value: boolean) =>
    ({type: 'LOADER', value} as const);

type ActionType=ReturnType<typeof isLoaderAC>