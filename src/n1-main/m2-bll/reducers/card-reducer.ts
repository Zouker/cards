import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';
import {cardsAPI} from '../../m3-dal/cardsAPI';

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
        case 'cards/GET-CARDS':
            return {
                ...state, cards: action.cards
            }
        default:
            return state
    }
}

// actions
export const getCardsAC = (cards: Array<cardsType>) => ({
    type: 'cards/GET-CARDS',
    cards,
} as const)

// thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.getCards(cardsPack_id)
            .then((res) => {
                dispatch(getCardsAC(res.data))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const deleteCardsTC = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.deleteCard(id)
            .then((res) => {
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