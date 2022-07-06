import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';
import {packsAPI, PackType} from '../../m3-dal/packsAPI';

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {
                ...state,
                cardPacks: action.packs,
                cardPacksTotalCount: action.cardPacksTotalCount,
                page: action.page,
                pageCount: action.pageCount
            }
        default:
            return state
    }
}

// thunks
export const getPacksTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks()
        .then((res) => {

            dispatch(getPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount, res.data.page, res.data.pageCount))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}


export const addPackTC = (name: string, deckCover?: string, isPrivate?: boolean): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        packsAPI.addPack(name, deckCover, isPrivate)
            .then(() => {
                debugger
                dispatch(getPacksTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const deletePackTC = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        packsAPI.deletePack(id)
            .then(() => {
                dispatch(getPacksTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const updatePackTC = (id: string, name: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        packsAPI.updatePack(id, name)
            .then(() => {
                dispatch(getPacksTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

// actions
export const getPacksAC = (packs: PackType[], cardPacksTotalCount: number, page: number, pageCount: number) => ({
    type: 'packs/SET-PACKS',
    packs,
    cardPacksTotalCount,
    page,
    pageCount
} as const)

export const addPackAC = (cardsPack: { name: string, deckCover: string | null, isPrivate: boolean }) => ({
    type: 'packs/ADD-PACK',
    cardsPack
} as const)
export const deletePackAC = (id: string) => ({type: 'packs/DELETE-PACK', id} as const)
export const updatePackAC = (id: string, name: string) => ({type: 'packs/UPDATE-PACK', id, name} as const)

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
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 20,
    token: '',
    tokenDeathTime: 0,
}

export type InitialStateType = typeof initialState
type ActionType =
    ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>

