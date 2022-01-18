import React from 'react'
import { NavLink } from 'react-router-dom'

const Pagination = (props) => {
    const { array, route, site, divide } = props

    // if (typeof array !== 'undefined' && array.length > 0) {

    // }
    console.log(array, route, site, divide)
    const threadsCounter = 1000
    const threadsPerPage = 10
    const currentPage = parseInt(site)
    const arraOfSites = []
    const pagesNumber = Math.floor(threadsCounter / threadsPerPage)
    let firstPageNumber = currentPage - 5
    let lastPageNumber = currentPage + 5

    if (currentPage <= 5) {
        firstPageNumber = 1
        lastPageNumber = 11
    } else if (currentPage >= pagesNumber - 5) {
        firstPageNumber = pagesNumber - 10
        lastPageNumber = pagesNumber
    }

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
        arraOfSites.push(<li key={i}><NavLink to={`/${route}${i}`}>{i}</NavLink></li>)
    }

    return (
        <>
            {currentPage > 1 && <li><NavLink to={`/${route}${1}`}>{'<<'}</NavLink></li>}
            {currentPage > 1 && <li><NavLink to={`/${route}${currentPage - 1}`}>{'<'}</NavLink></li>}
            {arraOfSites}
            {currentPage < pagesNumber && <li><NavLink to={`/${route}${currentPage + 1}`}>{'>'}</NavLink></li>}
            {currentPage < pagesNumber && <li><NavLink to={`/${route}${pagesNumber}`}>{'>>'}</NavLink></li>}
        </>
    )
}

export default Pagination