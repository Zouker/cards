import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}`;
}

// const minDistance = 1;

type RangeSliderPropsType = {
    value: number[]
    onChange: (event: Event,
               newValue: number | number[],
               activeThumb: number,
    ) => void
}

export const RangeSlider: React.FC<RangeSliderPropsType> = (props) => {
    // const [value, setValue] = React.useState<number[]>([0, 100]);
    //
    // const handleChange1 = (
    //     event: Event,
    //     newValue: number | number[],
    //     activeThumb: number,
    // ) => {
    //     if (!Array.isArray(newValue)) {
    //         return;
    //     }
    //
    //     if (activeThumb === 0) {
    //         setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    //     } else {
    //         setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    //     }
    // };

    return (
        <Box sx={{width: 200}}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                color={'secondary'}
                value={props.value}
                onChange={props.onChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
            />
        </Box>
    );
}

