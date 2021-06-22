const baseUri = 'http://localhost:5000/'
let header = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
const sentData = (method, body = null) => {
    if (body)
        return {
            method: method,
            headers: header,
            body: JSON.stringify(body)
        }
    else
        return {
            method: method,
            headers: header,
        }
}

export const makeRequest = async (arr) => {
    let [url, method, body] = arr
    const response =  await fetch(`${baseUri}${url}`, sentData(method, body))
    return [response.status, response.json()]
}