import React, {ChangeEvent, useCallback, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (title: string) => void
    disabled?: boolean
}
export const EditableSpan = React.memo(({title, changeTitle, disabled}: PropsType) => {


    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>('')

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

    return editMode

        ? <input value={localTitle}
                 onChange={onChangeHandler}
                 onBlur={activateViewMode}
                 autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>

})