//zmienne globalne
var clicks = 0;
let currentDiv = "";
let columnsNumber = 0;
let rowsNumber = 0;
let clicksTab = [];
let colorsTab = [];
let twoDivs = [];
const container = document.getElementById('container');

//funkcja losujaca kolor hex
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//funkcja tworzaca tablice z losowymi kolorami hex w zaleznosci od ilosci podanej przez uzytkownika
function createTab() {
    let colors = document.getElementById('colors').value;
    for (var i = 0; i < colors; i++) {
        colorsTab[i] = getRandomColor();
    }
}

//funkcja losujaca kolor z tablicy
function chooseColor() {
    randomColor = colorsTab[Math.floor(Math.random() * colorsTab.length)];
    return randomColor;
}

//funkcja czyszczaca tablice z kolorami
function clearTab(tab) {
    tab.length = 0;
}

//funkcja sprawdzajaca czy klikniete elementy sa obok siebie i zmienia ich kolor na bialy
function checkID(tab, columnsNumber) {
    let firstID = parseInt(tab[0]);
    let secondID = parseInt(tab[1]);
    let firstColor = document.getElementById(firstID);
    let secondColor = document.getElementById(secondID);
    console.log('kolumny2')
    console.log(columnsNumber)
    console.log(secondID + parseInt(columnsNumber));
    console.log(firstID + parseInt(columnsNumber));
    console.log(firstID);
    console.log(secondID);
    if ((((firstID == secondID + 1) || (firstID == secondID - 1)) || ((firstID == secondID - columnsNumber) || (secondID == firstID - columnsNumber))) && (firstColor.style.backgroundColor == secondColor.style.backgroundColor)) {
        // console.log(document.getElementById(tab[0]).style.backgroundColor);
        // console.log(document.getElementById(tab[1]).style.backgroundColor);
        console.log('są obok w poziomie i mają ten sam kolor')
        firstColor.style.backgroundColor = 'rgb(255, 255, 255)';
        secondColor.style.backgroundColor = 'rgb(255, 255, 255)';
    }
}

//funkcja wyswietlajaca strzalki
// inputs[i].onclick = function showArrows() {
//     document.getElementsByTagName('input::-webkit-inner-spin-button').style['-webkit-appearance'] = "";
// }

//funkcja generujaca pole gry
document.getElementById("generator").onclick = function generate() {

    createTab();
    rowsNumber = document.getElementById("rows").value;
    columnsNumber = document.getElementById("columns").value;
    clicks++;
    if (clicks != 0) {
        childNumber = container.childElementCount;
        console.log(childNumber);
        for (var i = 0; i < childNumber; i++) {
            let currentId = i;
            child = document.getElementById(currentId);
            container.removeChild(child);
        }
    }

    container.style.gridTemplateColumns = 'repeat(' + columnsNumber + ', 70px)';

    let elementsNumber = rowsNumber * columnsNumber;
    console.log(columnsNumber)
    console.log(rowsNumber)

    for (var i = 0; i < elementsNumber; i++) {
        let element = document.createElement('div');
        let currentId = i;
        element.style.backgroundColor = chooseColor();
        element.className = "element";
        element.id = currentId;
        document.getElementById('container').appendChild(element);
    }

    var divs = document.getElementsByClassName("element");
    console.log(divs);
    var divsCount = divs.length;
    for (var i = 0; i < divsCount; i++) {
        divs[i].onclick = function getID() {
            currentDiv = this.id;
            console.log(currentDiv);
            if (twoDivs.length == 0) {
                twoDivs[0] = currentDiv;
                console.log(twoDivs);
            }
            else if (twoDivs.length == 1) {
                if (currentDiv == twoDivs[0]) {
                    console.log('taki sam');
                    return;
                }
                twoDivs[1] = currentDiv;
                console.log(twoDivs);
                console.log('kolumny');
                console.log(columnsNumber);
                checkID(twoDivs, columnsNumber);
                console.log('tablica pełna');
                clearTab(twoDivs);
                console.log(twoDivs);
            }
            else {
                clearTab(twoDivs);
            }
        }
    }
    clearTab(divs);
    clearTab(colorsTab);
    elementsNumber = 0;
}
