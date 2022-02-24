import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchStories } from "../../store/spaceReducer/actions";
import { selectSpaceDetails } from "../../store/spaceReducer/selectors";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const spaceDetails = useSelector(selectSpaceDetails);
  console.log("space details", spaceDetails);

  useEffect(() => {
    dispatch(fetchStories(id));
  }, [dispatch, id]);

  if (!spaceDetails) return <h1>Loading</h1>;
  return (
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
  );
};

export default DetailsPage;
