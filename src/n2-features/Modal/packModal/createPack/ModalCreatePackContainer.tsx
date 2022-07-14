import {Button, Input} from '@mui/material';
import {useState} from "react";
import {useAppDispatch} from "../../../../n1-main/m2-bll/store";
import {addPackTC} from "../../../../n1-main/m2-bll/reducers/packs-reducer";
import {Modal} from "../../Modal";

import SuperCheckbox from "../../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import styles from '../../modal.module.css'


type ModalCreatePackContainerType = {
    disabled: boolean
}

export const ModalCreatePackContainer: React.FC<ModalCreatePackContainerType> = ({disabled}) => {
    const [show, setShow] = useState(false);

    const [namePack, setNamePack] = useState("");
    const [cardPrivate, setCardPrivate] = useState(false);

    const dispatch = useAppDispatch()

    const onClickCreateHandler = () => {
        dispatch(addPackTC(namePack, '', cardPrivate))
        onClickCloseHandler()
    }
    const onClickCloseHandler = () => {
        setShow(false)
        setNamePack('')
        setCardPrivate(false)
    }

    return (
        <>
            <Button onClick={() => setShow(true)}
                //color={COLORS.MAIN_DARK}
                    disabled={disabled}>Add new pack</Button>
            <Modal backgroundOnClick={onClickCloseHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Add new Pack</h3>
                    </div>

                    <div className={styles.input}>
                        <Input //sign="Name pack"
                            //color={COLORS.HEADER_BOTTOM}
                            autoFocus
                            value={namePack}
                            onChange={(e) => setNamePack(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.checkbox}>
                        <SuperCheckbox/>

                    </div>

                    <div className={styles.buttons}>
                        <Button //color={COLORS.HEADER_BOTTOM}
                            onClick={onClickCreateHandler}>Save</Button>
                        <Button //color={COLORS.HEADER_BOTTOM}
                            onClick={onClickCloseHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}