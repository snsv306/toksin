import { SEND_MESSAGE, SERVER_URL } from './constant'

function makeUrl(payload) {
    return SERVER_URL + '?' +
        'text=' + encodeURIComponent(payload.text) + '&' +
        'externalLink=' + encodeURIComponent(payload.externalLink)
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
    if (type === SEND_MESSAGE) {
        (async () => {
            const result = await fetch(makeUrl(payload))
            const parsed = await result.json()
            sendResponse(parsed)
        })()
    }
    return true
})