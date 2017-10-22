import Spinner from '../bower_components/spin'
import { SPINNER_OPT, SEND_MESSAGE, INDICATOR } from './constant'

function makePayload(post) {
    const externalLink = post.querySelector('.wall_post_text a') 
    return {
        text: post.querySelector('.wall_post_text').childNodes[0].nodeValue,
        externalLink: externalLink && externalLink.innerText
    }
}

function makeIndicator(value) {
    let i = 0
    while (i < INDICATOR.values.length - 1 && INDICATOR.values[i] < value) {
        i++
    }

    const elem = document.createElement('div')
    elem.className = 'fc_indicator'
    elem.style.backgroundColor = !!value ? INDICATOR.colors[i] : 'grey'
    return elem
}
document.querySelectorAll('.post').forEach(post => {
    const button = document.createElement('div')
    button.innerText = '?'
    button.className = 'fc_button'
    button.onclick = () => {
        const spinner = new Spinner(SPINNER_OPT).spin()
        wrapper.replaceChild(spinner.el, button)

        chrome.runtime.sendMessage({
            type: SEND_MESSAGE,
            payload: makePayload(post)
        }, ({ result }) => {
            wrapper.replaceChild(makeIndicator(result), spinner.el)
        })
    }

    const wrapper = document.createElement('div')
    wrapper.className = 'post_reply _reply_wrap fc_wrapper'
    wrapper.appendChild(button)
    post.querySelector('.post_full_like').appendChild(wrapper)
})
