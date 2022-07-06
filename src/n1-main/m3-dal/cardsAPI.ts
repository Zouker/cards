import {cardsType} from "../m2-bll/reducers/card-reducer";
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:7542/2.0/`,
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const cardsAPI = {
    getCards(cardsPack_id:string) {
        return instance.get<cardsType>(`/cards/card/?cardsPack_id=${cardsPack_id}`)
    },
    deleteCard(id:string){
        return instance.delete<cardsType>(`/cards/card/?id=${id}`)
    },
    addCard(cardsPack_id: string) {
        return instance.post<cardsType>(`cards/card`, {card:{cardsPack_id}})
    },
    updateCard(_id:string) {
        return instance.put<cardsType>(`cards/card`, {card:{_id}})
    }
}