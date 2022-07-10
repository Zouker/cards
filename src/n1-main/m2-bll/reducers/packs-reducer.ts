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
            }
        case 'packs/PAGE':
            return {
                ...state,
                params: {...state.params, page: action.page},

            }
        case 'packs/TOTAL-COUNT':
            return {
                ...state,
                cardPacksTotalCount: action.value,

            }
        case 'packs/PAGE-COUNT':
            return {
                ...state,
                params: {...state.params, pageCount: action.value},

            }
        default:
            return state
    }
}

// thunks
export const getPacksTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const params = getState().packs.params;
    packsAPI.getPacks(params)
        .then((res) => {
            dispatch(getPacksAC(res.data.cardPacks))
            dispatch(pageAC(res.data.page))
            dispatch(cardPacksTotalCountAC(res.data.cardPacksTotalCount))
            dispatch(pageCountAC(res.data.pageCount))
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
export const getPacksAC = (packs: PackType[]) => ({
    type: 'packs/SET-PACKS',
    packs,
} as const)

export const pageAC = (page: number) => ({
    type: 'packs/PAGE',
    page,
} as const)

export const cardPacksTotalCountAC = (value: number) => ({
    type: 'packs/TOTAL-COUNT',
    value,
} as const)

export const pageCountAC = (value: number) => ({
    type: 'packs/PAGE-COUNT',
    value,
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
    params: {
        page: 1,
        pageCount: 10,
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '',
        userId: ''
    },
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
    | ReturnType<typeof pageAC>
    | ReturnType<typeof cardPacksTotalCountAC>
    | ReturnType<typeof pageCountAC>

