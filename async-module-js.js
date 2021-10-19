const fs = require("fs");
const path = require("path");
function findTreasure(roomPath) {
  drawMap(roomPath.toString());
  fs.readdir(roomPath, (err, mazeArray) => {
    if (err) {
      return;
    }
    for (let elem of mazeArray) {
      if (elem.split("-")[0] === "chest") {
        openChest(roomPath + "/" + elem).then((nextRoom) => {
          if (nextRoom) {
            if (nextRoom === "treasure") {
              drawMap("🏆");
              return;
            } else {
              return findTreasure(nextRoom);
            }
          }
        });
      }
    }
  });
}

function drawMap(currentRoomPath) {
  fs.appendFile("./map.txt", currentRoomPath + "\n", (err) => {
    if (err) {
      return;
    }
  });
}

// openChestSync      ==> chestPath = "./maze/room-1/room-0/chest-1.json" <===
// return "PATH_ROOM"    ==> "./maze/room-1.../room" <==
function openChest(chestPath) {
  let chestContentJSON = "";
  let y = "";
  return new Promise((resolve, reject) => {
    fs.readFile(chestPath, (err, data) => {
      if (err) {
        reject();
      }
      try {
        chestContentJSON = JSON.parse(data.toString());
      } catch (error) {
        reject();
      }
      if (chestContentJSON.hasOwnProperty("treasure")) {
        resolve("treasure");
      }
      validateChestContent(chestContentJSON)
        .then(() => {
          resolve(chestContentJSON.clue);
        })
        .catch(() => {
          reject();
        });
    });
  })
    .then((value) => {
      return value;
    })
    .catch(() => {
      return false;
    });
}

function validateChestContent(chestText) {
  return new Promise((resolve, reject) => {
    fs.access(chestText.clue, (err) => {
      err ? reject() : resolve();
    });
  });
}

console.log(findTreasure("./maze"));
