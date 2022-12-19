
//create function to simplyfy your code
const retrieveElementByID = (id) => {
    return document.getElementById(id);
}
const retrieveElementByTagName = (tagName) => {
    return document.querySelector(tagName)
}
const createNewElement = (tagName) => {
    return document.createElement(tagName)
}
const getClassList = (className) => {
    return document.querySelectorAll(className);
}
const randomNumber = (startOfInterval, endOfInterval) => {
    let multiplier = endOfInterval - startOfInterval + 1;
    return startOfInterval + Math.floor(Math.random() * multiplier)
}
//function to create my new ship and new alien ships
const createMyShip = () => {
    let myShip = new Ship(myShipName)
    return myShip
}
const createAlienShipList = () => {
    let alienShips = new AlienShips;
    alienShips.addShipToList(alienShipName);
    let alienShipsArray = alienShips.ships
    return alienShipsArray;
}
//function to get myship and the alien ship data and display them into the page
const displayShipData = (myShipName, myHull, myFirepower, myAccuracy, alienName, alienHull, alienFirepower, alienAccuracy, alienShipImg) => {
    //,ake sure the alien image is correct
    getClassList('.alienShipImg')[0].src = alienShipImg;
    //retrieve the first and second element of the stats div
    let hullList = getClassList(".hull");
    let firepowerList = getClassList(".firepower");
    let accuracyList = getClassList(".accuracy");
    let shipNameList = getClassList(".ship-name")
    //insert my data
    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            //for alien
            shipNameList[0].textContent = `${alienName}`;
            hullList[0].textContent = `Hull : ${alienHull}`;
            firepowerList[0].textContent = `Firepower : ${alienFirepower}`;
            accuracyList[0].textContent = `Accuracy : ${alienAccuracy}`;
        }
        //for my ship
        else {
            shipNameList[1].textContent = `${myShipName}`;
            hullList[1].textContent = `Hull : ${myHull}`;
            firepowerList[1].textContent = `Firepower : ${myFirepower}`;
            accuracyList[1].textContent = `Accuracy ${myAccuracy}`;
        }
    }
}
//scroll to the bottom
const scrollToTheBottom = (element) => {
    let container = getClassList(element)[0];
    container.scrollIntoView(false)
}
//change the page display when the start button is clicked
const startTheGame = () => {
    myShip = createMyShip();
    alienShipsArray = createAlienShipList();
    //create the main div for the game
    let newDiv = createNewElement("div");
    //create three divs to append in the newDiv
    let statDiv = createNewElement("div");
    let shipBattleDiv = createNewElement('div');
    let defeatedShipsDiv = createNewElement("div");
    //set the attributes to the created divs
    newDiv.setAttribute("class", "game-div");
    statDiv.setAttribute("class", "stats");
    shipBattleDiv.setAttribute('class', 'ships-battle');
    defeatedShipsDiv.setAttribute('class', 'defeated-ships')
    //create two divs and append them into the statsDiv to display my ship and the alien ships data.
    //create two images elements and append them into the shipBattleDiv
    for (let i = 0; i < 2; i++) {
        let div = createNewElement('div');
        //create three elements to append into the divs
        let divTitle = createNewElement('h2');
        divTitle.setAttribute('class', 'ship-name');
        div.appendChild(divTitle);
        for (let i = 0; i < 3; i++) {
            let numericData = createNewElement('p');
            if (i == 0) {
                numericData.setAttribute('class', 'hull')
                div.appendChild(numericData)
            }
            else if (i == 1) {
                numericData.setAttribute('class', 'firepower')
                div.appendChild(numericData)
            }
            else {
                numericData.setAttribute('class', 'accuracy')
                div.appendChild(numericData)
            }
        }
        let newImg = createNewElement('img')
        //set the attributes for the two divs and images
        div.setAttribute("class", "stats-div");
        if (i == 0) {
            //set id attribute for the alien div and append it into the statDiv
            div.setAttribute('id', 'alien-stat');
            statDiv.appendChild(div);
            newImg.setAttribute('src', `${alienShipsArray[0].shipImage}`);
            newImg.setAttribute('alt', 'alien ship');
            newImg.setAttribute('class', 'alienShipImg')
            shipBattleDiv.appendChild(newImg);
        }
        //set id attribute for the my ship div and append it into the statDiv
        else {
            div.setAttribute('id', 'my-stat');
            statDiv.appendChild(div);
            newImg.setAttribute('src', `${myShipImg}`);
            newImg.setAttribute('alt', 'my ship');
            newImg.setAttribute('class', 'myShipImg')
            shipBattleDiv.appendChild(newImg);
        }
    }

    //create two main elements to put into the defeatedShipsDiv
    //create a div to display the defeated ship
    let div = createNewElement('div');
    div.setAttribute('class', 'destroyed-ships')
    let divTitle = createNewElement('h2');
    divTitle.setAttribute('class', 'defeated-ships-title');
    divTitle.textContent = 'Defeated Ships';
    div.appendChild(divTitle);
    defeatedShipsDiv.appendChild(div);
    //create a highlight div
    let highlight = createNewElement('div');
    highlight.setAttribute('class', 'highlight');
    let paraDiv = createNewElement('div');
    paraDiv.setAttribute('class', 'para-div');
    highlight.appendChild(paraDiv);
    defeatedShipsDiv.appendChild(highlight);
    //create the attack button
    let buttonElement = createNewElement('button');
    buttonElement.setAttribute('id', 'attack-button');
    buttonElement.setAttribute('type', 'button');
    buttonElement.setAttribute('onclick', 'attackTheAlien()')
    buttonElement.textContent = 'ATTACK';
    defeatedShipsDiv.appendChild(buttonElement);

    //append the statDiv, shipeBattleDiv, and defeatedShipsDiv into the newDiv
    newDiv.appendChild(statDiv);
    newDiv.appendChild(shipBattleDiv);
    newDiv.appendChild(defeatedShipsDiv);
    //append the newDiv into your page
    let initialPage = getClassList(".initial-page")[0]
    initialPage.appendChild(newDiv);
    //reduce the space between the title and the buttons by giving it the appropriate class
    initialPage.classList.toggle("game-button-div");
    //display all the hidden elements when the start button is clicked by adding the appropriate class name
    let hiddenClassList = getClassList(".hidden");
    for (let i = 0; i < hiddenClassList.length; i++) {
        hiddenClassList[i].classList.toggle("show")
    }
    //hide the start button
    retrieveElementByID("start-button").classList.toggle("hidden");
    //display all the game data on the page
    displayShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy, alienShipsArray[0].name, alienShipsArray[0].hull, alienShipsArray[0].firepower, alienShipsArray[0].accuracy, alienShipsArray[0].shipImage)
    // let data = [];
    // data.push(myShip, alienShipsArray)
}
//restart the game
const restart = () => {
    let destroyedShips = getClassList('.destroyed-alien-ships');
    destroyedShips.forEach(el => {
        el.remove()
    })
    currentAlienShip = 0;
    //give the myShip and alienShipsArrav variables new values
    myShip = createMyShip();
    alienShipsArray = createAlienShipList();
    //give the alien ship display at the start of the game the image of the first ship in the alien ships list
    // getClassList(".alienShipImg")[0].src = alienShipsArray[0].shipImage;
    //display the new contents on the pages
    displayShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy, alienShipsArray[0].name, alienShipsArray[0].hull, alienShipsArray[0].firepower, alienShipsArray[0].accuracy, alienShipsArray[0].shipImage);
}
//close the game
const closeTheGame = () => {
    location.reload()
}
const highlightDelay = (textContent, elementClass, time) => {
    let paragraph = createNewElement('p');
    paragraph.setAttribute('class', elementClass);
    paragraph.textContent = textContent;
    let highlightContainer = getClassList('.para-div')[0];
    setTimeout(() => {
        highlightContainer.appendChild(paragraph)
    }, time)
}
const attackTheAlien = () => {
    let paraDiv = getClassList('.para-div')[0];
    scrollToTheBottom('.para-div')
    //disabled the attack button for a certain amount of time after it has been clicked to avoid double click
    let attackButton = retrieveElementByID('attack-button');
    attackButton.setAttribute('disabled', 'disabled');
    attackButton.innerText = "RELOADING..."
    setTimeout(() => {
        attackButton.removeAttribute('disabled'),
            attackButton.innerText = "ATTACK"
    }, 2000)
    //attack the alienship
    let enemyShip = alienShipsArray[currentAlienShip];
    if (currentAlienShip < alienShipsArray.length) {
        //attack first
        //generate random number for attack accurancy
        let myAttackAccuracy = Math.random();
        if (myAttackAccuracy < myShip.accuracy) {
            highlightDelay('Attacking the alien ship...', 'my-ship-comment', 0)
            myShip.attack(enemyShip)
        }

        //update the page
        displayShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy, enemyShip.name, enemyShip.hull, enemyShip.firepower, enemyShip.accuracy, enemyShip.shipImage)
        //alien ship attack when their hull is greater than zero after the attack
        if (enemyShip.hull > 0) {
            let alienAttackAccuracy = Math.random();
            if (alienAttackAccuracy < enemyShip.accuracy) {
                enemyShip.attack(myShip)
            }
            //update the page
            displayShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy, enemyShip.name, enemyShip.hull, enemyShip.firepower, enemyShip.accuracy, enemyShip.shipImage)
        }
        else {
            console.log(enemyShip.hull)
            console.log("Ship has been destroyed");
            //create a paragraph element to have the name of the defeated ship and append it into the destroyed ships div
            let recentDefeatedShip = createNewElement('p');
            recentDefeatedShip.setAttribute('class', 'destroyed-alien-ships');
            recentDefeatedShip.textContent = `${enemyShip.name}`
            let destroyedShips = getClassList('.destroyed-ships')[0];
            destroyedShips.appendChild(recentDefeatedShip)
            currentAlienShip++
            enemyShip = alienShipsArray[currentAlienShip]
        }
        if (currentAlienShip < alienShipsArray.length) {
            displayShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy, enemyShip.name, enemyShip.hull, enemyShip.firepower, enemyShip.accuracy, enemyShip.shipImage)
        }
    }
    else {
        console.log('game over')
    }

    // console.log(alienShipsArray[0])
    //check the accuracy of my ship attack
    //     if (myAttackAccuracy < myShip.accuracy) {
    //         //substract some point from the alien's hull and write a message to be displayed your page
    //         console.log(myAttackAccuracy)
    //         console.log("you hit the alien shit");
    //         console.log(alienShip)
    //         alienShip.reduceHull(myShip);
    //         console.log(alienShip)
    //     }
    //     else {
    //         //write a message to be displayed on your page
    //         console.log(myAttackAccuracy);
    //         console.log("you missed")
    //     }
    // }
}
//create some variables
let myShipImg = "./images/USS_Ship.png";
//list of ship's picture
let shipImageArray = ["https://media.istockphoto.com/id/1293657810/photo/unidentified-flying-object-clipping-path-included-ufo.jpg?s=612x612&w=0&k=20&c=XmgXeAuC4je0059vwN7J4K1IYHpPPPcnRT-B7yNFv1g=",
    "https://media.istockphoto.com/id/1346068917/photo/ufo-rotating-spacecraft-with-extraterrestrial-visitors-alien-flying-saucer-3d-rendering.jpg?s=612x612&w=0&k=20&c=4dCyQ-BkC0gThGHB7bbWHRvpT3eWuZ0NbcVjieku5ec=", "https://media.istockphoto.com/id/1190335915/photo/ufo-alien-spaceship-with-extraterrestrial-visitors-flying-saucer.jpg?s=612x612&w=0&k=20&c=AnMGz8--YEqdTMb5RoNbj-E7WIBP3ogbNfUijCFafp4=", "https://media.istockphoto.com/id/908964808/photo/ufo-alien-spaceship-with-extraterrestrial-visitors-flying-saucer.jpg?s=612x612&w=0&k=20&c=l-WU5k23F0ePQn25LdkOyMGSxtWMU93wxdIiUfLZLnY=", "https://media.istockphoto.com/id/1329080227/photo/3d-ufo-spacecraft-isolated-on-black.jpg?s=612x612&w=0&k=20&c=Jg2ghnhqAsUsg2FxDgqp6RRAsMaOChlWsx07uaMfAuI=", "https://media.istockphoto.com/id/499384093/photo/alien-mothership-in-deep-space-travel.jpg?s=612x612&w=0&k=20&c=tLs4ykWd_DKD10pmENCOljM8E2FKMEPl7RuxQko3sno=", "https://media.istockphoto.com/id/914151838/photo/ufo-alien-spaceship-isolated-on-black-background-flying-saucer-with-steampunk-look.jpg?s=612x612&w=0&k=20&c=AOBQIuFgaR1SMo5IvfIl8c8yhQdYFrXow4DnJtGq3ws=", "https://media.istockphoto.com/id/538338168/photo/science-fiction-interplanetary-spaceship-rear-angled-view.jpg?s=612x612&w=0&k=20&c=Ruj6gdOl7CZ2StEeUrlCeMMTPIyCz8FUO5f4FREBLc8="];


