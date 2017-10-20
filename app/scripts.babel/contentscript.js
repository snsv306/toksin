import Spinner from '../bower_components/spin.min'
import { SEND_MESSAGE } from './constant'

function makePayload(post) {
    return {
        text: post.querySelector('.wall_post_text').textContent,
        link: post.querySelector('a.post_link').href,
        externalLinks: Array.from(post.querySelectorAll('.wall_post_text a')).map(elem => elem.href)
    }
}

function makeIndicator(value) {
    const ind = document.createElement('div')
    ind.innerText = value
    return ind
}

const posts = document.querySelectorAll('.post')
console.log(posts)
posts.forEach(post => {
    const button = document.createElement('button')
    button.innerText = 'x'
    button.onclick = () => {
        const spinner = new Spinner().spin()
        const divResult = document.createElement('div')
        button.replaceWith(spinner.el)

        chrome.runtime.sendMessage({
            type: SEND_MESSAGE,
            payload: makePayload(post)
        }, ({ result }) => {
            result = 0.3
            divResult.innerText = result
            spinner.el.replaceWith(divResult)
        })
    }
    post.querySelector('.post_full_like').appendChild(button)
})

