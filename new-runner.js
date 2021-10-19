// =====================================
// ====== Sync functions WORKING =======
// =====================================

const fs = require("fs");
function findTreasureSync(roomPath) {
  let inRoom = fs.readdirSync(roomPath);
  drawMap(roomPath);
  for (let chest of inRoom) {
    let chestContent = openChestSync(roomPath + "/" + chest);
    if (chestContent.hasOwnProperty("treasure")) {
      drawMap(chestContent.treasure);
      return chestContent.treasure;
    }
    if (chest.split("-")[0] === "chest" && validDir(chestContent)) {
      return findTreasureSync(chestContent.clue);
    }
  }
}

function drawMap(currentRoomPath) {
  fs.appendFileSync("./map.txt", currentRoomPath + "\n");
}

// openChestSync      ==> chestPath = "./maze/room-1/room-0/chest-1.json" <===
// return "PATH_ROOM"    ==> "./maze/room-1.../room" <==
function openChestSync(chestPath) {
  try {
    return JSON.parse(fs.readFileSync(chestPath).toString());
  } catch (error) {
    return false;
  }
}

function validDir(chestText) {
  try {
    return fs.readdirSync(chestText.clue);
  } catch (error) {
    return false;
  }
}

console.log(findTreasureSync("./maze"));
