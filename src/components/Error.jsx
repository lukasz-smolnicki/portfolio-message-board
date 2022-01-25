import React from 'react'

const Error = (props) => {
    const { message } = props

    return (
        <div>
            <p>{message}</p>
        </div>
    )
}

export default Error