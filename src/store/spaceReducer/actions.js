import axios from "axios";
import { selectUser } from "../user/selectors"; //????????????

const API_URL = "http://localhost:4000";

export function spacesFetched(data) {
  return {
    type: "spaces/getAllSpaces",
    payload: data,
  };
}

export async function fetchSpaces(dispatch, getState) {
  const response = await axios.get(`${API_URL}/spaces`);
  // console.log("fetchSpaces response", response);

  dispatch(spacesFetched(response.data.getAllSpaces));
}

export function storyFetched(data) {
  return {
    type: "spaces/getStoryBySpaceId",
    payload: data,
  };
}

export function fetchStories(id) {
  return async (dispatch, getState) => {
    // console.log("got here");
    try {
      const response = await axios.get(`${API_URL}/spaces/${id}`);
      // console.log("fetchStories response", response.data.findSpaceById);

      dispatch(storyFetched(response.data.findSpaceById));
    } catch (error) {
      console.log(error);
    }
  };
}

// HERE I MAKE THE ACTION FOR THE SPACE FORM!!!!!!!!!!!!!!!!!!
export const editSpaceUser = (data) => ({
  type: "spaces/edit",
  payload: data,
});

export const editSpace = (title, description, backgroundColor, color) => {
  return async (dispatch, getState) => {
    try {
      const user = selectUser(getState());
      const token = localStorage.getItem("token");
      const spaceId = user.space.id;
      const response = await axios.patch(
        `http://localhost:4000/spaces/edit/${spaceId}`,
        { title, description, backgroundColor, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response create story", response.data);

      dispatch(editSpaceUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
