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

var players = [new Player(), new Player()];

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

function main() {
    beginGames();
}

function beginGames()
{
    world = worldGen(30, biomes, 9);
    printWorld(world);

    setupPlayers();

    MainLoop.setUpdate(update).setDraw(draw).start();
}

function setupPlayers()
{
    players.forEach(function(player)
    {
        mapSuperContainer.appendChild(player.icon);
    });
}

function update()
{
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
        player.location.x++;
        if (player.location.x > 500)
            player.location.x = 0;
    });

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
    var c = value * 255;
    if(c > 255) {
        c = 255;
    }
    return "rgb(" + c + "," + c + "," + c + ")"
}

function worldGen(radius, biomes, sharpness) {
    var size = radius * 2 + 1;
    var superSize = Math.ceil(size / sharpness) + 2;

    var chunks = [...Array(size)].map(e => Array(size));
    var superChunks = [...Array(superSize)].map(e => Array(superSize));

    for(var j = 0; j < superSize; ++j) {
        for(var i = 0; i < superSize; ++i) {
            if (j > superSize / 2 - 1 && j < superSize / 2 + 1 && i > superSize / 2 - 1 && i < superSize / 2 + 1)
                superChunks[i][j] = [0, 0, -22];
            else 
                superChunks[i][j] = [Math.random(), Math.random(), Math.random()];
        }
    }

    for(var j = 0; j < size; ++j) {
        var superY = Math.floor(j / sharpness) + 1;
        var subY = (j % sharpness) / sharpness;
        for(var i = 0; i < size; ++i) {
            var superX = Math.floor(i / sharpness) + 1;
            var subX = (i % sharpness) / sharpness;

            var value = 0;
            for(var k = -1; k < 2; ++k) {
                for(var r = -1; r < 2; ++r) {
                    var tempX = (subX - k) - (superChunks[superX + k][superY + r][0]);
                    var tempY = (subY - r) - (superChunks[superX + k][superY + r][1]);
                    var tempZ = (superChunks[superX + k][superY + r][2]);

                    var tot = (1 - ((tempX * tempX) + (tempY * tempY) + (tempZ * tempZ))) / 2;
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
    var mapContianer = document.createElement("div");
    mapContianer.className = "map";
    mapContianer.style.display = "grid";
    mapSuperContainer.appendChild(mapContianer);
    mapContianer.style.gridTemplateColumns = "10px ".repeat(w.width);
    mapContianer.style.gridTemplateRows = "10px ".repeat(w.height);
    for(var j = 0; j < w.width; ++j) {
        for(var i = 0; i < w.height; ++i) {
            var item = document.createElement("div");
            var color = w.chunks[i][j].biome.color;
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
        player.icon.style.left = player.location.x + "px";
        player.icon.style.top = player.location.y + "px";
    });
}

main();