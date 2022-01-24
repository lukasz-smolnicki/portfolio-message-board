import React from 'react'

const Button = (props) => {
    const { handleMethod, className } = props

    return <button className={className} type='button' onClick={handleMethod}>{props.children}</button>
}

const ButtonSubmit = (props) => {
    const { className } = props

    return <button className={className} type='submit'>{props.children}</button>
}


export { Button, ButtonSubmit }