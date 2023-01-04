
//create some variables
let explosionImg = './images/explosion.png'
let explosionSound = new Audio('./audios/explosion-sound.mp3');
explosionSound.volume = 0.4;
let alienShipAttackSound = new Audio('./audios/laser-gun.mp3');
alienShipAttackSound.volume = 0.4;
let myShipAttackSound = new Audio('./audios/blaster-2.mp3');
myShipAttackSound.volume = 0.3;
let restartCloseButton = new Audio('./audios/open-doors.mp3');
restartCloseButton.volume = 0.3
let startSound = new Audio('./audios/game-start.mp3');
startSound.volume = 0.3
let myMusic = new Audio("./audios/epic_battle_music.mp3");
myMusic.volume = 0.3;
myMusic.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

let currentAlienShip = 0;
let myShipImg = "./images/USS_Ship.png";
let myShipName = 'USS';
let myShip;
// give the alien ship a name
let alienShipName = 'Alien Ship';
let alienShipsArray;

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

//create fucntion to simplify your code
const getElementById = (id) => {
    return document.getElementById(id)
}
const getElementsByClassName = (className) => {
    let htmlCollection = document.getElementsByClassName(className);
    let nodeList = Array.from(htmlCollection);
    return nodeList
}
const randomNumber = (startOfInterval, endOfInterval) => {
    let multiplier = endOfInterval - startOfInterval + 1;
    return startOfInterval + Math.floor(Math.random() * multiplier)
}
const scrollToTheBottom = () => {
    const container = getElementsByClassName('comments');
    let lastChild = container[container.length - 1];
    lastChild.scrollIntoView()
    // container.scrollIntoView(false);
}
//add comment to the page
const highlightDelay = (textContent, elementClass, time) => {
    let paragraph = document.createElement('p');
    paragraph.setAttribute('class', elementClass);
    paragraph.textContent = textContent;
    let highlightContainer = getElementById('highlight');
    setTimeout(() => {
        highlightContainer.appendChild(paragraph);
    }, time);
    setTimeout(() => {
        scrollToTheBottom()
    }, time + 500);
};
//function to create my new ship
const createMyShip = () => {
    let myShip = new Ship(myShipName)
    return myShip
}
//create new alien ships and return a list
const createAlienShipList = () => {
    let alienShips = new AlienShips;
    alienShips.addShipToList(alienShipName);
    let alienShipsArray = alienShips.ships
    return alienShipsArray;
}
const disableButton = (button) => {
    button.setAttribute('disabled', 'disabled')
}
const enableButton = (button) => {
    button.removeAttribute('disabled');
}
//display my data data on the page
const displayMyShipData = (myShipName, myHull, myFirepower, myAccuracy) => {
    //retrieve the first and second element of the stats div
    let hull = getElementsByClassName("hull")[1];
    let firepower = getElementsByClassName("firepower")[1];
    let accuracy = getElementsByClassName("accuracy")[1];
    let shipName = getElementsByClassName("name")[1]
    shipName.textContent = `${myShipName}`;
    hull.textContent = `Hull : ${myHull}`;
    firepower.textContent = `Firepower : ${myFirepower}`;
    accuracy.textContent = `Accuracy ${myAccuracy}`;
}
//display the alien ship data on the page
const displayAlienShipData = (alienName, alienHull, alienFirepower, alienAccuracy, alienShipImg) => {
    //make sure the alien image is correct
    let img = getElementById('alien-img');
    img.src = alienShipImg;
    //retrieve the first and second element of the stats div
    let hull = getElementsByClassName("hull")[0];
    let firepower = getElementsByClassName("firepower")[0];
    let accuracy = getElementsByClassName("accuracy")[0];
    let shipName = getElementsByClassName("name")[0]
    //for alien
    shipName.textContent = `${alienName}`;
    hull.textContent = `Hull : ${alienHull}`;
    firepower.textContent = `Firepower : ${alienFirepower}`;
    accuracy.textContent = `Accuracy : ${alienAccuracy}`;
}
const resumeTheGame = () => {
    if (!resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
        enableButton(attackButton)
        myMusic.play()
    }
}
const startTheGame = () => {
    startSound.play();
    myMusic.play();
    myShip = createMyShip();
    alienShipsArray = createAlienShipList();
    if (!resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
        enableButton(attackButton);
    }
    //show the game container and adjust the top of the button div
    let gameContainer = getElementById('game-div');
    gameContainer.classList.toggle('hidden');
    let mainContainer = getElementById('main');
    mainContainer.style.marginTop = '5px';
    let buttonList = getElementsByClassName('button');
    buttonList.forEach(button => {
        button.classList.toggle('hidden');
    });
    displayMyShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy)
    displayAlienShipData(alienShipsArray[0].name, alienShipsArray[0].hull, alienShipsArray[0].firepower, alienShipsArray[0].accuracy, alienShipsArray[0].shipImage);
    let myImg = getElementById('my');
    let aImg = getElementById('alien');
    let pos = -100;
    setInterval(() => {
        if (pos < 0) {
            pos++;
            myImg.style.bottom = pos + '%';
            aImg.style.top = pos + '%'
        }
    });
}

