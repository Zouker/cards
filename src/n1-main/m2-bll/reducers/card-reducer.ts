import {packsAPI, PackType} from "../../m3-dal/packsAPI";
import {AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../../utils/error-utils";
import {getPacksAC} from "./packs-reducer";
import {cardsAPI} from "../../m3-dal/cardsAPI";

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
type ActionType = ReturnType<typeof getCardsAC>

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

// actions
export const getCardsAC = (cards: Array<cardsType>) => ({
    type: 'cards/SET-CARDS',
     cards,
} as const)

// thunk

export const getCardsTC = (cardsPack_id:string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.getCards(cardsPack_id)
            .then((res) => {
//@ts-ignore
              dispatch(getCardsAC(res.data.cards))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const deleteСardsTC = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.deleteCard(id)
            .then(() => {
                debugger
               // dispatch(getCardsTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}