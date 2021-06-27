export const existsInList = ([list, input]) => {
    const exists = [...list].find(item => item.name === input)
    return exists
}