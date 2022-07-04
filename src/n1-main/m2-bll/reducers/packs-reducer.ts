import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';
import {packsAPI, PackType} from '../../m3-dal/packsAPI';

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {...state, cardPacks: action.packs}
        default:
            return state
    }
}

// thunks
export const setPacksTC = (page: number | string, pageCount: number, inputTitle?: string, sortPacks?: string, user_id?: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        packsAPI.setPacks(page, pageCount, inputTitle, sortPacks, user_id, minCardsCount, maxCardsCount)
            .then((res) => {
                dispatch(setPacksAC(res.data.cardsPacks))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addPacksTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        packsAPI.addPacks(////////)
    })
}

// actions
export const setPacksAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS', packs} as const)

// types
const initialState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            user_name: '',
            private: false,
            name: '',
            path: '',
            grade: 0,
            shots: 0,
            cardsCount: 0,
            type: '',
            rating: 0,
            created: '',
            updated: '',
            more_id: '',
            __v: 0,
            deckCover: null
        }
    ],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 5406,
    minCardsCount: 0,
    maxCardsCount: 110,
    token: "",
    tokenDeathTime: 0
}

type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setPacksAC>

