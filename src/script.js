//var PF = require('pathfinding');

/* eslint-disable no-undef */



var players = [new Player(), new Player(), new Player(), new Player(), new Player(), new Player(), new Player(), new Player()];

var mapSuperSuper = document.createElement("div");
mapSuperSuper.className = "mapSuperSuper";
content.appendChild(mapSuperSuper);

/* hide button stuff VVVVVVVVVVVVV */

var mapHideButtonContainer = document.createElement("div");
mapHideButtonContainer.className = "mapHideButtonContainer";
    mapHideButtonContainer.onmouseenter = function() {
        animationEnable(
            mapHideButton,
            "mapComeup",
            "mapComedown"
        );
    };
    mapHideButtonContainer.onmouseleave = function() {
        animationEnable(
            mapHideButton,
            "mapComedown",
            "mapComeup"
        );
    }
mapSuperSuper.appendChild(mapHideButtonContainer);

var mapHideButton = document.createElement("div");
mapHideButton.textContent = "Hide"
mapHideButton.className = "mapHideButton";
    mapHideButton.onclick = function() {
        if(mapHidden) {
            mapHideButton.textContent = "Hide"
            mapSuperContainer.classList.remove("mapSuperHidden");
            mapHidden = false;
        } else {
            mapHideButton.textContent = "Show"
            mapSuperContainer.classList.add("mapSuperHidden");
            mapHidden = true;
        }
    }
mapHideButtonContainer.appendChild(mapHideButton);
/* hide button stuff ^^^^^^^^^^^^^^^^^^^ */
/* map auto switch VVVVVVVVVVVVVVVVVVVV */

var manual = true;

var mapSwitchContainer = document.createElement("div");
mapSwitchContainer.className = "mapSwitchContainer";
    mapSwitchContainer.onmouseenter = function() {
        animationEnable(
            mapSwitch,
            "mapComeup",
            "mapComedown"
        );
    }
    mapSwitchContainer.onmouseleave = function() {
        animationEnable(
            mapSwitch,
            "mapComedown",
            "mapComeup"
        );
    }
mapSuperSuper.appendChild(mapSwitchContainer);

var mapSwitch = document.createElement("div");
mapSwitch.classList = "mapSwitch mapComeDown";
mapSwitchContainer.appendChild(mapSwitch);

var mapSwitchAuto = document.createElement("p");
mapSwitchAuto.textContent = "Auto";

mapSwitch.appendChild(mapSwitchAuto);
var mapSwitchSlider = document.createElement("div");
    mapSwitchSlider.onclick = function() {
        if(manual) {
            animationEnable(mapSwitch, "mapSwitchRight", "mapSwitchLeft");
            animationEnable(this, "switchMoveRight", "switchMoveLeft");
            manual = false;
        } else {
            animationEnable(mapSwitch, "mapSwitchLeft", "mapSwitchRight");
            animationEnable(this, "switchMoveLeft", "switchMoveRight");
            manual = true;
        }
    }
mapSwitch.appendChild(mapSwitchSlider);

var mapSwitchManual = document.createElement("p");
mapSwitchManual.textContent = "Manual";
mapSwitch.appendChild(mapSwitchManual);
/* map auto switch ^^^^^^^^^^^^^^^^^^^^^^^ */

var mapHidden = false;

var mapSuperContainer = document.createElement("div");
mapSuperContainer.className = "mapSuper";
mapSuperSuper.appendChild(mapSuperContainer);

var MAP_SIZE = 30;

function animationEnable(node, enable, ...disables) {
    node.preventDefault;
    node.classList.remove(enable);
    disables.forEach(function(d) {
        node.classList.remove(d);
    });
    void node.offsetWidth;
    node.classList.add(enable);
}

var minutes = 0;
var frameCounter = 0;

var eventQueue = [];

function main() {
    beginGames();
}

function beginGames()
{
    let mapGen = new MapGenerator();
    mapGen.generateMap(MAP_SIZE);
    setupPlayers();

    MainLoop.setUpdate(update).setDraw(draw).start();
}

function setupPlayers() {
    let radius = players.length * .5;
    players.forEach(function(player, index) {
        // cornicopulate sans
        player.location = {
            x: Math.trunc((((MAP_SIZE * 2 + 1)) / 2) + radius * Math.cos(degToRad(index * 45))),
            y: Math.trunc((((MAP_SIZE * 2 + 1)) / 2) + radius * Math.sin(degToRad(index * 45)))
        };
        mapSuperContainer.appendChild(player.icon);
    });
}

function degToRad(degrees) {
    return degrees * (Math.PI/180);
}

function update() {
    // time
    frameCounter++;
    if (frameCounter >= 60) {
        frameCounter = 0;
        minutes++;
        if (minutes % 10 === 0) {
            if (content.style.backgroundColor === 'rgb(0, 0, 0)')
            content.style.backgroundColor = "#f4e2d7";
        else
            content.style.backgroundColor = "#000000";
        }
    }

    players.forEach(function(player) {
        // player events
        player.eventQueue.forEach(function(event) {
            if (event.canExecute()) {
                event.execute();
                eventQueue = eventQueue.filter(e => e !== event);
            }
        })
        // ai
        player.step();
    });

    // global events
    eventQueue.forEach(function(event) {
        if (event.canExecute()) {
            event.execute();
            eventQueue = eventQueue.filter(e => e !== event);
        }
    });
}

function draw() {
    paintEntities();
}

function paintEntities() {
    players.forEach(function(player) {
        player.icon.style.left = "" + player.location.x * 10 + "px";
        player.icon.style.top = "" + player.location.y * 10 + "px";
    });
}

main();

function divToImage() {
    
}