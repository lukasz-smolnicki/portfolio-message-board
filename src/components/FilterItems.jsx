import React from 'react'

const FilterItems = (props) => {
    const { filterOptions, filterInputName, filterInputValue, filterSelectName, filterSelectValue, handleChange } = props
    const options = filterOptions.map(option => <option key={option.value} value={option.value}>{option.content}</option>)

    return (
        <form>
            <div className='input-group input-group-sm'>
                <input type='text' className='form-control' name={filterInputName} value={filterInputValue} placeholder='Search..' onChange={handleChange} />
                <select className='form-select' name={filterSelectName} value={filterSelectValue} onChange={handleChange} >
                    {options}
                </select>
            </div>
        </form>
    )
}

export default FilterItems