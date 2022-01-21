import React from 'react'

const ShowItemsNumber = (props) => {
    const { showItemsOptions, handleChange, name, value } = props
    const options = showItemsOptions.map(option => <option key={option.value} value={option.value}>{option.content}</option>)

    return (
        <form>
            <label>
                {props.children}
                <select name={name} value={value} onChange={handleChange}>
                    {options}
                </select>
            </label>
        </form>

    )
}

export default ShowItemsNumber