//create a ship
class Ship {
    constructor(name, hull, firepower, accuracy = 0.7) {
        this.name = name;
        this.hull = hull | 20;
        this.firepower = firepower | 5;
        this.accuracy = accuracy;
    }
    //method to reduce ship health when damaged due to the attack
    attack(ship) {
        ship.hull -= this.firepower
    }
}
//class to generate an alien ships list
class AlienShips {
    constructor() {
        this.shipImage;
        this.ships = []
    }
    //insert alien ships in the list
    addShipToList(name) {
        //generate number of ship randomly from 6 to 8 inclusive
        let numberOfAlienShips = randomNumber(6, 8);
        for (let i = 0; i < numberOfAlienShips; i++) {
            let alienShip = new Ship(`${name} ${i + 1}`);
            //generate the health for the alien ship from 3 to 6 inclusive
            alienShip.hull = randomNumber(3, 6);
            //generate the firepower for the alien ship from 2 to 4 inclusive
            alienShip.firepower = randomNumber(2, 4);
            //generate the health for the alien ship from 0.6 to 0.8 inclusive
            alienShip.accuracy = randomNumber(6, 8) / 10;
            //give the ship an image
            alienShip.shipImage = shipImageArray[randomNumber(0, shipImageArray.length - 1)]
            //add the new ship to the list
            this.ships.push(alienShip);
        }
    }
}
//create a variable to let you know you are in the alien ships list
let currentAlienShip = 0;
//give your ship a name
let myShipName = 'USS';
let myShip;
// give the alien ship a name
let alienShipName = 'Alien Ship';
let alienShipsArray;