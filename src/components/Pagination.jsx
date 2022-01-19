import React from 'react'
import { NavLink } from 'react-router-dom'

const Pagination = (props) => {
    const { array, route, site, paginationItemsPerSite } = props
    const siteIndex = parseInt(site)
    console.log((siteIndex < 1))

    if (typeof array !== 'undefined' && array.length > 0 && ((array.length / paginationItemsPerSite) + 1) > siteIndex && siteIndex > 0) {
        const threadsCounter = array.length
        const threadsPerPage = paginationItemsPerSite
        const currentPage = siteIndex
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
            arrayOfSites.push(<li key={i}><NavLink to={`${route}${i}`}>{i}</NavLink></li>)
        }

        return (
            <>
                {currentPage > 1 && <li><NavLink to={`${route}${1}`}>{'<<'}</NavLink></li>}
                {currentPage > 1 && <li><NavLink to={`${route}${currentPage - 1}`}>{'<'}</NavLink></li>}
                {arrayOfSites}
                {currentPage < pagesNumber && <li><NavLink to={`${route}${currentPage + 1}`}>{'>'}</NavLink></li>}
                {currentPage < pagesNumber && <li><NavLink to={`${route}${pagesNumber}`}>{'>>'}</NavLink></li>}
            </>
        )
    } else {
        return (
            <li><NavLink to={`${route}${1}`}>{'Back to list'}</NavLink></li>
        )
    }
}

export default Pagination