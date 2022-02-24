import axios from "axios";

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
