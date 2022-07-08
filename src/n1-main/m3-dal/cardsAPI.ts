import {cardsType} from '../m2-bll/reducers/card-reducer';
import axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    //baseURL: `http://localhost:7542/2.0`,
    baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<ResponseGetCardsType>(`/cards/card/?cardsPack_id=${cardsPack_id}`)
    },
    deleteCard(id: string) {
        return instance.delete<Array<cardsType>>(`/cards/card/?id=${id}`)
    },
    addCard(newCard: newCardType) {
        return instance.post<Array<cardsType>>(`/cards/card`, {card: newCard})
    },
    updateCard(_id: string) {
        return instance.put<Array<cardsType>>(`/cards/card`, {card: {_id}})
    }
}

// types

export type newCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
}

export type ResponseGetCardsType = {
    cards: [
        {
            _id: string
            cardsPack_id: string
            user_id: string
            answer: string
            question: string
            grade: number
            shots: number
            comments: string
            type: string
            rating: number
            more_id: number
            created: Date
            updated: Date
            __v: number
        }
    ],
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}