
document.addEventListener('DOMContentLoaded', () => {
    statisticsConsumer()
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
        clone.querySelector('article > img').setAttribute('src', path)        
        clone.querySelector('article > h3').textContent = title        
        clone.querySelector('article > p').textContent = content  
        fragment.append(clone)      
    })
    document.querySelector(parentSelector).append(fragment)
}