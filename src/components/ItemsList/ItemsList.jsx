import React from 'react'
import { getData, setData } from '../../utilities/dataUtils'
import Error from '../Error'

const ItemsList = (props) => {
    const { params, isAuth, data, paginationItemsPerSite, handleSortItems, handleFilterItems, handleDelete, handleEdit } = props
    const users = getData('users')
    handleSortItems(data)
    const filteredData = handleFilterItems(data, users)
    setData('filteredData', filteredData)
    const siteIndex = parseInt(params.site)
    const sitePaginationIndex = siteIndex * paginationItemsPerSite
    const siteOfData = filteredData.slice(sitePaginationIndex - paginationItemsPerSite, sitePaginationIndex)
    const itemsList = siteOfData.map(data => <ListItem key={data.id} isAuth={isAuth} data={data} handleEdit={handleEdit} handleTDelete={handleDelete} />)

    if (typeof filteredData !== 'undefined' && filteredData.length > 0 && ((filteredData.length / paginationItemsPerSite) + 1) > siteIndex && siteIndex > 0) {
        return (
            <div className='list-group mb-2'>
                {itemsList}
            </div>
        )
    } else {
        return (
            <Error message='Threads not found' />
        )
    }
}

const ListItem = (props) => {
    const { data, isAuth, handleEdit, handleDelete } = props


    return (
        <div>
            test
        </div>
    )
}

export default ItemsList