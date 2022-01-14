const getData = (data) => {
    const getData = JSON.parse(localStorage.getItem(data))
    return (getData)
}

const setData = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

const checkData = () => {
    if ('counters' in localStorage && 'posts' in localStorage && 'threads' in localStorage && 'users' in localStorage) {
        return true
    } else {
        return false
    }
}

export { getData, setData, checkData }