import { PIXI } from "pixi.js";

export module World {

    export class Biome {
        name: string;
        color: string;

        constructor(n, c) {
            this.name = n;
            this.color = c;
        }
    }

    export class Block {

        sprite: PIXI.Sprite;
        type: number;
        x: number;
        y: number;

        constructor(bx, by, x, y, type)
        {
            this.x = x;
            this.y = y;
            this.type = type;
            this.sprite = new PIXI.Sprite(blockTextures[type]);
            this.sprite.scale.x = 1;
            this.sprite.scale.y = 1;
            this.sprite.width = 10;
            this.sprite.height = 10;
            this.sprite.x = (bx + x) * 10;
            this.sprite.y = (by + y) * 10;
            blockContainer.addChild(this.sprite);
        }
    }

    class Chunk {
        constructor(b, v, x, y) {
            //this.biome = biomes[b];
            this.value = v;
            this.x = x;
            this.y = y;
            this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            this.sprite.tint = biomes[b].color;
            this.sprite.x = x * 10;
            this.sprite.y = y * 10;
            this.blocks = [
                [new Block(x, y, 0, 0, b), new Block(x, y, 0, 1, b)],
                [new Block(x, y, 1, 0, b), new Block(x, y, 1, 1, b)]
            ]
            mapContainer.addChild(this.sprite);
        }
    }

    export class World {

        width: number;
        height: number;
        chunks: Array<Array<Chunk>>;

        constructor(w: number, h: number, bl: Array<Biome>) {
            this.width = w;
            this.height = h;
            this.chunks = worldGen(bl);
        }

        function worldGen(bl: Array<Biome>): Array<Array<Chunk>> {
            return new Array();
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
    window.mapContainer = null;
    window.viewport = null;
    window.blockTextures = null;
    window.mapSprite = null;
    window.blockMapSprite = null;

    function pixiInit() {
        app = new PIXI.Application({
            width: 500, height: 500,
            antialias: false,
        });
        viewport = new PIXI.extras.Viewport({
            screenWidth: 500,
            screenHeight: 500,
            interaction: app.renderer.plugins.interaction,
            passiveWheel: false,
        });
        viewport.on('wheel', () => {
            if (viewport.getVisibleBounds().width < 300) {
                blockMapSprite.visible = true;
                mapSprite.visible = false;
            }
            else
            {
                blockMapSprite.visible = false;
                mapSprite.visible = true;
            }
            console.log(viewport.getVisibleBounds())
        });
        app.stage.addChild(viewport);

        mapContainer = new PIXI.Container();
        blockContainer = new PIXI.Container();
    }

    class MapGenerator {
        static generateMap(radius) {
            let mapSize = (radius * 2 + 1) * 10;
            viewport.worldWidth = mapSize;
            viewport.worldHeight = mapSize;
            viewport.drag().wheel().clamp({
                direction: 'all',
                underflow: 'center'
            }).clampZoom({
                minWidth: 1,
                minHeight: 1,
                maxWidth: mapSize,
                maxHeight: mapSize
            });
            viewport.fit();

            mapContainer.removeChildren();

            map = this.worldGen(radius, biomes, 9);
            map.grid = new PF.Grid(radius * 2 + 1, radius * 2 + 1);

            let mapTexture = PIXI.RenderTexture.create(mapSize, mapSize);
            mapTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            mapSprite = new PIXI.Sprite(mapTexture);
            let blockMapTexture = PIXI.RenderTexture.create(mapSize * 2, mapSize * 2);
            blockMapTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            blockMapSprite = new PIXI.Sprite(blockMapTexture);
            app.renderer.render(blockContainer, blockMapTexture);
            viewport.addChild(blockMapSprite);
            app.renderer.render(mapContainer, mapTexture);
            viewport.addChild(mapSprite);
        }
        
        static vToC(value) {
            let c = value * 255;
            if(c > 255) {
                c = 255;
            }
            return "rgb(" + c + "," + c + "," + c + ")"
        }

        static worldGen(radius, biomes, sharpness) {
            let size = radius * 2 + 1;
            let superSize = Math.ceil(size / sharpness) + 2;

            let chunks = [...Array(size)].map(() => Array(size));
            let superChunks = [...Array(superSize)].map(() => Array(superSize));

            function checkMiddle(i, j) {}

            if(superSize % 2 == 0) {
                checkMiddle = (i, j) => {
                    return (i == superSize / 2 || i == (superSize / 2) - 1)  && (j == superSize / 2 || j == (superSize / 2) - 1);
                }
            } else {
                checkMiddle = (i, j) => {
                    return (i == Math.floor(superSize / 2) && j == Math.floor(superSize / 2));
                }
            }

            for(let j = 0; j < superSize; ++j) {
                for(let i = 0; i < superSize; ++i) {
                    if (checkMiddle(i, j)) {
                        superChunks[i][j] = [0.5, 0.5, 0.5];
                    }
                    else { 
                        superChunks[i][j] = [Math.random(), Math.random(), Math.random()];
                    }
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

                    chunks[i][j] = new Chunk(sel, this.vToC(value), i, j);
                }
            }
            return new Map(size, size, chunks);
        }
    }

}
