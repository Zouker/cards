import {PackType} from "../../m3-dal/packsAPI";

const initialState = {
    cards: [] as Array<cardsType>
}

export type cardsType = {
    answer: string,
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string

}

export type InitialStateType = typeof initialState;
type ActionType = ReturnType<typeof setCardsAC>

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state,cards:action.cards
            }
        default:
            return state
    }
}

export const setCardsAC= (cards:Array<cardsType>) => ({
    type: 'cards/SET-CARDS',
   cards,
} as const)