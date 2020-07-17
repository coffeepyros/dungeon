// Initial Variables and Default Values
const map = document.getElementById("map");
const playerDisplay = document.getElementById("player");
const monsterDisplay = document.getElementById("monster");
const status = document.getElementById("status");
const MapSizeX = 7;
const MapSizeY = 7;
var teleport = false;

const player = {
  posX: 4,
  posY: 4,
  symbol: "P",
};

// Monster (single for now) starting position
const monster = {
  // Randomly placing monster
  posX: Math.floor(Math.random() * MapSizeX) + 1,
  posY: Math.floor(Math.random() * MapSizeY) + 1,
  symbol: "M",
  hp: 10,
};

// Monster (single for now) starting position
const stairs = {
  // Randomly placing monster
  posX: Math.floor(Math.random() * MapSizeX) + 1,
  posY: Math.floor(Math.random() * MapSizeY) + 1,
  symbol: "░",
};

function drawMap() {
  for (let CellY = 1; CellY <= MapSizeY; CellY++) {
    for (let CellX = 1; CellX <= MapSizeX; CellX++) {
      let output = `<figure class="cell floor_stone" title="x:${CellX},y:${CellY}">`;
      // If the map cell has the monster in it,
      if (stairs.posX == CellX && stairs.posY == CellY) {
        // draw a monster symbol
        output += `<span id="stairs">${stairs.symbol}</span>`;
      } else if (
        monster.posX == CellX &&
        monster.posY == CellY &&
        monster.hp > 0
      ) {
        // draw a monster symbol
        output += `<span id="monster">${monster.symbol}</span>`;
      } else if (player.posX == CellX && player.posY == CellY) {
        // draw a player symbol
        output += `<span id="player">${player.symbol}</span>`;
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

function reDrawMap() {
  // Emptying the Map before redrawing
  map.innerHTML = "";
  // Redrawing the Map with the new player position
  drawMap();
}

// Moves the player to a new position, specified by (x,y)
function go(NewX, NewY) {
  if (teleport == true) {
    location.reload();
  }
  if (NewX == stairs.posX && NewY == stairs.posY) {
    player.posX = NewX;
    player.posY = NewY;
    status.innerHTML =
      "Suddenly your head hurts, the world spins and you are somewhere else.";
    teleport = true;
  }
  // If you want to move onto a cell with a monster in it,
  // you fight it instead of moving onto the cell.
  else if (NewX == monster.posX && NewY == monster.posY) {
    fight();
  } // Checking if new position is inside the map grid
  else if (NewX > 0 && NewY > 0 && NewX <= MapSizeX && NewY <= MapSizeY) {
    player.posX = NewX;
    player.posY = NewY;
  }
  if (teleport == false) {
    reDrawMap();
  }
}

function fight() {
  let roll = Math.floor(Math.random() * 6) + 1;
  status.innerHTML = `Bonk! You inflicted <span class="color_damage">${roll}</span> Damage.`;
  monster.hp -= roll;
  if (monster.hp <= 0) {
    status.innerHTML += " You killed the monster!";
    // Removing the monster by moving it "outside" the map
    monster.posX = -1;
    monster.posY = -1;
  }
}

document.onkeyup = function (e) {
  status.innerHTML = "";
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

// Initialization
drawMap();
