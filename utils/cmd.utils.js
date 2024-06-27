/**
 * @name cmd.utils.js
 * @description Utility functions for the command line interaction
 */

import readline from "readline";
import { cmdQuestions } from "../consts/index.js";
import { validateInputs } from "./validations.utils.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * @function askQuestion
 * @description Ask a question to the user in the command line and get the answer.
 * @param {Object} q defines each question asked to the user in a form of a loop of promises.
 *
 * The schema of the q variable can be found in the /consts/inded.js file under the "cmdQuestions" array
 * in general a "q" variable is an object that looks like this
 *
 * {
 *   "question": "The question to the user",
 *   "defaultValue": 10 -> the default value for each question in case user just presses enter to keep the default.
 * }
 * @returns {Promise} resolves/rejects the promise back with the user's answer (it can be either the default or a new one.)
 */
const askQuestion = (q) => {
  return new Promise((resolve, reject) => {
    try {
      rl.question(q.question + " ", (answer) => {
        if (!answer) {
          resolve(q.defaultValue);
        } else {
          resolve(answer.trim());
        }
      });
    } catch {
      reject("No anwser provided. Setting default value.");
    }
  });
};

/**
 * @function gatherConstraintsFromUser
 * @description Start an interaction with the user in the command line
 * in order to let him/her choose the desired constraints for the map and the rooms.
 * @returns {Array} an array with the answers/inputs the user gave to the program on the command line.
 */
const gatherConstraintsFromUser = async () => {
  const answers = [];

  for (let question of cmdQuestions) {
    answers.push(await askQuestion(question));
  }

  // Print empty line in the console.
  console.log("");

  // Check for user inputs validity
  // Meaning check for each dimension if it's number and if it's valid based on the validation rules set.
  const potentialErrors = validateInputs(answers.map(Number));

  // Close readline interface interaction with the user
  rl.close();

  // If user inputs are not valid and map cannot be drawn
  // Terminate the process and the program.
  if (Array.isArray(potentialErrors) && potentialErrors.length > 0) {
    // Show errors to the console
    for (let error of potentialErrors) {
      console.error(error);
    }

    // And terminate.
    process.exit(-1);
  }

  // Else return back with the user input to define the constraints
  return answers;
};

export { gatherConstraintsFromUser };
