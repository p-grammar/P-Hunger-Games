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

function main() {
    var world = worldGen(30, biomes, 9);
    printWorld(world);
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
    var container = document.createElement("div");
    container.className = "map";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "10px ".repeat(w.width);
    container.style.gridTemplateRows = "10px ".repeat(w.height);
    content.appendChild(container);
    for(var j = 0; j < w.width; ++j) {
        for(var i = 0; i < w.height; ++i) {
            var item = document.createElement("div");
            var color = w.chunks[i][j].biome.color;
            item.style.backgroundColor = color;
            item.style.width = "10px";
            item.style.height = "10px";
            container.appendChild(item);
        }
    }
}

main();