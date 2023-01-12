
//create some variables
let missile;
let time;
let myShield;
let sleep;
let level = 0;
let prompt;
let startButton;
let restartButton;
let closeButton;
let attackButton;
let missileButton;
let resume;
let volume = 0.4
let explosionImg = './images/explosion.png';
let explosionSound = new Audio('./audios/explosion-sound.mp3');
let alienShipAttackSound = new Audio('./audios/laser-gun.mp3');
let myShipAttackSound = new Audio('./audios/blaster-2.mp3');
let restartCloseButton = new Audio('./audios/open-doors.mp3');
let startSound = new Audio('./audios/game-start.mp3');
let myMusic = new Audio("./audios/epic_battle_music.mp3");
let soundArray = [explosionSound, alienShipAttackSound, myShipAttackSound, restartCloseButton, startSound, myMusic];
soundArray.forEach(el => {
    el.volume = volume;
})
//make sure the music repeat
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
        this.hull = hull | 20 + level;
        this.firepower = firepower | 5;
        this.accuracy = accuracy;
    }
    //method to reduce ship health when damaged due to the attack
    attack(ship, shield = 0) {
        ship.hull -= this.firepower - shield;
        if (ship.hull < 0) {
            ship.hull = 0;
        }
    }
}
//class to generate an alien ships list
class AlienShips {
    constructor() {
        this.shipImage;
        this.ships = []
    }
    //insert alien ships in the list
    addShipToList(name, multiplier = level) {
        //generate number of ship randomly from 6 to 8 inclusive
        let numberOfAlienShips = randomNumber(6, 8);
        for (let i = 0; i < numberOfAlienShips; i++) {
            let alienShip = new Ship(`${name} ${i + 1}`);
            //generate the health for the alien ship from 3 to 6 inclusive
            alienShip.hull = randomNumber(3 + multiplier, 6 + multiplier);
            //generate the firepower for the alien ship from 2 to 4 inclusive
            alienShip.firepower = randomNumber(2 + multiplier, 4 + multiplier);
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
//make sure the result comme as a node list
const getElementsByClassName = (className) => {
    let htmlCollection = document.getElementsByClassName(className);
    let nodeList = Array.from(htmlCollection);
    return nodeList
}
//generate a random number in a specify interval
const randomNumber = (startOfInterval, endOfInterval) => {
    let multiplier = endOfInterval - startOfInterval + 1;
    return startOfInterval + Math.floor(Math.random() * multiplier)
}
//focus on the last append child
const scrollToTheBottom = () => {
    const container = getElementsByClassName('comments');
    let lastChild = container[container.length - 1];
    lastChild.scrollIntoView()
    // container.scrollIntoView(false);
}
//add comment to the page with a delay
const highlight = (textContent, elementClass, time) => {
    let paragraph = document.createElement('p');
    paragraph.setAttribute('class', elementClass);
    paragraph.textContent = textContent;
    let highlightContainer = getElementById('highlight');
    paragraph.textContent = textContent;
    setTimeout(() => {
        highlightContainer.appendChild(paragraph);
        scrollToTheBottom()
    }, time);

};

//function to create my new ship
const createMyShip = () => {
    let myShip = new Ship(myShipName)
    return myShip
}
//create new alien ships and return a list
const createAlienShipList = () => {
    let alienShips = new AlienShips;
    alienShips.addShipToList(alienShipName, level);
    let alienShipsArray = alienShips.ships
    return alienShipsArray;
}
const disableButton = (button) => {
    button.setAttribute('disabled', '')
}
const enableButton = (button) => {
    button.removeAttribute('disabled');
}
//display my data data on the page
const displayMyShipData = () => {
    //retrieve the first and second element of the stats div
    let hull = getElementsByClassName("hull")[1];
    let firepower = getElementsByClassName("firepower")[1];
    let accuracy = getElementsByClassName("accuracy")[1];
    let shipName = getElementsByClassName("name")[1]
    shipName.textContent = `${myShipName}`;
    hull.textContent = `Hull : ${myShip.hull}`;
    firepower.textContent = `Firepower : ${myShip.firepower}`;
    accuracy.textContent = `Accuracy ${myShip.accuracy}`;
}
//display the alien ship data on the page
const displayAlienShipData = () => {
    //make sure the alien image is correct
    let img = getElementById('alien-img');
    img.src = alienShipsArray[currentAlienShip].shipImage;
    //retrieve the first and second element of the stats div
    let hull = getElementsByClassName("hull")[0];
    let firepower = getElementsByClassName("firepower")[0];
    let accuracy = getElementsByClassName("accuracy")[0];
    let shipName = getElementsByClassName("name")[0]
    //for alien
    shipName.textContent = alienShipsArray[currentAlienShip].name;
    hull.textContent = 'Hull : ' + alienShipsArray[currentAlienShip].hull;
    firepower.textContent = 'Firepower : ' + alienShipsArray[currentAlienShip].firepower;
    accuracy.textContent = 'Accuracy : ' + alienShipsArray[currentAlienShip].accuracy;
}
const resumeTheGame = () => {
    if (!resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
        enableButton(attackButton);
        enableButton(missileButton)
        myMusic.play()
    }
}
const increaseMyHullAndFirepower = () => {
    myShip.hull += myShield
    myShip.firepower += randomNumber(2, 5);
    displayMyShipData();
    highlight(`Your ship shield has been activated and your firepower increased to ${myShip.firepower}`, 'destroyed comments');
}
const startTheGame = () => {
    missile = 0;
    level = 0;
    startSound.play();
    myMusic.play();
    myShip = createMyShip();
    alienShipsArray = createAlienShipList();
    if (!resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
        enableButton(attackButton);
        enableButton(missileButton)
    }
    let gameContainer = getElementById('game-div');
    gameContainer.classList.toggle('hidden');
    let mainContainer = getElementById('main');
    mainContainer.style.marginTop = '5px';
    closeButton.classList.toggle('hidden');
    restartButton.classList.toggle('hidden')
    startButton.classList.toggle('hidden')
    displayMyShipData()
    displayAlienShipData();
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
const restartOrContinueAction = () => {
    let outcome = getElementById('outcome');
    let gameContainer = getElementById('game-div')
    let aImg = getElementById('alien');
    startSound.play();
    myMusic.play();
    currentAlienShip = 0;
    let defeatedAlienShips = getElementsByClassName('destroyed-alien-ships');
    let comments = getElementsByClassName('comments');
    let outcomeResult = getElementsByClassName('result');
    let combinationArray = [defeatedAlienShips, comments, outcomeResult];
    combinationArray.forEach(array => {
        array.forEach(element => {
            element.remove()
        })
    })

    if (outcome.classList.contains('hidden') === false) {
        outcome.classList.toggle('hidden');
        gameContainer.classList.toggle('hidden')
    }
    if (!resume.classList.contains('hidden')) {
        resume.classList.toggle('hidden');
    }
    if (!missileButton.classList.contains('hidden')) {
        missileButton.classList.toggle('hidden')
    }
    enableButton(attackButton);
    enableButton(missileButton);
    //give the myShip and alienShipsArrav variables new values
    myShip = createMyShip();
    alienShipsArray = createAlienShipList();
    //display the new contents on the pages
    displayMyShipData();
    displayAlienShipData();
    let pos = -100;
    setInterval(() => {
        if (pos < 0) {
            pos++;
            aImg.style.top = pos + '%'
        }
    });
}
const restart = () => {
    restartCloseButton.play()
    myMusic.pause();
    checker = 0;
    do {
        prompt = window.prompt("Do you want to restart? (y/n)");
        if (prompt === null) {
            checker = 0
            restartCloseButton.play()
        }
        else if (prompt.toLowerCase() === 'n' || prompt.toLowerCase() === 'no') {
            checker = 1;
            restartCloseButton.play()
            if (resume.classList.contains('hidden')) {
                resume.classList.toggle('hidden');
            }
            disableButton(attackButton)
        }
        else if (prompt.toLowerCase() === 'y' || prompt.toLowerCase() === 'yes') {
            restartCloseButton.play();
            myMusic.currentTime = 0;
            level = 0;
            missile = 0;
            getElementById('my-img').src = myShipImg;
            checker = 1;
            restartOrContinueAction();
            missile = 0;

        }
    } while (checker !== 1);
}

const closeTheGame = () => {
    restartCloseButton.play()
    myMusic.pause();
    checker = 0;
    do {
        prompt = window.prompt("Do you want to close the game? (y/n)");
        if (prompt === null) {
            restartCloseButton.play()
            checker = 0
        }
        else if (prompt.toLowerCase() === 'n' || prompt.toLowerCase() === 'no') {
            restartCloseButton.play();
            disableButton(attackButton)
            checker = 1
            if (resume.classList.contains('hidden')) {
                resume.classList.toggle('hidden');
            }
        }
        else if (prompt.toLowerCase() === 'y' || prompt.toLowerCase() === 'yes') {
            level = 0;
            restartCloseButton.play()
            checker = 1;
            location.reload()
        }
    } while (checker !== 1);
}
const gameOver = () => {
    let paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'destroyed comments');
    paragraph.textContent = 'GAME OVER';
    let highlightContainer = getElementById('highlight');
    highlightContainer.appendChild(paragraph);
    scrollToTheBottom();
}

const earthDefeated = () => {
    getElementById('my-img').src = explosionImg;
    explosionSound.play();
    myShip.hull = 0;
    myMusic.pause();
    getElementById('game-div').classList.toggle('hidden');
    let outcomeContainer = getElementById('outcome');
    outcomeContainer.classList.toggle('hidden');
    let cinema = document.createElement('div');
    cinema.setAttribute('class', 'result');
    cinema.textContent = 'The planet Earth has been conquered by the Aliens after our last ship was defeated.';
    outcomeContainer.appendChild(cinema);
    let achievement = document.createElement('p');
    achievement.setAttribute('class', 'result');
    achievement.textContent = `Congratulation! you have reached level ` + (level + 1)
    disableButton(attackButton);
    outcomeContainer.appendChild(achievement)
}
const alienDefeated = () => {
    myMusic.pause();
    getElementById('game-div').classList.toggle('hidden');
    let outcomeContainer = getElementById('outcome');
    outcomeContainer.classList.toggle('hidden')
    let cinema = document.createElement('div');
    cinema.setAttribute('class', 'result');
    cinema.textContent = 'The Aliens have been defeated. The planet Earth is safe.';
    outcomeContainer.appendChild(cinema);
    let achievement = document.createElement('p');
    achievement.setAttribute('class', 'result');
    achievement.textContent = `Congratulation! you have reached level ${level + 1}`;
    outcomeContainer.appendChild(achievement);
}

const addMissile = () => {
    missileButton
    let numberOfMissile = getElementById('number-of-missile');
    myShip.firepower += 10;
    myShip.accuracy = 1;
    displayMyShipData();
    highlight('you added a missile. Your firepower and accuracy have increased!', 'comments destroyed', 0);
    disableButton(missileButton);
    console.log(missileButton)
    if (missile > 1) {
        missile--;
        numberOfMissile.textContent = `+${missile}`
    }
    else {
        missileButton.classList.toggle('hidden')
    }
}

const attackTheAlien = () => {
    missileButton = getElementById('missile');
    time = 0;
    sleep = 1000
    //attack the alienship
    let enemyShip = alienShipsArray[currentAlienShip];
    if (currentAlienShip < alienShipsArray.length) {

        //play the attack sound and disabled the attack button
        myShipAttackSound.play();
        disableButton(attackButton);
        disableButton(restartButton);
        disableButton(closeButton);
        attackButton.textContent = 'RELOADING...'

        //create a logic for a shield when activated, increase the firepower of your ship and strenghen your defense.
        myShield = Math.floor(Math.random() * 10);
        if (myShield <= 3) {
            if (myShip.firepower === 5) {
                time = 1000;
                increaseMyHullAndFirepower()
            }
        }

        //generate random number for attack accurancy
        let attackAccuracy = Math.random();
        // Do this if your aim was on point
        if (attackAccuracy < myShip.accuracy) {
            //remove disabled attribute after 5 seconds
            setTimeout(() => {
                enableButton(attackButton);
                enableButton(restartButton);
                enableButton(closeButton);
                enableButton(missileButton)
                attackButton.innerText = 'FIRE';
            }, 6000);

            //reduce the alien hull
            myShip.attack(enemyShip);

            //display comments and new data on the page
            setTimeout(() => {

            }, time);
            highlight('Attacking the alien ship...', 'my-ship comments', time);
            highlight('You have hit the alien ship!', 'my-ship comments', time += sleep);

        }
        // Do this if you missed
        else {
            highlight('You missed your target!', 'destroyed comments', time);
            setTimeout(() => {
                enableButton(attackButton);
                enableButton(closeButton);
                enableButton(restartButton);
                enableButton(missileButton)
                attackButton.innerText = 'FIRE'
            }, 3000);
        }

        // Do this if the alien ship survived
        if (enemyShip.hull > 0) {
            setTimeout(() => {
                displayAlienShipData();
            }, time);
            //display a comment
            highlight('The aliens ship survived!', 'alien-ship comments', time += sleep);
            highlight('The aliens are attacking...', 'alien-ship comments', time += sleep);
            setTimeout(() => {
                alienShipAttackSound.play();
            }, time)


            // Have the alien attack you
            attackAccuracy = Math.random();
            if (attackAccuracy < enemyShip.accuracy) {
                // Have the enemy attack your ship
                enemyShip.attack(myShip);
                highlight('You have been hit!', 'alien-ship comments', time += sleep);
                myShip.firepower = 5;
                setTimeout(() => {
                    displayMyShipData()
                }, time);

            }
            else {
                highlight('The aliens have missed!', 'comments destroyed', time += sleep);
            }
        }
        //do this if the alien ship has been destroyed
        else if (enemyShip.hull == 0) {
            setTimeout(() => {
                displayAlienShipData()
                getElementById('alien-img').src = explosionImg;
                explosionSound.play()
            }, time);
            highlight(`The aliens ship ${currentAlienShip + 1} was destroyed.`, 'destroyed comments', time += sleep);
            // Do this when the alien ship has been destroyed
            let recentDefeatedShip = document.createElement('p');
            recentDefeatedShip.setAttribute('class', 'destroyed-alien-ships');
            recentDefeatedShip.textContent = `${enemyShip.name}`
            let destroyedShips = getElementById('destroyed-ships');
            setTimeout(() => {
                destroyedShips.appendChild(recentDefeatedShip);
                currentAlienShip++;
                // Do this if the last alien has not been defeated yet
                if (currentAlienShip < alienShipsArray.length) {
                    let aImg = getElementById('alien');
                    let pos = -100;
                    enemyShip = alienShipsArray[currentAlienShip];
                    setTimeout(() => {
                        displayAlienShipData()
                        setInterval(() => {
                            if (pos < 0) {
                                pos++;
                                aImg.style.top = pos + '%'
                            }
                        });
                    }, time += sleep);
                }

                // Do this if there is no more alien remaning
                else if (currentAlienShip >= alienShipsArray.length) {
                    checker = 0;
                    setTimeout(() => {
                        do {
                            prompt = window.prompt('Do you want to continue to next level? (y/n)');
                            if (prompt === null) {
                                checker = 0
                            }
                            else if (prompt.toLowerCase() == 'y' || prompt.toLowerCase() == 'yes') {
                                checker = 1;
                                level++;

                                restartOrContinueAction();
                                if (level > 5) {
                                    if (missileButton.classList.contains('hidden')) {
                                        missileButton.classList.toggle('hidden');
                                        missile = level - 5;
                                        getElementById('number-of-missile').textContent = `+${missile}`
                                    }
                                }
                            }

                            else if (prompt.toLowerCase() == 'n' || prompt.toLowerCase() == 'no') {
                                checker = 1;
                                gameOver();
                                setTimeout(() => {
                                    alienDefeated()
                                }, 3000);
                            }
                        }
                        while (checker !== 1);

                    }, 3000);
                }
            }, time += sleep);
        }

        // Do this if your ship survived and the health is very low
        if (myShip.hull < 5 && myShip.hull > 0) {
            setTimeout(() => {
                displayMyShipData()
            }, time += sleep);
            highlight('YOU HAVE LESS THAN 5 HULL REMAINING', 'destroyed comments', time);
        }
        //stop the game when your ship is destroyed
        else if (myShip.hull <= 0) {
            myShip.hull = 0;
            setTimeout(() => {
                displayMyShipData()
                getElementById('my-img').src = explosionImg;
                myShip.hull = 0;
                explosionSound.play();
            }, time += sleep);
            setTimeout(() => {
                gameOver();
            }, time += sleep);
            setTimeout(() => {
                earthDefeated();
            }, time += sleep);

        }
    }
}

//set some events listener
startButton = getElementById('start-button');
startButton.addEventListener('click', startTheGame);
closeButton = getElementById('close-button');
closeButton.addEventListener('click', closeTheGame);
restartButton = getElementById('restart-button');
restartButton.addEventListener('click', restart);
attackButton = getElementById('attack-button');
attackButton.addEventListener('click', attackTheAlien);
missileButton = getElementById('missile');
setInterval(() => {
    //pause the game when the player click outside of the window
    if (!window.document.hasFocus() && !attackButton.hasAttribute('disabled') && resume.classList.contains('hidden') && !missileButton.hasAttribute('disabled')) {
        resume.classList.toggle('hidden');
        myMusic.pause();
        disableButton(attackButton);
        disableButton(missileButton)
    }
});

resume = getElementById('resume');
resume.addEventListener('click', resumeTheGame);
missileButton.addEventListener('click', addMissile)

