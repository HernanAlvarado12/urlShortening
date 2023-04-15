const URL_ROOTER = 'https://api.shrtco.de/v2/shorten?url='
const menu =  document.querySelector('header > nav > menu')
const iconMenu = document.querySelector('header > nav #iconMenu')
const formElement = document.querySelector('main form.flex.relative.overflow-hidden')
const inputLink = document.querySelector('form.flex.relative.overflow-hidden > label > input')


document.addEventListener('click', event => {
    /**
     * @type {Element}
     */
    const target = event.target
    if(target.matches('#iconMenu, #iconMenu > span')) {
        menu.classList.toggle('hidden')
        iconMenu.classList.toggle('active')
    }else if(target.matches('form.flex.relative.overflow-hidden > label > input.invalid')) {
        inputLink.classList.remove('invalid')
        inputLink.previousElementSibling.classList.add('hidden')
    }else if(target.matches('form.flex + section.w-90 > article > button')) {
        navigator.clipboard.writeText(target.getAttribute('data-write'))
        target.textContent = 'Copied!'
        target.classList.add('bg-violet')
    }
})

document.addEventListener('submit', async event => {
    event.preventDefault()
    const link = new FormData(formElement).get('link')
    try {
        const response = await fetch(`${URL_ROOTER}${link}`)
        const json = await response.json()
        if(!json.ok)
            throw new Error('Invalid request')
        const fragment = document.createDocumentFragment()
        const template = document.getElementById('shortTemplate').content
        const { original_link, short_link } = json.result 
        const clone = template.cloneNode(true)
        clone.querySelector('article > span').textContent = original_link
        clone.querySelector('article > p').textContent = short_link
        clone.querySelector('article > button').setAttribute('data-write', short_link)
        document.querySelector('form.flex + section.w-90').append(clone)
    } catch(error) {
        inputLink.classList.add('invalid')
        inputLink.previousElementSibling.classList.remove('hidden')
    } finally {
        inputLink.value = ''
    }
})

document.addEventListener('DOMContentLoaded', () => {
    statisticsConsumer()
})

matchMedia('(max-width: 899px)').addEventListener('change', event => {
    menu.classList.add('hidden')
    iconMenu.classList.remove('active')
})


const statisticsConsumer = async () => {
    const response = await fetch('./data.json')
    const json = await response.json()
    const { statistics } = await json
    consumer({ jsonData: statistics, templateSelector: 'statisticsTemplate', parentSelector: 'section#statisticsSection' })
}


/**
 * @typedef {Object} statistics
 * @property {String} title
 * @property {String} content
 * @property {String} path
 * 
 * @typedef {Object} objectConsumer
 * @property {Array<statistics>} jsonData
 * @property {String} templateSelector
 * @property {String} parentSelector
 * @param {objectConsumer} jsonData 
 */
const consumer = ({ jsonData, templateSelector, parentSelector }) => {
    const fragment = document.createDocumentFragment()
    const template = document.getElementById(templateSelector).content
    jsonData.forEach(json => {
        const { title, content, path } = json
        const clone = template.cloneNode(true)
        clone.querySelector('article figure img').setAttribute('src', path)        
        clone.querySelector('article > h3').textContent = title        
        clone.querySelector('article > p').textContent = content  
        fragment.append(clone)      
    })
    document.querySelector(parentSelector).append(fragment)
}