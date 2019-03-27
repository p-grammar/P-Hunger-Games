
class Biome {
    constructor(n, c) {
        this.name = n;
        this.color = c;
    }
}

class Chunk {
    constructor(b, v, x, y) {
        this.biome = b;
        this.value = v;
        this.x = x;
        this.y = y;
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.tint = this.biome.color;
        this.sprite.x = x * 10;
        this.sprite.y = y * 10;
        app.stage.addChild(this.sprite);
    }
}

class Map {
    constructor(w, h, ch) {
        this.width = w;
        this.height = h;
        this.chunks = ch;
    }
}

var biomes = [
    new Biome("lake", "0x1560d8"),
    new Biome("beach", "0xeddea6"),
    new Biome("plains", "0xa1c64b"),
    new Biome("forest", "0x4f8c0e"),
    new Biome("mountains", "0x635e5c"),
    new Biome("desert", "0xeaa983")
]

window.map = null;
window.app = null;

class MapGenerator {
    constructor() {
        app = new PIXI.Application({width: 500, height: 500});
        
        content.appendChild(app.view);
    }

    generateMap(radius) {
        map = this.worldGen(radius, biomes, 9);
        map.grid = new PF.Grid(radius * 2 + 1, radius * 2 + 1);
    }
    
    vToC(value) {
        let c = value * 255;
        if(c > 255) {
            c = 255;
        }
        return "rgb(" + c + "," + c + "," + c + ")"
    }

    worldGen(radius, biomes, sharpness) {
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

                chunks[i][j] = new Chunk(biomes[sel], this.vToC(value), i, j);
            }
        }
        return new Map(size, size, chunks);
    }
}
