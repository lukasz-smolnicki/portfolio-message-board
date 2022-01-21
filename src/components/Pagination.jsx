import React from 'react'
import { NavLink } from 'react-router-dom'

const Pagination = (props) => {
    const { array, route, site, paginationItemsPerSite } = props
    const currentPage = parseInt(site)

    if (typeof array !== 'undefined' && array.length > 0 && ((array.length / paginationItemsPerSite) + 1) > currentPage > 0) {
        const threadsCounter = array.length
        const threadsPerPage = paginationItemsPerSite
        const arrayOfSites = []
        let pagesNumber = Math.floor(threadsCounter / threadsPerPage)
        const pagesNumberModulo = (threadsCounter % threadsPerPage)
        let firstPageNumber = currentPage - 5
        let lastPageNumber = currentPage + 5

        if (!!pagesNumberModulo) {
            ++pagesNumber
        }

        if (pagesNumber <= 11) {
            firstPageNumber = 1
            lastPageNumber = pagesNumber
        } else {
            if (currentPage <= 5) {
                firstPageNumber = 1
                lastPageNumber = 11
            } else if (currentPage >= pagesNumber - 5) {
                firstPageNumber = pagesNumber - 10
                lastPageNumber = pagesNumber
            }
        }

        for (let i = firstPageNumber; i <= lastPageNumber; i++) {
            arrayOfSites.push(<li className={`page-item ${currentPage === i && 'active'}`} key={i}><NavLink className='page-link' to={`${route}${i}`}>{i}</NavLink></li>)
        }

        return (
            <ul className='pagination'>
                <li className={`page-item ${currentPage < 2 && 'disabled'}`}><NavLink className='page-link' to={`${route}${1}`}>{'<<'}</NavLink></li>
                <li className={`page-item ${currentPage < 2 && 'disabled'}`}><NavLink className='page-link' to={`${route}${currentPage - 1}`}>{'Previous'}</NavLink></li>
                {arrayOfSites}
                <li className={`page-item ${currentPage >= pagesNumber && 'disabled'}`}><NavLink className='page-link' to={`${route}${currentPage + 1}`}>{'Next'}</NavLink></li>
                <li className={`page-item ${currentPage >= pagesNumber && 'disabled'}`}><NavLink className='page-link' to={`${route}${pagesNumber}`}>{'>>'}</NavLink></li>
            </ul>
        )
    } else {
        return (
            <ul className='pagination'>
                <li className='page-item'><NavLink className='page-link' to={`${route}${1}`}>{'Back to list'}</NavLink></li>
            </ul>
        )
    }
}

export default Pagination