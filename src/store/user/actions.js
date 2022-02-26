import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const STORY_DELETE_SUCCESS = "STORY_DELETE_SUCCESS";
export const ADD_STORY = "ADD_STORY";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// STORY-DELETE ACTION CODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const storyDeleteSuccess = (storyId) => ({
  type: STORY_DELETE_SUCCESS,
  payload: storyId,
});

export const deleteStory = (id) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    console.log("token", token);
    //const spaceId = space.id;

    try {
      const response = await axios.delete(
        `${apiUrl}/spaces/delete/stories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Story deleted?", response.data);
      dispatch(storyDeleteSuccess(id));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
    }
  };
};

export const addStoryToStore = (data) => {
  return {
    type: "ADD_STORY",
    payload: data,
  };
};

export function addStorytoDatabase(name, content, image, id) {
  return async function thunk(dispatch, getState) {
    console.log("what are the parameters", name, content, image, id);
    // get token from the state
    const token = selectToken(getState());
    //if we have no token, stop
    if (token === null) return;
    try {
      console.log("Im here fetching token");
      const addedStory = await axios.post(
        `http://localhost:4000/spaces/create/story/${id}`,
        { name, content, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("now im here");
      console.log(addedStory);
      dispatch(addStoryToStore(addedStory.data));
    } catch (error) {
      console.log(error);
    }
  };
}
