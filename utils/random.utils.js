/**
 * @module utils/random.utils
 * @description This file contains the random utility functions.
 */

import { isValidNumber } from "./validations.utils.js";

/**
 * @function randomIntegerRange
 * @description A simple function for custom random integer between an given range (min, max)
 * @param {*} min the lower bound of the range
 * @param {*} max the upper bound of the range
 * @returns {number} the random integer
 */
const randomIntegerRange = (min, max) => {
  if (!isValidNumber(min) || !isValidNumber(max)) {
    console.error("Error: Min or max are not integers.");
    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { randomIntegerRange };
