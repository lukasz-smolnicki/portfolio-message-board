import React from 'react'

const ShowItemsNumber = (props) => {
    const { showItemsOptions, handleChange, name, value } = props
    const options = showItemsOptions.map(option => <option key={option.value} value={option.value}>{option.content}</option>)

    return (
        <form>
            <select className='form-select form-select-sm' name={name} value={value} onChange={handleChange}>
                {options}
            </select>
        </form>

    )
}

export default ShowItemsNumber