import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { deleteStory } from "../../store/user/actions";
import { selectUserSpace } from "../../store/spaceReducer/selectors";
import { selectUser } from "../../store/user/selectors";

const MySpace = () => {
  const dispatch = useDispatch();
  const spaceDetails = useSelector(selectUserSpace);
  // console.log("space details", spaceDetails);

  // const userIdToDelete = useSelector(selectUser);
  //console.log("user id to delete", userIdToDelete.id);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  // console.log("what is token", token);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return spaceDetails ? (
    <div>
      <h1>My spacey space</h1>
      <div>
        <div
          key={spaceDetails.id}
          style={{
            backgroundColor: spaceDetails.backgroundColor,
            color: spaceDetails.color,
          }}
        >
          <div>Hello! Here you have your DetailsPage</div>
          {spaceDetails.stories
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((story) => {
              return (
                <div key={story.id}>
                  <h1>{story.name}</h1>
                  <img src={story.imageUrl} alt={story.name} width="400" />
                  <p>{story.content}</p>
                  <button onClick={() => dispatch(deleteStory(story.id))}>
                    DELETE STORY
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <p>Loading ...</p>
  );
};

export default MySpace;
