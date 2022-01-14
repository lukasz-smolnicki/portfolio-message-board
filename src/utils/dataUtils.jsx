const getData = (value) => {
    const getData = JSON.parse(localStorage.getItem(value))
    return (getData)
}

const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const removeData = (key) => {
    localStorage.removeItem(key)
}

const checkData = () => {
    if ('counters' in localStorage && 'posts' in localStorage && 'threads' in localStorage && 'users' in localStorage) {
        return true
    } else {
        return false
    }
}

export { getData, setData, removeData, checkData }