import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';
import {cardsAPI, CardType, NewCardType} from '../../m3-dal/cardsAPI';

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    page: 1,
    pageCount: 5,
    cardQuestion: '',
    cardAnswer: ''
}

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
export const getCardsAC = (cards: CardType[]) => ({
    type: 'cards/GET-CARDS',
    cards,
} as const)

// thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState) => {
        const {cardsTotalCount, page, pageCount, cardQuestion, cardAnswer} = getState().cards
        dispatch(setAppStatusAC('loading'))
        cardsAPI.getCards(cardsPack_id)
            .then((res) => {
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

export const addCardTC = (newCard: NewCardType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.addCard(newCard)
            .then((res) => {
                dispatch(getCardsTC(newCard.cardsPack_id))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const deleteCardTC = (cardId: string, packsId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.deleteCard(cardId)
            .then((res) => {
                dispatch(getCardsTC(packsId))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const updateCardTC = (id: string, packsId: string): AppThunk => {
    return (dispatch) => {
        const question = 'UPDATED_QUESTION'
        const answer = 'UPDATED_ANSWER'
        const card = {
            _id: id,
            question,
            answer,
        }
        dispatch(setAppStatusAC('loading'))
        cardsAPI.updateCard(card)
            .then(() => {
                dispatch(getCardsTC(packsId))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

// types
export type InitialStateType = typeof initialState;
type ActionType = ReturnType<typeof getCardsAC>