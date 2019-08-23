import React, { useState } from 'react'
import axiosWithAuth from '../util/axiosWithAuth';

 
const AddAColor = (props) => {
    const updateColors = props.updateColors
    const colors = props.colors
    const [newColor, SetNewColor ] = useState({
        color: '',
        code: {hex: ''},
    })

    const changeHandler = (e) => {
        SetNewColor({...newColor, [e.target.name]: e.target.value})

    }

    const hexChangeHandler = (e) => {
        SetNewColor({...newColor, code: {[e.target.name]: e.target.value}})

    }

    const submitHandler = (e) => {
        e.preventDefault()
        let completedNewColor = {...newColor, id: Date.now()}
        axiosWithAuth()
            .post('http://localhost:5000/api/colors', completedNewColor)
            .then(res => {
                console.log(res)
                updateColors([...colors, completedNewColor])
            })
            .catch(res => {console.log(res)})


    }


    return(
        <form className='add-color' onSubmit={(event) => submitHandler(event)}>
            <input placeholder='name' name='color' onChange={(event) => changeHandler(event)} value={newColor.color} />
            <input placeholder='hex' name='hex' onChange={(event) => hexChangeHandler(event)} value={newColor.code.hex} />
            <button type='submit' className='add-color-btn'>add Color</button>

        </form>
    )
}
export default AddAColor