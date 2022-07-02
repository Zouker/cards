import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:7542/2.0/`,
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const packsAPI = {
    setPacks() {
        return instance.get<{ cardPacks: PackType[] }>(`cards/pack`)
    }
};

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