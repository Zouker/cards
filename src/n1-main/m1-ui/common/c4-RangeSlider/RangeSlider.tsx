import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type RangeSliderPropsType = {
    value: number | number[]
    onChange: (event: Event,
               newValue: number | number[]
    ) => void
    min: number
    max: number
}

export const RangeSlider: React.FC<RangeSliderPropsType> = ({value, onChange, min, max}) => {

    return (
        <Box sx={{width: 200}}>
            <Slider
                color={'secondary'}
                value={value}
                onChange={onChange}
                valueLabelDisplay="on"
                disableSwap
                min={min}
                max={max}
            />
        </Box>
    );
}

