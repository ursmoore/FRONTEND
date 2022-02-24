import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import {
  selectSpaceDetails,
  selectUserSpace,
} from "../../store/spaceReducer/selectors";

const MySpace = () => {
  const spaceDetails = useSelector(selectUserSpace);
  console.log("space details", spaceDetails);

  const token = useSelector(selectToken);
  const navigate = useNavigate();
  console.log("what is token", token);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return spaceDetails ? (
    <div>
      <div>My spacey space</div>
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
                  <h2>{story.name}</h2>
                  <p>{story.content}</p>
                  <img src={story.imageUrl} alt={story.name} width="400" />
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
