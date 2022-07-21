import React, {ChangeEvent, useState} from 'react';
import {IconButton} from '@mui/material';
import defaultAva from '../../assets/images/defaultAva.png'
import {PhotoCamera} from '@mui/icons-material';
import {useAppDispatch} from '../../bll/store';
import {setAppErrorAC} from '../../bll/reducers/app-reducer';
import {convertFileToBase64} from '../../utils/convertFileToBase64';

type ChangeUserAvatarPropsType = {
    changeUserAvatar: (avatar: string) => void
    userAvatar: string
}

export const InputTypeFile: React.FC<ChangeUserAvatarPropsType> = React.memo(({
                                                                                  changeUserAvatar,
                                                                                  userAvatar,
                                                                              }) => {
    const dispatch = useAppDispatch()
    const [avatar, setAvatar] = useState<string>(userAvatar ? userAvatar : defaultAva)
    const [isAvatarBroken, setIsAvatarBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAvatar(file64)
                    changeUserAvatar(file64)
                })
            } else {
                dispatch(setAppErrorAC('The file is too large'))
            }
        }
    }

    const errorHandler = () => {
        setIsAvatarBroken(true)
        dispatch(setAppErrorAC('Wrong images'))
    }

    return (
        <div>
            <img
                src={isAvatarBroken ? defaultAva : avatar}
                style={{
                    width: '120px',
                    height: '120px'
                }}
                onError={errorHandler}
                alt="avatar"
            />
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                <IconButton component="span" color={'secondary'}>
                    <PhotoCamera/>
                </IconButton>
            </label>
        </div>
    )
})