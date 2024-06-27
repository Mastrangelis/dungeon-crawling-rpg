/**
 * @name rooms.utils.js
 * @description Utility functions for generating rooms
 */

import { randomIntegerRange } from "./random.utils.js";

/**
 * @function sortRooms
 * @description Sort rooms based on their y and x coordinates, top to bottom and left to right
 * @param {Object} roomA
 * @param {Object} roomB
 */
const sortRooms = (roomA, roomB) => {
  return roomA.y === roomB.y ? roomA.x - roomB.x : roomA.y - roomB.y;
};

/**
 * @function generateTitlePerRoom
 * @description Generate a title for each room
 * @param {*} rooms the rooms to be numbered
 * @param {*} map the state of the map
 */
const generateTitlePerRoom = (rooms, map) => {
  rooms.forEach((room, index) => {
    const roomNumberStr = (index + 1).toString();

    for (let i = 0; i < roomNumberStr.length; i++) {
      map[room.y + 1][room.x + 1 + i].value = roomNumberStr[i];
    }
  });
};

/**
 * @function canPlaceRoom
 * @description Check if a room can be placed in the map
 * @param {Object} room the room to be placed with its x, y, width, and height
 * @param {Array[][]} map state of the map
 * @returns {boolean} true if the room can be placed, false otherwise
 */
const canPlaceRoom = (room, map) => {
  const { x, y, width, height } = room;
  for (let i = y - 1; i <= y + height; i++) {
    for (let j = x - 1; j <= x + width; j++) {
      if (map[i][j].occupied) {
        return false;
      }
    }
  }

  return true;
};

/**
 * @function placeRoom
 * @description Place a room in the map
 * @param {Object} room the room to be placed with its x, y, width, and height
 * @param {Array[][]} map state of the map
 * @returns {void}
 */
const placeRoom = (room, map) => {
  const { x, y, width, height } = room;

  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      if (i === y || i === y + height - 1) {
        map[i][j].value = "_"; // Top or bottom wall
      } else if (j === x || j === x + width - 1) {
        map[i][j].value = "|"; // Left or right wall
      } else {
        map[i][j].value = "."; // Every other cell inside the room.
      }

      map[i][j].occupied = true; // Mark each cell of the room both inside cells and walls as occupied
    }
  }
};

/**
 * @function generateRooms
 * @description Generate rooms based on the constraints
 * @param {Array[][]} map state of the map
 * @param {Object} constraints constraints for the map and rooms
 * @returns {Array} array of rooms
 */
const generateRooms = (map, constraints) => {
  const rooms = [];

  // Random number of rooms to generate between
  // The number of rooms can be between 1 and the maximum number of rooms
  const roomsNumber = randomIntegerRange(1, constraints.rooms.maxRooms);

  while (rooms.length < roomsNumber) {
    // Room's width, height, x, and y coordinates
    const roomWidth = randomIntegerRange(
      constraints.rooms.minSize,
      constraints.rooms.maxSize
    );

    const roomHeight = randomIntegerRange(
      constraints.rooms.minSize,
      constraints.rooms.maxSize
    );

    const roomX = randomIntegerRange(1, constraints.map.width - roomWidth - 2);

    const roomY = randomIntegerRange(
      1,
      constraints.map.height - roomHeight - 2
    );

    const room = { x: roomX, y: roomY, width: roomWidth, height: roomHeight };

    // Check if the room can be placed in the map
    if (canPlaceRoom(room, map)) {
      // Place the room in the map
      rooms.push(room);
      placeRoom(room, map);
    }
  }

  return rooms;
};

export { generateRooms, sortRooms, generateTitlePerRoom };
