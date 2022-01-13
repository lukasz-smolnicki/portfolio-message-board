const getData = (data) => {
    const getData = JSON.parse(localStorage.getItem(data))
    return (getData)
}

const setData = (name, data) => {
    localStorage.setItem(name, data)
}

const checkData = () => {
    if ('id' in localStorage && 'posts' in localStorage && 'threads' in localStorage && 'users' in localStorage) {
        return true
    } else {
        return false
    }
}

export { getData, setData, checkData }