import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:7542/2.0/`,
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const packsAPI = {
    setPacks(page?: number | string, pageCount?: number, packName?: string,
             sortPacks?: string, user_id?: string, min?: number, max?: number) {
        return instance.get<PacksResponseType>(`cards/pack`, {
            params: {page, pageCount, packName, sortPacks, user_id, min, max}
        })
    },
    addPacks(){
        return instance.post(`cards/pack`, )
    }
};

export type PacksResponseType = {
    cardsPacks: PackType[],
    page: number,
    pageCount: number,
    cardsPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    token: string,
    tokenDeathTime: number
}

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