import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    // baseURL: `http://localhost:7542/2.0`,
    baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const packsAPI = {
    getPacks(data?: RequestGetPacksType) {
        return instance.get<ResponseGetPacksType>(`/cards/pack`, {params: {pageCount: 10, ...data}})
    },
    addPack(name: string, deckCover?: string, isPrivate?: boolean) {
        return instance.post<PackType>(`/cards/pack`, {cardsPack: {name, deckCover, private: isPrivate}})
    },
    deletePack(id: string) {
        return instance.delete<PackType>(`/cards/pack?id=${id}`)
    },
    updatePack(_id: string, name: string) {
        return instance.put<PackType>(`/cards/pack`, {cardsPack: {_id, name}})
    }
};

// types
export type RequestGetPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    pageCount?: number
    page?: number
    userId?: string
}

// export type PackTypeWithKeys = Record<'_id' | 'user_id' | 'user_name' | 'name' | 'path' | 'type', string>

export type PackType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number,
    deckCover: null
}

export type ResponseGetPacksType = {
    cardPacks: PackType[]
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
}