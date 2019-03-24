alert("it's ya boi");

class Biome {
    constructor(n) {
        this.name = name;
    }
}

class Chunk {
    constructor(b) {
        this.biome = b;
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
    new Biome("forest"),
    new Biome("mountains"),
    new Biome("river"),
    new Biome("plains")
]

function main() {
    worldGen();
}

function worldGen(radius, biomes) {
    var size = radius * 2 + 1;
    var chunks = new Array(size).fill(Array(size), 0, size);
    for(var i = 0; i < size; ++i) {
        for(var j = 0; j < size; ++j) {
            chunks[i][j] = new Chunk(biomes[Math.random() * biomes.length]);
        }
    }
    return new World(size, size, chunks);
}

main();