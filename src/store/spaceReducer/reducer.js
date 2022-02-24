const initialState = {
  spaces: [],
  spaceDetails: null,
};

export default function reducer(state = initialState, action) {
  // console.log("action", action);
  switch (action.type) {
    case "spaces/getAllSpaces": {
      // console.log("spaces/getAllSpaces action", action);
      return {
        ...state,
        spaces: [...action.payload],
      };
    }
    // case "story/getStoryBySpaceId": {
    //   // console.log("story/getStoryBySpaceId response", action);
    //   return {
    //     ...state,
    //     stories: [...action.payload],
    //   };
    // }
    case "spaces/getStoryBySpaceId": {
      // console.log("action.payload", action.payload);
      return {
        ...state,
        spaceDetails: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
