/**
 * @name validations.utils.js
 * @description This file contains the validation functions for the user inputs.
 */

import { CONSTRAINTS } from "../consts/index.js";

/**
 * @function isValidNumber
 * @description Check if a value is a valid number
 * @param {any} value the value to be checked
 * @returns {boolean} true if the value is a valid number, false otherwise
 */
const isValidNumber = (value) => {
  return !isNaN(value) && Number.isInteger(parseFloat(value));
};

/**
 * @function validateInputs
 * @description Validate the inputs provided by the user
 * @param {any} width the width of the map
 * @param {any} height the height of the map
 * @param {any} minRoomSize the minimum size of a room
 * @param {any} maxRoomSize the maximum size of a room
 * @param {any} maxRooms the maximum number of rooms
 * @returns {Array} an array of errors
 */
const validateInputs = ([
  width,
  height,
  minRoomSize,
  maxRoomSize,
  maxRooms,
]) => {
  const errors = [];

  if (!isValidNumber(width) || width < CONSTRAINTS.map.width.min) {
    errors.push(
      `Error: MAP_WIDTH must be an integer greater than or equal to ${CONSTRAINTS.map.width.min}.`
    );
  }

  if (!isValidNumber(height) || height < CONSTRAINTS.map.height.min) {
    errors.push(
      `Error: MAP_HEIGHT must be an integer greater than or equal to ${CONSTRAINTS.map.height.min}.`
    );
  }

  if (
    minRoomSize < CONSTRAINTS.rooms.minSize.min ||
    minRoomSize > maxRoomSize ||
    minRoomSize + 2 > width || // 2 is for the walls
    minRoomSize + 2 > height // 2 is for the walls
  ) {
    errors.push(
      `Error: MIN_ROOM_SIZE must be an integer greater than or equal to ${CONSTRAINTS.rooms.minSize.min}, smaller or equal to MAX_ROOM_SIZE and lower than (MAP_WIDTH or MAP_HEIGHT) - 2 for having enough room on the edges. `
    );
  }

  if (
    maxRoomSize < CONSTRAINTS.rooms.maxSize.min ||
    maxRoomSize < minRoomSize ||
    maxRoomSize + 2 > width || // 2 is for the walls
    maxRoomSize + 2 > height // 2 is for the walls
  ) {
    errors.push(
      "Error: MAX_ROOM_SIZE must be an integer greater than or equal to MIN_ROOM_SIZE and lower than (MAP_WIDTH or MAP_HEIGHT) - 2 for having enough room on the edges."
    );
  }

  if (!isValidNumber(maxRooms) || maxRooms < CONSTRAINTS.rooms.maxRooms.min) {
    errors.push(
      `Error: MAX_ROOMS must be an integer greater than or equal to ${CONSTRAINTS.rooms.maxRooms.min}.`
    );
  }

  if (maxRooms.toString().length + 2 > minRoomSize) {
    errors.push(
      "Error: Not enough space to render properly room number. MIN_ROOM_SIZE must be greater than the length (of the string) of the MAX_ROOMS number"
    );
  }

  if (
    maxRooms > 1 &&
    maxRooms * Math.pow(maxRoomSize, 2) >= Math.ceil((width * height) / 2)
  ) {
    errors.push(
      "Error: MAX_ROOMS * MAX_ROOM_SIZE must be lower than both MAP_WIDTH and MAP_HEIGHT for having enough space to render rooms in the map."
    );
  }

  return errors;
};

export { validateInputs, isValidNumber };
