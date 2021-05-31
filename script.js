//zmienne globalne
var clicks = 0;
let currentDiv = "";
let columnsNumber = 0;
let rowsNumber = 0;
let clicksTab = [];
let colorsTab = [];
let twoDivs = [];
let divs;
let divsCount;
let elementsNumber = 0;
let divsIds = [];
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
    if (tab != undefined)
        tab.length = 0;
}

//funkcja sprawdzajaca czy klikniete elementy sa obok siebie i zmienia ich kolor na bialy
function checkID(tab, columnsNumber) {
    let firstID = parseInt(tab[0]);
    let secondID = parseInt(tab[1]);
    let firstColor = document.getElementById(firstID);
    let secondColor = document.getElementById(secondID);
    //console.log('kolumny2')
    //console.log(columnsNumber)
    //console.log(secondID + parseInt(columnsNumber));
    //console.log(firstID + parseInt(columnsNumber));
    //console.log(firstID);
    //console.log(secondID);
    if ((((firstID == secondID + 1) || (firstID == secondID - 1)) || ((firstID == secondID - columnsNumber) || (secondID == firstID - columnsNumber))) && (firstColor.style.backgroundColor == secondColor.style.backgroundColor)) {
        // console.log(document.getElementById(tab[0]).style.backgroundColor);
        // console.log(document.getElementById(tab[1]).style.backgroundColor);
        //console.log('są obok w poziomie i mają ten sam kolor')
        firstColor.style.backgroundColor = 'rgb(255, 255, 255)';
        secondColor.style.backgroundColor = 'rgb(255, 255, 255)';
        return true;
    }
}

//funkcja wyswietlajaca strzalki
// inputs[i].onclick = function showArrows() {
//     document.getElementsByTagName('input::-webkit-inner-spin-button').style['-webkit-appearance'] = "";
// }

//funkcja generujaca pole gry
document.getElementById("generator").onclick = function generate() {
    clearTab(divs);
    clearTab(colorsTab);
    clearTab(twoDivs);
    elementsNumber = 0;
    createTab();
    rowsNumber = document.getElementById("rows").value;
    columnsNumber = document.getElementById("columns").value;
    clicks++;
    if (clicks != 0) {
        childNumber = container.childElementCount;
        //console.log(childNumber);
        for (var i = 0; i < childNumber; i++) {
            let currentId = i;
            child = document.getElementById(currentId);
            container.removeChild(child);
        }
    }

    container.style.gridTemplateColumns = 'repeat(' + columnsNumber + ', 70px)';

    elementsNumber = rowsNumber * columnsNumber;
    //console.log(columnsNumber)
    //console.log(rowsNumber)

    for (var i = 0; i < elementsNumber; i++) {
        let element = document.createElement('div');
        let currentId = i;
        element.style.backgroundColor = chooseColor();
        element.className = "element";
        element.id = currentId;
        document.getElementById('container').appendChild(element);
    }

    divs = document.getElementsByClassName("element");
    //console.log(divs);
    divsCount = divs.length;
    //console.log('divy1 ' + divsCount);
    //console.log(divsIds)
    for (var i = 0; i < divsCount; i++) {
        //divsIds.push(currentDiv);
        divs[i].onclick = function getID() {
            currentDiv = this.id;
            console.log(currentDiv);
            if (twoDivs.length == 0) {
                twoDivs[0] = currentDiv;
                //console.log(twoDivs);
            }
            else if (twoDivs.length == 1) {
                if (currentDiv == twoDivs[0]) {
                    //console.log('taki sam');
                    return;
                }
                twoDivs[1] = currentDiv;
                console.log(twoDivs);
                //console.log('kolumny');
                //console.log(columnsNumber);
                //checkID(twoDivs, columnsNumber);

                if (checkID(twoDivs, columnsNumber) == true) {
                    //console.log(divs);
                    //console.log('divy2 ' + divsCount);
                    //console.log('działa');
                    console.log('tablica pełna');
                    clearTab(twoDivs);
                    console.log(twoDivs);
                    console.log('rows: ' + rowsNumber)
                    for (var r = 0; r < rowsNumber; r++) {
                        for (let item of divs) {
                            divsIds.push(item.id)
                            //console.log(item.id);
                            //console.log(divsIds);
                        }
                        let id2 = 0

                        for (let id of divsIds) {
                            if ((parseInt(id2) + parseInt(columnsNumber)) >= (parseInt(divsCount))) {
                                break;
                            }
                            let currentColor = document.getElementById(id).style.backgroundColor;
                            //console.log(currentColor)
                            //console.log(id);
                            //console.log('div pod: ' + (parseInt(id) + parseInt(columnsNumber)));]
                            if (document.getElementById(parseInt(id) + parseInt(columnsNumber)).style.backgroundColor == 'rgb(255, 255, 255)') {
                                document.getElementById((parseInt(id) + parseInt(columnsNumber))).style.backgroundColor = currentColor;
                                document.getElementById(id).style.backgroundColor = 'rgb(255, 255, 255)';
                                console.log("sprawdzam")
                            }
                            //console.log('id2:' + id2)
                            id2++;
                        }
                    }
                }

            }
            else {
                clearTab(twoDivs);
            }
        }
    }
}
