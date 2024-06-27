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

export const cmdQuestions = [
  {
    question: `Enter MAP_WIDTH (OR press enter for default value (${CONSTRAINTS.map.width.default})):`,
    defaultValue: CONSTRAINTS.map.width.default,
  },
  {
    question: `Enter MAP_HEIGHT (OR press enter for default value (${CONSTRAINTS.map.height.default})):`,
    defaultValue: CONSTRAINTS.map.height.default,
  },
  {
    question: `Enter MIN_ROOM_SIZE (OR press enter for default value (${CONSTRAINTS.rooms.minSize.default})):`,
    defaultValue: CONSTRAINTS.rooms.minSize.default,
  },
  {
    question: `Enter MAX_ROOM_SIZE (OR press enter for default value (${CONSTRAINTS.rooms.maxSize.default})):`,
    defaultValue: CONSTRAINTS.rooms.maxSize.default,
  },
  {
    question: `Enter MAX_ROOMS (OR press enter for default value (${CONSTRAINTS.rooms.maxRooms.default})):`,
    defaultValue: CONSTRAINTS.rooms.maxRooms.default,
  },
];
