//zmienne globalne
let clicks = 0
let currentDiv = ""
let columnsNumber = 0
let rowsNumber = 0
let clicksTab = []
let colorsTab = []
let twoDivs = []
let divs
let divsCount
let elementsNumber = 0
let divsIds = []
const container = document.getElementById('container')

//funkcja losujaca kolor hex
function getRandomColor() {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

//funkcja tworzaca tablice z losowymi kolorami hex w zaleznosci od ilosci podanej przez uzytkownika
function createTab() {
    let colors = document.getElementById('colors').value
    for (let i = 0; i < colors; i++) {
        colorsTab[i] = getRandomColor()
    }
}

//funkcja losujaca kolor z tablicy
function chooseColor() {
    randomColor = colorsTab[Math.floor(Math.random() * colorsTab.length)]
    return randomColor
}

//funkcja czyszczaca tablice z kolorami
function clearTab(tab) {
    if (tab != undefined)
        tab.length = 0
}

//funkcja sprawdzajaca czy klikniete elementy sa obok siebie i zmienia ich kolor na bialy
function checkID(tab, columnsNumber) {
    let firstID = parseInt(tab[0])
    let secondID = parseInt(tab[1])
    let firstColor = document.getElementById(firstID)
    let secondColor = document.getElementById(secondID)
    if (((firstID == secondID + 1) || (firstID == secondID - 1) || (firstID == secondID - columnsNumber) || (secondID == firstID - columnsNumber)) && (firstColor.style.backgroundColor == secondColor.style.backgroundColor)) {
        firstColor.style.backgroundColor = 'rgb(255, 255, 255)'
        secondColor.style.backgroundColor = 'rgb(255, 255, 255)'
        return true
    }
}

//funkcja generujaca pole gry
document.getElementById("generator").onclick = function generate() {
    clearTab(divs)
    clearTab(colorsTab)
    clearTab(twoDivs)
    elementsNumber = 0
    createTab()
    rowsNumber = document.getElementById("rows").value
    columnsNumber = document.getElementById("columns").value
    clicks++
    if (clicks != 0) {
        childNumber = container.childElementCount
        for (let i = 0; i < childNumber; i++) {
            let currentId = i
            child = document.getElementById(currentId)
            container.removeChild(child)
        }
    }

    container.style.gridTemplateColumns = 'repeat(' + columnsNumber + ', 70px)'
    elementsNumber = rowsNumber * columnsNumber

    for (let i = 0; i < elementsNumber; i++) {
        let element = document.createElement('div')
        let currentId = i
        element.style.backgroundColor = chooseColor()
        element.className = "element"
        element.id = currentId
        document.getElementById('container').appendChild(element)
    }

    divs = document.getElementsByClassName("element")
    divsCount = divs.length
    for (let i = 0; i < divsCount; i++) {
        divs[i].onclick = function getID() {
            currentDiv = this.id
            if (twoDivs.length == 0) {
                twoDivs[0] = currentDiv
            }
            else if (twoDivs.length == 1) {
                if (currentDiv == twoDivs[0]) {
                    return
                }
                twoDivs[1] = currentDiv

                if (checkID(twoDivs, columnsNumber) == true) {
                    clearTab(twoDivs)
                    for (let r = 0; r < rowsNumber; r++) {
                        for (let item of divs) {
                            divsIds.push(item.id)
                        }
                        let id2 = 0

                        for (let id of divsIds) {
                            if ((parseInt(id2) + parseInt(columnsNumber)) >= (parseInt(divsCount))) {
                                break
                            }
                            let currentColor = document.getElementById(id).style.backgroundColor
                            if (document.getElementById(parseInt(id) + parseInt(columnsNumber)).style.backgroundColor == 'rgb(255, 255, 255)') {
                                document.getElementById((parseInt(id) + parseInt(columnsNumber))).style.backgroundColor = currentColor
                                document.getElementById(id).style.backgroundColor = 'rgb(255, 255, 255)'
                            }
                            id2++
                        }
                    }
                }

            }
            else {
                clearTab(twoDivs)
            }
        }
    }
}