const restart = () => {
    restartCloseButton.play()
    myMusic.pause();
    let checker = 0;
    let prompt;
    let lastAlienShipHull = alienShipsArray[alienShipsArray.length - 1].hull;
    let outcome = getElementById('outcome');
    let gameContainer = getElementById('game-div')
    let myImg = getElementById('my');
    let aImg = getElementById('alien');
    if (resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
    }
    disableButton(attackButton)
    do {
        prompt = window.prompt("Do you want to restart?(y/n)");
        if (prompt === null || prompt.toLowerCase() === 'n' || prompt.toLowerCase() === 'no') {
            checker = 1
        }
        else if (prompt.toLowerCase() === 'y' || prompt.toLowerCase() === 'yes') {
            myMusic.currentTime = 0;
            checker = 1;
            startSound.play();
            myMusic.play();
            currentAlienShip = 0;
            let defeatedAlienShips = getElementsByClassName('destroyed-alien-ships');
            let comments = getElementsByClassName('comments');
            let outcomeResult = getElementsByClassName('result')
            defeatedAlienShips.forEach(child => {
                child.remove()
            })
            comments.forEach(child => {
                child.remove()
            })
            outcomeResult.forEach(child => {
                child.remove()
            })

            if (outcome.classList.contains('hidden') === false) {
                outcome.classList.toggle('hidden');
                gameContainer.classList.toggle('hidden')
            }
            if (!resume.classList.contains('hidden')) {
                resume.classList.toggle('hidden');
            }
            enableButton(attackButton)
            //give the myShip and alienShipsArrav variables new values
            myShip = createMyShip();
            alienShipsArray = createAlienShipList();
            //display the new contents on the pages
            displayMyShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy);
            displayAlienShipData(alienShipsArray[0].name, alienShipsArray[0].hull, alienShipsArray[0].firepower, alienShipsArray[0].accuracy, alienShipsArray[0].shipImage);
            let pos = -100;
            setInterval(() => {
                if (pos < 0) {
                    pos++;
                    myImg.style.bottom = pos + '%';
                    aImg.style.top = pos + '%'
                }
            });
        }
    } while (checker !== 1);
}

const closeTheGame = () => {
    let lastAlienShipHull = alienShipsArray[alienShipsArray.length - 1].hull;
    restartCloseButton.play()
    myMusic.pause();
    let checker = 0
    let prompt;
    if (resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
    }
    disableButton(attackButton)
    do {
        prompt = window.prompt("Do you want to close the game?(y/n)");
        if (prompt === null || prompt.toLowerCase() === 'n' || prompt.toLowerCase() === 'no') {
            checker = 1
        }
        else if (prompt.toLowerCase() === 'y' || prompt.toLowerCase() === 'yes') {
            checker = 1;
            location.reload()
        }
    } while (checker !== 1);
}

