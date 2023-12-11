import { useState } from 'react'
import Slider from 'react-slider'

type RangeSlideProps = {
    min: number,
    max: number
}



const RangeSlider = ({ min, max }: RangeSlideProps) => {
    const [values, setValues] = useState([min, max])
    return (
        <>
          
        </>
    )
}

export default RangeSlider