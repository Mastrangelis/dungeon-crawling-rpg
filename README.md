<div align="center">

  <br />

  <div>
    <img src="https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen" alt="nodejs" />
    <img src="https://img.shields.io/badge/JavaScript-ES6-yellow" alt="javascript" />
  </div>

  <h3 align="center">Dungeon Crawling RPG (Technical Assignment) </h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ⚙️ [Tech Stack](#tech-stack)
2. 🖊️ [Design Choices](#design-choices)
3. 🤔 [What i'd have done given more time](#what-i-would-do-given-more-time)
4. 🤸 [Quick Start](#quick-start)

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Javascript

## <a name="design-choices"> 🖊️ Design choices</a>

During the development of this technical assignment the following design choices were taken

- Giving the ability for the user to interact with the program through the console

  - This means that once you run `node index.js` to run the program, you 'll be asked to define dynamically some constraints such as

    - MAP_WIDTH
    - MAP_HEIGHT
    - MIN_ROOM_SIZE
    - MAX_ROOM_SIZE
    - MAX_ROOMS

  You can either put your own values and run many iterations of the program with different constraints each time or you can leave the defaults by pressing just enter on each question during your interaction with the prompt.

- As described above, for safety they are some default values for the constraints as a fallback mechanism. The constraints are the following:

  ```js
  export const CONSTRAINTS = {
    map: {
      width: {
        min: 10,
        default: 40,
      },
      height: {
        min: 10,
        default: 40,
      },
    },
    rooms: {
      minSize: {
        min: 3,
        default: 4,
      },
      maxSize: {
        min: 3,
        default: 8,
      },
      maxRooms: {
        min: 1,
        default: 10,
      },
    },
  };
  ```

- Regarding the <u>min</u> values for the constraints

  - `MAP_WIDTH` was decided to have a minimum of 10.
  - `MAP_HEIGHT` was decided to have a minimun of 10.
  - `MIN_ROOM_SIZE` was decided to be of minimum 3.
    - This is due the walls (both top-bottom and left-right). Either on x or y axis every room will have by default size of 2 for the walls on the edges, so +1 minimum inside the room, that makes it 3 as minimum size in either axis.
  - `MAX_ROOM_SIZE` was decided to be greater or equal to the `MIN_ROOM_SIZE`
    - This means that the `MAX_ROOM_SIZE` can be of minimum size 3 which is also decided to be the minimum size for the MIN_ROOM_SIZE constraint.
  - `MAX_ROOMS` was decided to be at least 1 room in the map.

- The validations for the user input in the prompt for the constraints were designed to be alligned with the <u>min</u> values of each constraint plus two more validations:

  1. The `MIN_ROOM_SIZE` value must be greater or equal to the `MAX_ROOMS` index length + 2.

     ```js
     MIN_ROOM_SIZE + 2 >= MAX_ROOMS.toString().length;
     ```

     Reason for this is that if for example `MAX_ROOMS=10` we need at least two tiles inside the room in the first row in order to put that title in the relevant room, plus 2 tiles for the edges(walls)

     ```js
        ____
        |10|
        |..|
        |..|
        |..|
        ____
     ```

     Above you can see that for `MAX_ROOMS=10` we need at least `MIN_ROOM_SIZE=4`.

  2. The final validaton which is sort of arbitary calculation but it's the following

  ```js
  MAX_ROOMS * Math.pow(MAX_ROOM_SIZE, 2) >=
    Math.ceil((MAP_WIDTH * MAP_HEIGHT) / 2);
  ```

  This rule basically tries to ensure that there is enough space in the map at the worst case scenario based on the constraints given for all the rooms to fit comfortably.

## <a name="what-i-would-do-given-more-time"> 🤔 What i'd have done given more time </a>

If i'd have more time i would do the following things:

- I would add `Typescript` in order to make the program type-safe and robust
- Maybe i would refactor the code and potentialy would do follow a more object-oriented approach like creating two different classes

  - Class Map
  - Class Room

  like that all the methods and properties related to each class would bein the same place

- Definetely i would add unit tests to test all the functions that are used
- I would change the logic of a single point in the program.

  - During the rooms generation if the the result of the function

  ```js
    function canPlaceRoom(room) {
        ...
    }
  ```

  was false, meaning that a room with those coordinates cannot be placed in the map, i would change that logic to shuffle the existing rooms in different coordinates or regenarate new coordinates for that room until it fits in the map.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Mastrangelis/dungeon-crawling-rpg.git
cd dungeon-crawling-rpg
```

**Running the Project**

```bash
node index.js
```

Interact with the console to give your constraints for the map and the rooms (or keep the defaults) and check the map getting printed at the end in the console.
