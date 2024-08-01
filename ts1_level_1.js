// Define variables required for level1
let mapData;
let tilesetImage;
let tileWidth = 16; // Width of each tile in pixels
let tileHeight = 16; // Height of each tile in pixels
let mapWidth, mapHeight; // Map dimensions in tiles
let tiles = []; // Stores information about each tile
let tilesetsInfo = []; // Stores information about tilesets
let wallChunks = [];

// Function to preload map data and tileset images
function preloadLevel1() {
    // Load JSON formatted map data
    mapData = loadJSON('assets/Maps/level_1.json');
    // Load tileset image and add its information to tilesetsInfo array
    tilesetsInfo.push(loadImage('assets/Maps/Dungeon tileset.png'));
}

// Function to initialize map data
function setupLevel1() {
    // Set canvas size
    createCanvas(windowWidth, windowHeight);

    // Calculate map pixel dimensions
    mapPixelWidth = mapWidth * tileWidth;
    mapPixelHeight = mapHeight * tileHeight;

    // Get map width and height
    mapWidth = mapData.width;
    mapHeight = mapData.height;

    // Parse layers before rendering
    parseLayers();
}

// Function to parse map layers and extract tile data for rendering
function parseLayers() {
    // Iterate over all layers in the map data
    mapData.layers.forEach(layer => {
        // Check if this is the wall layer by its name
        let isWallLayer = layer.name === "wall";

        // Process layers of type 'tilelayer'
        if (layer.type === 'tilelayer') {
            // Iterate over chunks within the layer
            layer.chunks.forEach(chunk => {
                // If this is a wall layer, store the chunk info
                if (isWallLayer) {
                    wallChunks.push({
                        x: chunk.x, // Chunk's x position in tiles
                        y: chunk.y, // Chunk's y position in tiles
                        width: chunk.width, // Chunk width in tiles
                        height: chunk.height, // Chunk height in tiles
                        data: chunk.data // Tile IDs within this chunk
                    });
                }

                // Iterate over each tile within the chunk (existing logic)
                for (let y = 0; y < chunk.height; y++) {
                    for (let x = 0; x < chunk.width; x++) {
                        let tile = chunk.data[y * chunk.width + x];
                        // Existing logic to handle tile rendering...
                        if (tile !== 0) {
                            tiles.push({
                                img: tilesetsInfo[0],
                                sx: ((tile - 1) % 24) * tileWidth,
                                sy: Math.floor((tile - 1) / 24) * tileHeight,
                                dx: (chunk.x + x) * tileWidth,
                                dy: (chunk.y + y) * tileHeight
                            });
                        }
                    }
                }
            });
        }
    });
}


// Function to render the map on the canvas
function drawLevel1() {
    background("#666666"); // Set background color

    
    let screenCenterX = width / 2;
    let screenCenterY = height / 2;

    
    let wizardPosX = wizard.posx * scaleAmount;
    let wizardPosY = wizard.posy * scaleAmount;

    
    let offsetX = screenCenterX - wizardPosX;
    let offsetY = screenCenterY - wizardPosY;

    
    tiles.forEach(tile => {
        image(tile.img,
              tile.dx * scaleAmount + offsetX, 
              tile.dy * scaleAmount + offsetY, 
              tileWidth * scaleAmount,
              tileHeight * scaleAmount,
              tile.sx,
              tile.sy,
              tileWidth,
              tileHeight);
    });
}