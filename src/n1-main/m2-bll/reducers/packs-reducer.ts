import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';
import {packsAPI, PackType, RequestGetPacksType} from '../../m3-dal/packsAPI';

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 20,
    token: '',
    tokenDeathTime: 0,
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {...state, cardPacks: action.packs}
        case 'packs/SET-PAGE':
            return {...state, page: action.page}
        case 'packs/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'packs/SET-CARD-PACKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        default:
            return state
    }
}

// thunks
export const getPacksTC = (data?: RequestGetPacksType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks(data)
        .then((res) => {
            dispatch(getPacksAC(res.data.cardPacks))
            dispatch(setPageAC(res.data.page))
            dispatch(setPageCountAC(res.data.pageCount))
            dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
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
export const getPacksAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS', packs} as const)
export const setPageAC = (page: number) => ({type: 'packs/SET-PAGE', page} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'packs/SET-PAGE-COUNT', pageCount} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'packs/SET-CARD-PACKS-TOTAL-COUNT',
    cardPacksTotalCount
} as const)

export const addPackAC = (cardsPack: { name: string, deckCover: string | null, isPrivate: boolean }) => ({
    type: 'packs/ADD-PACK',
    cardsPack
} as const)
export const deletePackAC = (id: string) => ({type: 'packs/DELETE-PACK', id} as const)
export const updatePackAC = (id: string, name: string) => ({type: 'packs/UPDATE-PACK', id, name} as const)

// types
export type InitialStateType = typeof initialState
type ActionType =
    ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCardPacksTotalCountAC>

