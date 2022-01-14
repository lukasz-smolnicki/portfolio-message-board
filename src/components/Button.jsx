import React from 'react'

const Button = (props) => {
    const { handleMethod } = props
    return (
        <button onClick={handleMethod}>{props.children}</button>
    )
}

export default Button