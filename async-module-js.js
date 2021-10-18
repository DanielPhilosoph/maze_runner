const fs = require("fs");
const path = require("path");
function findTreasureSync(roomPath) {
  drawMapSync(roomPath.toString());
  let mazeArray = fs.readdirSync(roomPath);
  for (let elem of mazeArray) {
    if (elem.split("-")[0] === "chest") {
      let nextRoom = openChestSync(roomPath + "/" + elem);
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

  let chestContent = fs.readFile(chestPath, (err, data) => {
    if (err) {
      return false;
    }
    chestContentJSON = data.toString();
    if (chestContentJSON.hasOwnProperty("treasure")) {
      return "treasure";
    }
    if (validateChestContent(chestContentJSON)) {
      return chestContentJSON.clue;
    } else {
      return false;
    }
  });
}

function validateChestContent(chestText) {
  console.log(JSON.parse(chestText));
  if (typeof chestText.clue !== "string") {
    return false;
  }
  fs.readdir(chestText.clue, (err, data) => {
    if (err) {
      return false;
    }
    return true;
  });
}

console.log(findTreasureSync("./maze"));
