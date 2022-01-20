import React from 'react'

const FilterItems = (props) => {
    const { filterOptions, filterInputName, filterInputValue, filterSelectName, filterSelectValue, handleChange } = props
    const options = filterOptions.map(option => <option key={option.value} value={option.value}>{option.content}</option>)

    return (
        <form>
            <input name={filterInputName} value={filterInputValue} onChange={handleChange} />

            <select name={filterSelectName} value={filterSelectValue} onChange={handleChange} >
                {options}
            </select>
        </form>
    )
}

export default FilterItems