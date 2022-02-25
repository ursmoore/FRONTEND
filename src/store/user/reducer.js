/* eslint-disable import/no-anonymous-default-export */
import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  STORY_DELETE_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case STORY_DELETE_SUCCESS:
      console.log("STORY_DELETE_SUCCESS reducer!!!!", action.payload);
      const newState = { ...state };
      console.log("what is new state", newState);

      return {
        ...state,
        space: {
          ...state.space,
          stories: state.space.stories.filter(
            (story) => action.payload !== story.id
          ),
        },
      };

    default:
      return state;
  }
};
