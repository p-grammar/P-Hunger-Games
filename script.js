//var PF = require('pathfinding');

/* eslint-disable no-undef */
class Biome {
    constructor(n, c) {
        this.name = n;
        this.color = c;
    }
}

class Chunk {
    constructor(b, v) {
        this.biome = b;
        this.value = v;
    }
}

class World {
    constructor(w, h, ch) {
        this.width = w;
        this.height = h;
        this.chunks = ch;
    }
}

var biomes = [
    new Biome("lake", "#1560d8"),
    new Biome("beach", "#eddea6"),
    new Biome("plains", "#a1c64b"),
    new Biome("forest", "#4f8c0e"),
    new Biome("mountains", "#635e5c"),
    new Biome("desert", "#eaa983")
]

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

var world;
var minutes = 0;
var frameCounter = 0;

var eventQueue = [];

window.worldGrid;

function main() {
    beginGames();
}

function beginGames()
{
    world = worldGen(MAP_SIZE, biomes, 9);
    worldGrid = new PF.Grid(MAP_SIZE * 2 + 1, MAP_SIZE * 2 + 1);
    printWorld(world);

    setupPlayers();

    MainLoop.setUpdate(update).setDraw(draw).start();
}

function setupPlayers()
{
    let radius = players.length * .5;
    players.forEach(function(player, index)
    {
        // cornicopulate sans
        player.location = {
            x: Math.trunc((((MAP_SIZE * 2 + 1)) / 2) + radius * Math.cos(degToRad(index * 45))),
            y: Math.trunc((((MAP_SIZE * 2 + 1)) / 2) + radius * Math.sin(degToRad(index * 45)))
        };
        mapSuperContainer.appendChild(player.icon);
    });
}

function degToRad(degrees)
{
    return degrees * (Math.PI/180);
}

function update()
{
    // time
    frameCounter++;
    if (frameCounter >= 60)
    {
        frameCounter = 0;
        minutes++;
        if (minutes % 10 === 0)
        {
            if (content.style.backgroundColor === 'rgb(0, 0, 0)')
            content.style.backgroundColor = "#f4e2d7";
        else
            content.style.backgroundColor = "#000000";
        }
    }

    players.forEach(function(player) {
        // player events
        player.eventQueue.forEach(function(event) {
            if (event.canExecute())
            {
                event.execute();
                eventQueue = eventQueue.filter(e => e !== event);
            }
        })
        // ai
        player.step();
    });

    // global events
    eventQueue.forEach(function(event) {
        if (event.canExecute())
        {
            event.execute();
            eventQueue = eventQueue.filter(e => e !== event);
        }
    });
}

function draw()
{
    paintEntities();
}

function vToC(value) {
    let c = value * 255;
    if(c > 255) {
        c = 255;
    }
    return "rgb(" + c + "," + c + "," + c + ")"
}

function worldGen(radius, biomes, sharpness) {
    let size = radius * 2 + 1;
    let superSize = Math.ceil(size / sharpness) + 2;

    let chunks = [...Array(size)].map(() => Array(size));
    let superChunks = [...Array(superSize)].map(() => Array(superSize));

    for(let j = 0; j < superSize; ++j) {
        for(let i = 0; i < superSize; ++i) {
            if (j > superSize / 2 - 1 && j < superSize / 2 + 1 && i > superSize / 2 - 1 && i < superSize / 2 + 1)
                superChunks[i][j] = [0, 0, -22];
            else 
                superChunks[i][j] = [Math.random(), Math.random(), Math.random()];
        }
    }

    for(let j = 0; j < size; ++j) {
        let superY = Math.floor(j / sharpness) + 1;
        let subY = (j % sharpness) / sharpness;
        for(let i = 0; i < size; ++i) {
            let superX = Math.floor(i / sharpness) + 1;
            let subX = (i % sharpness) / sharpness;

            let value = 0;
            for(let k = -1; k < 2; ++k) {
                for(let r = -1; r < 2; ++r) {
                    let tempX = (subX - k) - (superChunks[superX + k][superY + r][0]);
                    let tempY = (subY - r) - (superChunks[superX + k][superY + r][1]);
                    let tempZ = (superChunks[superX + k][superY + r][2]);

                    let tot = (1 - ((tempX * tempX) + (tempY * tempY) + (tempZ * tempZ))) / 2;
                    if(tot < 0) {
                        tot = 0;
                    }
                    value += tot;
                }
            }

            if(value >= 1) {
                value = 0.999999
            }

            var sel = Math.floor(value * biomes.length);

            chunks[i][j] = new Chunk(biomes[sel], vToC(value));
        }
    }
    return new World(size, size, chunks);
}

function printWorld(w) {
    let mapContianer = document.createElement("div");
    mapContianer.className = "map";
    mapContianer.style.display = "grid";
    mapSuperContainer.appendChild(mapContianer);
    mapContianer.style.gridTemplateColumns = "10px ".repeat(w.width);
    mapContianer.style.gridTemplateRows = "10px ".repeat(w.height);
    for(let j = 0; j < w.width; ++j) {
        for(let i = 0; i < w.height; ++i) {
            let item = document.createElement("div");
            let color = w.chunks[i][j].biome.color;
            item.style.backgroundColor = color;
            item.style.width = "10px";
            item.style.height = "10px";
            mapContianer.appendChild(item);
        }
    }
}

function paintEntities()
{
    players.forEach(function(player) {
        player.icon.style.left = "" + player.location.x * 10 + "px";
        player.icon.style.top = "" + player.location.y * 10 + "px";
    });
}

main();

function divToImage() {
    
}