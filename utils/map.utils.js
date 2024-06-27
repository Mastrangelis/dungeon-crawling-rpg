/**
 * @name map.utils.js
 * @description Utility functions for the map
 */

/**
 * @function initializeMap
 * @description Initialize the map with walls and empty cells
 * @param {Object} constraints constraints for the map and rooms
 * @returns {Array[][]} the initialized map
 */
const initializeMap = (constraints) => {
  return Array.from({ length: constraints.map.height }, () =>
    Array.from({ length: constraints.map.width }, () => ({
      value: "#",
      occupied: false,
    }))
  );
};

/**
 * @function printMap
 * @description The function that prints the constructed map with the randomly generated rooms in the console.
 * @param {number} mapWidth the constraint that defines the width of our map
 * @param {Array[][]} map the actual 2D array that represents the map
 * @returns
 */
const printMap = (mapWidth, map) => {
  const content = "MAP";

  // Create the top and bottom border
  const border = "*".repeat(mapWidth);

  // Calculate padding
  const contentLength = content.length;
  const padding = (mapWidth - 2 - contentLength) / 2;

  // Ensure the content fits within the width
  if (contentLength + 2 > mapWidth) {
    console.error("Content is too wide to fit within the specified width.");
    return;
  }

  // Generate the middle row with content
  const middleRow =
    "*" +
    " ".repeat(Math.floor(padding)) +
    content +
    " ".repeat(Math.ceil(padding)) +
    "*";

  // Print the pattern
  console.log(border);
  console.log(middleRow);
  console.log(border);

  /**
   * The whole code above this line is just to render a header for the map something like.
   *
   * ******************
   * *     MAP        *
   * ******************
   *
   * The actual rendering of the map along with the rooms is happening in the for loop below.
   */

  // Distict rendering with an empty line between them
  console.log("");

  // Print the whole map with rooms to the console
  for (let row of map) {
    console.log(row.map((cell) => cell.value).join(""));
  }
};

export { printMap, initializeMap };
