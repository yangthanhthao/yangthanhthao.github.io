const header = document.querySelector('.header')
window.onscroll = function () {
    if (document.documentElement.scrollTop > 50) {
        header.style.backgroundColor = '#ffffff'
    } else {
        header.style.backgroundColor = '#edf2fc'
    }
}

const listNavCss = document.querySelectorAll('.navCss')
listNavCss.forEach(function (navCss) {
    navCss.setAttribute('onclick', 'onClick(this)')
})

const contentDescriptionList = document.querySelectorAll('.contentDescription')
contentDescriptionList.forEach(function (contentDescription, i) {
    contentDescription.setAttribute('data-ref-title', `${i + 1}`)
})

function onClick(element) {
    console.log(element)
    listNavCss.forEach(function (navCss) {
        navCss.classList.remove('active')
    })
    element.classList.add('active')
    console.log(element)
    
    contentDescriptionList.forEach(function (contentDescription) {
        contentDescription.classList.remove('activeDescription')
    })
    var html = document.querySelector(`div[data-ref-title="${element.id}"]`)
    console.log(html)
    html.classList.add('activeDescription')

}

