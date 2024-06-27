import { printMap, initializeMap } from "./utils/map.utils.js";
import {
  sortRooms,
  generateRooms,
  generateTitlePerRoom,
} from "./utils/rooms.utils.js";
import { gatherConstraintsFromUser } from "./utils/cmd.utils.js";
import { CONSTRAINTS } from "./consts/index.js";

/**
 * Spread user input for the constraints
 */
const [
  USER_INPUT_MAP_WIDTH,
  USER_INPUT_MAP_HEIGHT,
  USER_INPUT_MIN_ROOM_SIZE,
  USER_INPUT_MAX_ROOM_SIZE,
  USER_INPUT_MAX_ROOMS,
] = await gatherConstraintsFromUser();

/**
 * Define the constraints which will be based on either user input (if changed the default values)
 * or the default values for whichever question user is pressing just enter to keep the default.
 */
const constraints = {
  map: {
    width: +(USER_INPUT_MAP_WIDTH || CONSTRAINTS.map.width.default),
    height: +(USER_INPUT_MAP_HEIGHT || CONSTRAINTS.map.height.default),
  },
  rooms: {
    minSize: +(USER_INPUT_MIN_ROOM_SIZE || CONSTRAINTS.rooms.minSize.default),
    maxSize: +(USER_INPUT_MAX_ROOM_SIZE || CONSTRAINTS.rooms.maxSize.default),
    maxRooms: +(USER_INPUT_MAX_ROOMS || CONSTRAINTS.rooms.maxRooms.default),
  },
};

/**
 * Step 1.
 * Initialize the 2D map with the specified width and height
 * and fill it with '#' characters.
 *
 * Each cell in the map is an object with the following properties:
 * - value: the character to display in that cell
 * - occupied: a boolean indicating whether the cell is occupied by a room
 */
const map = initializeMap(constraints);

/**
 * Step 2.
 *
 * Generate and sort rooms.
 * Sorting of rooms is happening top to bottom, left to right.
 */
const rooms = generateRooms(map, constraints).sort(sortRooms);

/**
 * Step 3.
 *
 * Generate a title for each room.
 */
generateTitlePerRoom(rooms, map);

/**
 * Step 4.
 *
 * Print the map to the console.
 */
printMap(constraints.map.width, map);
