import React from 'react'

const SortItems = (props) => {
    const { sortOptions, handleChange, name, value } = props
    const options = sortOptions.map(option => <option key={option.value} value={option.value}>{option.content}</option>)

    return (
        <form>
            <select className='form-select form-select-sm' name={name} value={value} onChange={handleChange}>
                {options}
            </select>
        </form>
    )
}

export default SortItems