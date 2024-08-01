
import { GameState } from "./gamestate.js";
import { enemy } from "./enemy.js";

export function map(p) {
    return {
        mapData: null,
        tilesetImage: null,
        tileWidth: 16,
        tileHeight: 16,
        mapWidth: null,
        mapHeight: null,
        mapPixelWidth: null,
        mapPixelHeight: null,
        tiles: [],
        tilesetsInfo: [],
        wallChunks: [],
        state: new GameState(p),
        btnref: p.createButton("Begin Quest"),
        GDLbtn: p.createButton("Greg DeLozier Mode"),
        levelLoaded: false,
        loadOnce: false,
        Enemy: new enemy(p),
        notMenu: false,

        preload() {
            this.Enemy.preload();

            this.tilesetsInfo.push(p.loadImage('assets/Maps/Dungeon tileset.png'));
            if (this.state.getState() == 'menu') {
                this.btnref.style("background-color", "#ff5959");
                this.GDLbtn.style("background-color", "#ff5959");
            }
        },

        setup() {
            this.Enemy.setup();

            this.mapWidth = this.mapData.width;
            this.mapHeight = this.mapData.height;
            this.mapPixelWidth = this.mapWidth * this.tileWidth;
            this.mapPixelHeight = this.mapHeight * this.tileHeight;

            if (this.state.getState() == 'level1') {
                this.parseLayers();
            }
        },

        isWallTile(tileX, tileY) {
            // Iterate through all wall chunks
            for (let chunk of this.wallChunks) {
                // Calculate the boundaries of this chunk
                const chunkStartX = chunk.x;
                const chunkEndX = chunk.x + chunk.width;
                const chunkStartY = chunk.y;
                const chunkEndY = chunk.y + chunk.height;

                // Check if the given tile coordinates are within the range of the current chunk
                if (tileX >= chunkStartX && tileX < chunkEndX && tileY >= chunkStartY && tileY < chunkEndY) {
                    // If so, calculate the index of the tile in the chunk data array
                    const index = (tileY - chunk.y) * chunk.width + (tileX - chunk.x);
                    // Check if the tile ID at this position is not 0 (assuming ID 0 represents no wall)
                    if (chunk.data[index] !== 0) {
                        return true; // It's a wall tile
                    }
                }
            }
            return false; // not a wall tile
        },


        preloadLevel1() {
            this.mapData = p.loadJSON('assets/Maps/level_1.json');
            this.tilesetsInfo.push(p.loadImage('assets/Maps/Dungeon tileset.png'));
        },






        async draw(w) {

            if (this.state.getState() == 'menu') {
                w.disable()
                p.background("#5cb8ff");
                p.textSize(30);
                p.textAlign(p.CENTER);
                var txtref = p.text("The Wizard's Quest", 50, -50);
                // change the size of the text for the text box
                p.textSize(10);
                // explanation of the game
                var txtref2 = p.text("Objective: Collect 50 coins before the enemies get you!", 50, -20);
                this.btnref.position(p.width / 2, p.height / 2);


                this.GDLbtn.position(p.width / 2 - 22, p.height / 2 + 50);
                this.GDLbtn.style("border-radius", "20%");
                this.GDLbtn.style("padding-top", "10px");
                this.GDLbtn.style("padding-bottom", "10px");

                this.btnref.style("border-radius", "20%");
                this.btnref.style("padding-top", "10px");
                this.btnref.style("padding-bottom", "10px");
                this.btnref.mouseOver(() => {
                    this.btnref.style("background-color", "white");
                });
                this.btnref.mouseOut(() => {
                    this.btnref.style("background-color", "#ff5959");
                });

                this.GDLbtn.mouseOver(() => {
                    this.GDLbtn.style("background-color", "white");
                });
                this.GDLbtn.mouseOut(() => {
                    this.GDLbtn.style("background-color", "#ff5959");
                });


                this.btnref.mouseClicked(() => {
                    this.btnref.remove();
                    this.GDLbtn.remove();
                    w.enable();
                    this.state.changeState(1);
                    this.notMenu = true;
                });
                this.GDLbtn.mouseClicked(() => {
                    this.GDLbtn.remove();
                    this.btnref.remove();
                    w.enable();
                    this.state.changeState(1);
                    w.GDLMode = true;
                    this.notMenu = true;
                });


            } else {
                if (!this.levelLoaded) {
                    this.mapData = await this.preloadLevel("assets/Maps/level_1.json");
                    this.setup();
                    this.levelLoaded = true;
                } else if (!this.loadOnce) {
                    this.parseLayers();
                    this.loadOnce = true;
                } else {

                    p.background("#666666");
                    let scaleAmount = 1;

                    this.tiles.forEach(tile => {
                        p.image(
                            tile.img,
                            tile.dx * scaleAmount,
                            tile.dy * scaleAmount,
                            this.tileWidth * scaleAmount,
                            this.tileHeight * scaleAmount,
                            tile.sx,
                            tile.sy,
                            this.tileWidth,
                            this.tileHeight
                        );
                    });
                }
            }

        },

        preloadLevel(fileRef) {
            // returns a 'promise' to resolve loadJSON.
            // Due to loadJSON having to parse a large file, it needs to be asynchronous,
            // and needs to return a promise to fulfill the variable, rather than just the variable.

            return new Promise((resolve) => {
                resolve(p.loadJSON(fileRef));
            });
        },

        parseLayers() {
            var tmpTileset = this.tilesetsInfo[0];
            this.mapData.layers.forEach(layer => {
                let isWallLayer = layer.name === 'wall';
                if (layer.type === 'tilelayer') {
                    layer.chunks.forEach(chunk => {
                        if (isWallLayer) {
                            this.wallChunks.push({
                                x: chunk.x,
                                y: chunk.y,
                                width: chunk.width,
                                height: chunk.height,
                                data: chunk.data,
                            });
                        }

                        for (let y = 0; y < chunk.height; ++y) {
                            for (let x = 0; x < chunk.width; ++x) {
                                let tile = chunk.data[y * chunk.width + x];
                                if (tile !== 0) {
                                    this.tiles.push({
                                        img: tmpTileset,
                                        sx: ((tile - 1) % 24) * this.tileHeight,
                                        sy: (Math.floor((tile - 1) / 24)) * this.tileHeight,
                                        dx: (chunk.x + x) * this.tileWidth,
                                        dy: (chunk.y + y) * this.tileHeight,
                                    });
                                }
                            }
                        }

                    });
                }
            }
            );
        },

    }


};