const attackTheAlien = () => {
    //attack the alienship
    let enemyShip = alienShipsArray[currentAlienShip];

    if (currentAlienShip < alienShipsArray.length) {
        //play the attack sound and disabled the attack button
        myShipAttackSound.play();
        disableButton(attackButton);
        disableButton(restartButton);
        disableButton(closeButton);
        attackButton.textContent = 'RELOADING...'
        //generate random number for attack accurancy
        let attackAccuracy = Math.random();
        if (attackAccuracy < myShip.accuracy) {
            //reduce the alien hull
            myShip.attack(enemyShip);
            //remove disabled attribute after 5 seconds
            setTimeout(() => {
                enableButton(attackButton);
                enableButton(restartButton);
                enableButton(closeButton)
                attackButton.innerText = 'ATTACK'
            }, 6000)
            //display comments and new data on the page
            highlightDelay('Attacking the alien ship...', 'my-ship comments', 0);
            highlightDelay('You have hit the alien ship!', 'my-ship comments', 1000);
            setTimeout(() => {
                displayAlienShipData(enemyShip.name, enemyShip.hull, enemyShip.firepower, enemyShip.accuracy, enemyShip.shipImage)
            }, 2000)
            //if the enemy ship is not destroy after the attack
            if (enemyShip.hull > 0) {
                //display a comment
                highlightDelay('The aliens ship survived!', 'alien-ship comments', 2000);
                setTimeout(() => {
                    alienShipAttackSound.play()
                }, 3000)
                highlightDelay('The aliens are attacking...', 'alien-ship comments', 3000);
                attackAccuracy = Math.random();
                if (attackAccuracy < enemyShip.accuracy) {
                    //have the enemy attack your ship
                    enemyShip.attack(myShip);
                    highlightDelay('You have been hit!', 'alien-ship comments', 4000);
                    //display a message when your ship health is very low
                    if (myShip.hull < 5 && myShip.hull > 0) {
                        highlightDelay('YOU HAVE LESS THAN 5 HULL REMAINING', 'destroyed comments', 5000);
                    }
                    //stop the game when your ship is destroyed
                    else if (myShip.hull <= 0) {
                        myShip.hull = 0;
                        setTimeout(() => {
                            getElementById('my-img').src = explosionImg;
                            myShip.hull = 0;
                            explosionSound.play()
                        }, 5000);

                        highlightDelay('GAME OVER', 'comments destroyed', 5000);
                        setTimeout(() => {
                            myMusic.pause();
                            getElementById('game-div').classList.toggle('hidden');
                            let outcomeContainer = getElementById('outcome');
                            outcomeContainer.classList.toggle('hidden');
                            let cinema = document.createElement('div');
                            cinema.setAttribute('class', 'result');
                            cinema.textContent = 'The planet Earth has been conquered by the Aliens after our last ship was defeated.';
                            outcomeContainer.appendChild(cinema)
                        }, 7000);
                    }
                    setTimeout(() => {
                        displayMyShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy)
                    }, 5000);
                }
                else {
                    highlightDelay('The aliens have missed!', 'comments destroyed', 4000);
                }
            }
            //do this if the alien ship health is at zero or less
            else {
                enemyShip.hull = 0;
                highlightDelay(`The aliens ship ${currentAlienShip + 1} was destroyed.`, 'destroyed comments', 2000);
                setTimeout(() => {
                    getElementById('alien-img').src = explosionImg;
                    explosionSound.play()
                }, 2000);
                //create a paragraph element to have the name of the defeated ship and append it into the destroyed ships div
                let recentDefeatedShip = document.createElement('p');
                recentDefeatedShip.setAttribute('class', 'destroyed-alien-ships');
                recentDefeatedShip.textContent = `${enemyShip.name}`
                let destroyedShips = getElementById('destroyed-ships');
                setTimeout(() => {
                    destroyedShips.appendChild(recentDefeatedShip);
                    currentAlienShip++;
                    //display the new ship data on the page
                    if (currentAlienShip < alienShipsArray.length) {
                        let aImg = getElementById('alien');
                        let pos = -100;
                        enemyShip = alienShipsArray[currentAlienShip];
                        setTimeout(() => {
                            displayAlienShipData(enemyShip.name, enemyShip.hull, enemyShip.firepower, enemyShip.accuracy, enemyShip.shipImage)
                            setInterval(() => {
                                if (pos < 0) {
                                    pos++;
                                    aImg.style.top = pos + '%'
                                }
                            });
                        }, 4000);

                    }
                    else {
                        highlightDelay('GAME OVER', 'comments destroyed', 1000);
                        setTimeout(() => {
                            myMusic.pause();
                            getElementById('game-div').classList.toggle('hidden');
                            let outcomeContainer = getElementById('outcome');
                            outcomeContainer.classList.toggle('hidden')
                            let cinema = document.createElement('div');
                            cinema.setAttribute('class', 'result');
                            cinema.textContent = 'The Aliens have been defeated. The planet Earth is safe.';
                            outcomeContainer.appendChild(cinema)
                        }, 3000);
                    }
                }, 2000)
            }
        }
        //do this if your fire accuracy was not on point
        else {
            highlightDelay('You missed your target!', 'destroyed comments', 0);
            setTimeout(() => {
                enableButton(attackButton);
                enableButton(closeButton);
                enableButton(restartButton);
                attackButton.innerText = 'ATTACK'
            }, 3000);
            //have the alien attack your ship
            highlightDelay('The aliens are attacking...', 'alien-ship comments', 1000);
            alienShipAttackSound.play()
            attackAccuracy = Math.random();
            if (attackAccuracy < enemyShip.accuracy) {
                enemyShip.attack(myShip);
                highlightDelay('You have been hit!', 'alien-ship comments', 2000);
                if (myShip.hull < 3 && myShip.hull > 0) {
                    highlightDelay('YOU HAVE LESS THAN 5 HULL REMAINING', 'destroyed comments', 3000)
                }
                else if (myShip.hull <= 0) {
                    setTimeout(() => {
                        getElementById('my-img').src = explosionImg;
                        explosionSound.play();
                        myShip.hull = 0;
                    }, 3000);
                    disableButton(attackButton);
                    highlightDelay('GAME OVER', 'comments destroyed', 3000);
                    setTimeout(() => {
                        myMusic.pause();
                        getElementById('game-div').classList.toggle('hidden');
                        let outcomeContainer = getElementById('outcome');
                        outcomeContainer.classList.toggle('hidden');
                        let cinema = document.createElement('div');
                        cinema.setAttribute('class', 'result');
                        cinema.textContent = 'The planet Earth has been conquered by the Aliens after our last ship was defeated.';
                        outcomeContainer.appendChild(cinema)
                    }, 6000);
                }
                setTimeout(() => {
                    displayMyShipData(myShip.name, myShip.hull, myShip.firepower, myShip.accuracy);
                }, 3000);
            }
            else {
                highlightDelay('The aliens have missed!', 'comments destroyed', 2000);
                return true;
            }
        }
    }
}

//set some events listener
const startButton = getElementById('start-button');
startButton.addEventListener('click', startTheGame);
const closeButton = getElementById('close-button');
closeButton.addEventListener('click', closeTheGame);
const restartButton = getElementById('restart-button');
restartButton.addEventListener('click', restart);
const attackButton = getElementById('attack-button');
attackButton.addEventListener('click', attackTheAlien)
setInterval(() => {
    //pause the game when the player click outside of the window
    if (!window.document.hasFocus() && !attackButton.hasAttribute('disabled') && resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
        myMusic.pause();
        disableButton(attackButton);
    }
});

const resume = getElementById('resume');
resume.addEventListener('click', resumeTheGame)