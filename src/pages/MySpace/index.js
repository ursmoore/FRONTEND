import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { deleteStory, addStorytoDatabase } from "../../store/user/actions";
import { editSpace } from "../../store/spaceReducer/actions";
import { selectUserSpace } from "../../store/spaceReducer/selectors";
import { showMessageWithTimeout } from "../../store/appState/actions";

const MySpace = () => {
  const dispatch = useDispatch();
  const spaceDetails = useSelector(selectUserSpace);
  // console.log("space details", spaceDetails);

  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newBackgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("");

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  // HERE I MAKE A USE EFFECT FOR UPDATING COLOR AND BACKGROUND
  useEffect(() => {
    if (spaceDetails) {
      setBackgroundColor(spaceDetails.backgroundColor);
      setColor(spaceDetails.color);
    }
  }, [spaceDetails]);

  function handleSubmitEdit(event) {
    // console.log("input", name, content, imageUrl);
    event.preventDefault();
    dispatch(editSpace(title, description, newBackgroundColor, color));

    setTitle("");
    setDescription("");

    setBackgroundColor("");
    setColor("");
    setEditForm(false);
  }

  function handleSubmit(event) {
    // event.preventDefault();
    // console.log("name,content,image", name, content, image);
    dispatch(addStorytoDatabase(name, content, image, spaceDetails.id));
    // HERE I MAKE MESSAGE WHEN SUBMIT WAS SUCCESFULL
    dispatch(
      showMessageWithTimeout("success", false, "Super! You added a story!")
    );
  }

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
        <div>
          <button
            value={editForm}
            onClick={() => setEditForm(!editForm)}
            // style={{
            //   backgroundColor: "Green",
            //   color: "white",

            //   padding: "8px",
            //   textDecoration: "none",
            //   border: "none",
            //   borderRadius: "15px",
            // }}
          >
            Edit Space
          </button>
          {editForm ? (
            <form
              style={{
                display: "flex",
                margin: "20px",
                flexDirection: "column",
              }}
            >
              <label>Title </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="change your title!"
              ></input>
              <label>Description </label>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="new description!"
              ></input>
              <label>Background Color </label>
              <input
                value={newBackgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                type="color"
                placeholder="give me a background color!"
              ></input>
              <label>Color </label>
              <input
                value={color}
                onChange={(event) => setColor(event.target.value)}
                type="color"
                placeholder="give me a color!"
              ></input>
              <button
                // style={{
                //   backgroundColor: "Black",
                //   color: "white",
                //   padding: "8px",
                //   textDecoration: "none",
                //   border: "none",
                //   borderRadius: "15px",
                //   margin: "10px",
                // }}
                onClick={handleSubmitEdit}
              >
                Submit Edit
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <p>
              <label>
                Name:{""}
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
            </p>
            <p>
              <label>
                Content:{""}
                <input
                  type="text"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </label>
            </p>
            <p>
              <label>
                Image:{""}
                <input
                  type="text"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                />
              </label>
            </p>
            {/* HERE I MAKE PREVIEW FOR PHOTO */}
            <img src={image} alt={name} width={300} />
            <h3>
              <button type="submit">Post a cool story bro</button>
            </h3>
          </form>
        </div>
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
