import { SEND_MESSAGE, SERVER_URL } from './constant'

function makeUrl(payload) {
    return SERVER_URL + '?' +
        'text=' + encodeURIComponent(payload.text) + '&' +
        'link=' + encodeURIComponent(payload.link)
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
    if (type === SEND_MESSAGE) {
        (async () => {
            const result = await fetch(makeUrl(payload))
            sendResponse(result)
        })()
    }
    return true
})