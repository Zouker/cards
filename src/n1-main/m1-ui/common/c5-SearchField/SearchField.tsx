import * as React from 'react';
import {ChangeEvent} from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@mui/material';
import {SearchCardRadio} from './SearchCardRadio';
import {useParams} from 'react-router-dom';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'secondary',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

type SearchFieldType = {
    title: string
    addNewItem: () => void
    goBack: () => void
    value: string
    radioValue?: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    onChangeRadio?: (value: string) => void
    disabled?: boolean
}
export const SearchAppBar: React.FC<SearchFieldType> = ({goBack, onChange, value, title, addNewItem, disabled,radioValue,onChangeRadio}) => {

    const {packsId} = useParams<'packsId'>();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{backgroundColor: '#7b1fa2'}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Button onClick={goBack}
                                variant="contained"
                                color="secondary">
                            Back
                        </Button>
                    </div>
                    {packsId && <SearchCardRadio radioValue={radioValue} onChangeRadio={onChangeRadio}/>}
                    <div>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                style={{color: 'white'}}
                                value={value}
                                onChange={onChange}
                            />
                        </Search>
                    </div>
                    <div>
                        <Button onClick={addNewItem}
                                variant="contained"
                                color="secondary"
                                disabled={disabled}>
                            {title}
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
