const map = document.getElementById("map");
const MapSizeX = 7;
const MapSizeY = 7;
//
const player = {
  posX: 4,
  posY: 4,
};

function drawMap() {
  for (let CellY = 1; CellY <= MapSizeY; CellY++) {
    for (let CellX = 1; CellX <= MapSizeX; CellX++) {
      let output = `<figure class="cell floor_stone" title="x:${CellX},y:${CellY}">`;
      // If the map cell has the player in it,
      if (player.posX == CellX && player.posY == CellY) {
        // draw a player symbol
        output += "P";
      }
      //    else if (
      //     // Surrounding the player, with the distance of 1
      //     Math.abs(CellX - player.posX) <= 1 &&
      //     Math.abs(CellY - player.posY) <= 1
      //   ) {
      //     // draw "go" buttons
      //     output += `<button onClick="go(${CellX},${CellY})">GO</button>`;
      //   }
      output += `</figure>\n`;
      map.innerHTML += output;
    }
  }
}

// Moves the player to a new position, specified by (x,y)
function go(NewX, NewY) {
  player.posX = NewX;
  player.posY = NewY;
  // Emptying the Map before redrawing
  map.innerHTML = "";
  // Redrawing the Map with the new player position
  drawMap();
}

// Initialization
drawMap();

document.onkeyup = function (e) {
  if (e.which == 37) {
    go(player.posX - 1, player.posY);
  } else if (e.which == 38) {
    go(player.posX, player.posY - 1);
  } else if (e.which == 39) {
    go(player.posX + 1, player.posY);
  } else if (e.which == 40) {
    go(player.posX, player.posY + 1);
  }
};
