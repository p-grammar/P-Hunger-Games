clabGamestart = false;
ebetGameDebug = true;

//var PF = require('pathfinding');

/* eslint-disable no-undef */

var players = [new Player(), new Player(), new Player(), new Player(), new Player(), new Player(), new Player(), new Player()];

var mapSuperSuper = document.createElement("div");
mapSuperSuper.className = "mapSuperSuper";
content.appendChild(mapSuperSuper);

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

function mapInit(callback) {
    blockTextures = PIXI.loader.add([
        "images/water.png",
        "images/beach.png",
        "images/grass.png",
        "images/tree.png",
        "images/rock.png",
        "images/sand.png"
    ]).load(function() {
        blockTextures = [
            PIXI.loader.resources["images/water.png"].texture,
            PIXI.loader.resources["images/beach.png"].texture,
            PIXI.loader.resources["images/grass.png"].texture,
            PIXI.loader.resources["images/tree.png"].texture,
            PIXI.loader.resources["images/rock.png"].texture,
            PIXI.loader.resources["images/sand.png"].texture
        ]
        blockTextures.forEach((texture, index) => {
            blockTextures[index].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        })
        callback();
    });
}

function main() {
    console.log(__charactersDatasheet);
    destroyAndSetup();
    beginGames();

    if(ebetGameDebug) {
        createGameMessage(["../images/plus.svg", "../images/sun.png"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
        createGameMessage(["../images/plus.svg", "../images/plus.svg"], "All thee who goes here be cursed. And when will clab wake up?");
    }
}

function beginGames()
{
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

/* this is where shit gets init */

pixiInit();
mapInit(() => {
    if(clabGamestart) {
        makeForm(true);
        MapGenerator.generateMap(__worldDatasheet.worldSize);
        main();
    }
});