import React from 'react'

const SearchBar = (props) => {
    const { handleChange, sortItemsBy, filterInputValue, filterSelectValue, paginationItemsPerSite, showItemsOptions, sortOptions, filterOptions } = props

    return (
        <nav className='row'>
            <div className='col-sm-2 mb-2'>
                <ShowItemsNumber name='paginationItemsPerSite' value={paginationItemsPerSite} showItemsOptions={showItemsOptions} handleChange={handleChange} />
            </div>
            <div className='col-sm-4 mb-2'>
                <SortItems name='sortItemsBy' value={sortItemsBy} sortOptions={sortOptions} handleChange={handleChange} />
            </div>
            <div className='col-sm-6 mb-2'>
                <FilterItems filterOptions={filterOptions} filterInputName='filterInputValue' filterSelectName='filterSelectValue' filterInputValue={filterInputValue} filterSelectValue={filterSelectValue} handleChange={handleChange} />
            </div>
        </nav>
    )
}

export default SearchBar

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
