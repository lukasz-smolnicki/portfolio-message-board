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

const checkData = (...args) => {
    const arr = args.map(arg => (arg in localStorage))
    const dataIsLoaded = arr.every(x => x)

    return dataIsLoaded
}

export { getData, setData, removeData, checkData }