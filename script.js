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
    new Biome("forest", "#13af44"),
    new Biome("mountains", "#878481"),
    new Biome("river", "#1accef"),
    new Biome("plains", "#dcea60")
]

function main() {
    var world = worldGen(15, biomes, 10);
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

    var superChunks = [];
    var chunks = [];

    for(var i = 0; i < superSize; ++i) {
        superChunks.push([]);
        for(var j = 0; j < superSize; ++j) {
            superChunks[i][j] = [Math.random(), Math.random()];
        }
    }

    for(var i = 0; i < size; ++i) {
        chunks.push([]);
        var superX = Math.floor(i / sharpness) + 1;
        var subX = (i % sharpness) / sharpness;
        for(var j = 0; j < size; ++j) {
            var superY = Math.floor(j / sharpness) + 1;
            var subY = (j % sharpness) / sharpness;

            console.log(superChunks[superX - 1][superY] + " " + superChunks[superX][superY] + " " + superChunks[superX + 1][superY]);
            var value = 0;
            value += Math.abs((subX - 1) - superChunks[superX + 1][superY    ][0]);
            //value += Math.abs((subX + 1) - superChunks[superX - 1][superY][0]);
            //value += Math.abs((subX - 1) - superChunks[superX + 1][superY][0]);

            value += Math.abs((subY - 1) - superChunks[superX    ][superY + 1][1]);
            //value += Math.abs((subY - 1) - superChunks[superX][superY - 1][1]);
            value += Math.abs((subY + 1) - superChunks[superX][superY - 1][1]);

            value /= 8;

            var sel = Math.floor(value * biomes.length);

            chunks[i][j] = new Chunk(biomes[sel], vToC((i * size + j)/ (size* size)));
        }
    }
    return new World(size, size, chunks);
}

function printWorld(w) {
    var container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "10px ".repeat(w.width);
    container.style.gridTemplateRows = "10px ".repeat(w.height);
    document.body.appendChild(container);
    for(var i = 0; i < w.width; ++i) {
        for(var j = 0; j < w.height; ++j) {
            var item = document.createElement("div");
            var color = w.chunks[i][j].value;
            item.style.backgroundColor = color;
            item.style.width = "10px";
            item.style.height = "10px";
            container.appendChild(item);
        }
    }
}

main();