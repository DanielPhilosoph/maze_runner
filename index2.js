const fs = require("fs");
const path = require("path");
function findTreasureSync(roomPath) {
  let mazeArray = fs.readdirSync(roomPath);
  console.log(mazeArray);
  for (let elem of mazeArray) {
    if (elem.split("-")[0] === "chest") {
      let nextRoom = openChestSync({ clue: roomPath + "/" + elem });
      if (nextRoom) {
        console.log(nextRoom);
      } else {
        // if false...
        break;
      }
    }
  }
}

// openChestSync      ==> chestPath = "./maze/room-1/room-0/chest-1.json" <===
// return "PATH_ROOM"    ==> "./maze/room-1.../room" <==
function openChestSync(chestPath) {
  let chestContentJSON = "";
  try {
    let chestContent = fs.readFileSync(chestPath);
    chestContentJSON = JSON.stringify(chestContent.toString());
    console.log(chestContentJSON);
    if (validateChestContent(JSON.parse(JSON.parse(chestContentJSON)))) {
      return JSON.parse(JSON.parse(chestContentJSON)).clue;
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
