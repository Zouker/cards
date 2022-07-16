import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {CardType} from '../../n1-main/m3-dal/cardsAPI';
import {AppRootStateType, useAppDispatch} from '../../n1-main/m2-bll/store';
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import styles from './LearnPage.module.css'
import {getCardsTC} from '../../n1-main/m2-bll/reducers/cards-reducer';

const grades = ['I did not know', 'I forgot', 'I thought for a long time', 'I got confused', 'I knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

type LearnPagePropsType = {
    handleClose: () => void
    id: string
}

export const LearnPage: React.FC<LearnPagePropsType> = ({handleClose, id}) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };


    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useSelector((store: AppRootStateType) => store.cards);

    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }

    return (
        <div>
            <div className={styles.title}>
                <h1>Learn</h1>
            </div>
            <div><span className={styles.bold}>Question: </span>{card.question}</div>

            {isChecked
                ? <>
                    <div><span className={styles.bold}>Answer: </span>{card.answer}</div>

                    <FormControl>
                        <FormLabel color="secondary">Rate yourself</FormLabel>
                        <RadioGroup
                            value={value}
                            onChange={handleChange}
                        >
                            {grades.map((g, i) => (
                                <FormControlLabel
                                    key={'grade-' + i}
                                    value={g}
                                    control={<Radio color="secondary"/>}
                                    label={g}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <div className={styles.buttonsBlock}>
                        <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                        <div><Button onClick={onNext} color="secondary" variant="contained">Next Question</Button></div>
                    </div>
                </>
                : <>
                    <div className={styles.buttonsBlock}>
                        <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                        <Button onClick={() => setIsChecked(true)} color="secondary" variant="contained">Show
                            answer</Button>
                    </div>
                </>
            }
        </div>
    );
};
