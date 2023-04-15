const URL = 'https://api.shrtco.de/v2/shorten?url='
const menu =  document.querySelector('header > nav > menu')
const iconMenu = document.querySelector('header > nav #iconMenu')


document.addEventListener('click', event => {
    /**
     * @type {Element}
     */
    const target = event.target
    if(target.matches('#iconMenu, #iconMenu > span')) {
        menu.classList.toggle('hidden')
        iconMenu.classList.toggle('active')
    }
})

document.addEventListener('submit', event => {
    event.preventDefault()
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