const fs = require("fs");
const path = require("path");
function findTreasureSync(roomPath) {
  drawMapSync(roomPath.toString());
  let mazeArray = fs.readdirSync(roomPath);
  for (let elem of mazeArray) {
    console.log(elem);

    if (elem.split("-")[0] === "chest") {
      let nextRoom = openChestSync(roomPath + "/" + elem);

      console.log(nextRoom);
      if (nextRoom === "treasure") {
        drawMapSync("🏆");
        return "YAY";
      }
      if (nextRoom) {
        return findTreasureSync(nextRoom);
      } else {
        continue;
      }
    }
  }
}

function drawMapSync(currentRoomPath) {
  fs.appendFileSync("./map.txt", currentRoomPath + "\n");
}

// openChestSync      ==> chestPath = "./maze/room-1/room-0/chest-1.json" <===
// return "PATH_ROOM"    ==> "./maze/room-1.../room" <==
function openChestSync(chestPath) {
  let chestContentJSON = "";
  try {
    let chestContent = fs.readFileSync(chestPath);
    chestContentJSON = JSON.parse(chestContent.toString());
    if (chestContentJSON.hasOwnProperty("treasure")) {
      return "treasure";
    }
    if (validateChestContent(chestContentJSON)) {
      return chestContentJSON.clue;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

function validateChestContent(chestText) {
  try {
    fs.readdirSync(chestText.clue);
    return true;
  } catch (error) {
    return false;
  }
}

console.log(findTreasureSync("./maze"));
