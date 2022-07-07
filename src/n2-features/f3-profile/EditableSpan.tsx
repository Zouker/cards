import React, {ChangeEvent, useCallback, useState} from 'react';
import {Box, TextField} from '@mui/material';
import {useAppSelector} from '../../n1-main/m2-bll/store';
import {AccountCircle} from '@mui/icons-material';

type PropsType = {
    title: string
    changeTitle: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({title, changeTitle, disabled}: PropsType) => {
    const userName = useAppSelector(state => state.profile.userName)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(userName)

    const activateEditMode = () => {
        if (disabled) {
            return
        } else {
            setLocalTitle(title)
            setEditMode(true)
        }
    }

    const activateViewMode = useCallback(() => {
        changeTitle(localTitle)
        setEditMode(false)
    }, [changeTitle, localTitle])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }, [])

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode

        ? <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
            <TextField
                id="input-with-sx"
                variant="standard"
                value={localTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                onBlur={activateViewMode}
                autoFocus
            />
        </Box>
        : <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
            <AccountCircle sx={{color: 'action.active', mr: 1, my: -0.3}}/>
            <span
                onClick={activateEditMode}>{title}</span>
        </Box>
})