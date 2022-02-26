// import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteStory, fetchMe } from "../../store/space/actions";
// import { selectMe } from "../../store/space/selectors";
// import { createStory, editSpace } from "../../store/space/actions";

// export default function MySpace() {
//   const dispatch = useDispatch();
//   const mySpace = useSelector(selectMe);
//   console.log("what is my space", mySpace);
//   const [form, setForm] = useState(false);
//   const [editForm, setEditForm] = useState(false);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [newBackgroundColor, setBackgroundColor] = useState("");
//   const [color, setColor] = useState("");

//   const [name, setName] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   useEffect(() => {
//     if (mySpace) {
//       setBackgroundColor(mySpace.backgroundColor);
//       setColor(mySpace.color);
//     }
//   }, [mySpace]);
//   useEffect(() => {
//     dispatch(fetchMe());
//   }, [dispatch]);

//   function submitForm(event) {
//     // console.log("input", name, content, imageUrl);
//     event.preventDefault();
//     dispatch(createStory(name, content, imageUrl));
//     setContent("");
//     setName("");

//     setImageUrl("");
//     setForm(false);
//   }

//   function submitFormEdit(event) {
//     // console.log("input", name, content, imageUrl);
//     event.preventDefault();
//     dispatch(editSpace(title, description, newBackgroundColor, color));

//     setTitle("");
//     setDescription("");

//     setBackgroundColor("");
//     setColor("");
//     setEditForm(false);
//   }

//   return mySpace ? (
//     <div
//       style={{
//         backgroundColor: `${mySpace?.backgroundColor}`,
//         color: `${mySpace?.color}`,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "10px",
//         }}
//       >
//         <button
//           value={form}
//           onClick={() => setForm(!form)}
//           style={{
//             backgroundColor: "Green",
//             color: "white",

//             padding: "8px",
//             textDecoration: "none",
//             border: "none",
//             borderRadius: "15px",
//           }}
//         >
//           Post a cool story BRO
//         </button>
//         {form ? (
//           <form
//             style={{ display: "flex", margin: "20px", flexDirection: "column" }}
//           >
//             <label>Name </label>
//             <input
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//               type="text"
//               placeholder="name me!"
//             ></input>
//             <label>Content </label>
//             <input
//               value={content}
//               onChange={(event) => setContent(event.target.value)}
//               type="text"
//               placeholder="describe me!"
//             ></input>
//             <label>Image Url </label>
//             <input
//               value={imageUrl}
//               onChange={(event) => setImageUrl(event.target.value)}
//               type="text"
//               placeholder="give me an imgUrl!"
//             ></input>
//             <img
//               src={imageUrl}
//               alt="preview"
//               style={{ maxWidth: "400px", margin: "20px" }}
//             />
//             <button
//               style={{
//                 backgroundColor: "Black",
//                 color: "white",
//                 padding: "8px",
//                 textDecoration: "none",
//                 border: "none",
//                 borderRadius: "15px",
//                 margin: "10px",
//               }}
//               onClick={submitForm}
//             >
//               Submit
//             </button>
//           </form>
//         ) : (
//           ""
//         )}
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "10px",
//         }}
//       >
//         <button
//           value={editForm}
//           onClick={() => setEditForm(!editForm)}
//           style={{
//             backgroundColor: "Green",
//             color: "white",

//             padding: "8px",
//             textDecoration: "none",
//             border: "none",
//             borderRadius: "15px",
//           }}
//         >
//           Edit Space
//         </button>
//         {editForm ? (
//           <form
//             style={{ display: "flex", margin: "20px", flexDirection: "column" }}
//           >
//             <label>Title </label>
//             <input
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               type="text"
//               placeholder="change your title!"
//             ></input>
//             <label>Description </label>
//             <input
//               value={description}
//               onChange={(event) => setDescription(event.target.value)}
//               type="text"
//               placeholder="new description!"
//             ></input>
//             <label>Background Color </label>
//             <input
//               value={newBackgroundColor}
//               onChange={(event) => setBackgroundColor(event.target.value)}
//               type="color"
//               placeholder="give me a background color!"
//             ></input>
//             <label>Color </label>
//             <input
//               value={color}
//               onChange={(event) => setColor(event.target.value)}
//               type="color"
//               placeholder="give me a color!"
//             ></input>
//             <button
//               style={{
//                 backgroundColor: "Black",
//                 color: "white",
//                 padding: "8px",
//                 textDecoration: "none",
//                 border: "none",
//                 borderRadius: "15px",
//                 margin: "10px",
//               }}
//               onClick={submitFormEdit}
//             >
//               Submit Edit
//             </button>
//           </form>
//         ) : (
//           ""
//         )}
//       </div>
//       <div style={{ marginTop: "30px" }}>
//         {mySpace?.stories &&
//           mySpace?.stories.map((story) => {
//             return (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <h4>{story.name}</h4>
//                 <p>{story.content}</p>
//                 <button
//                   onClick={() => dispatch(deleteStory(story.id))}
//                   style={{
//                     backgroundColor: "red",
//                     color: "white",
//                     padding: "8px",
//                     textDecoration: "none",
//                     border: "none",
//                     borderRadius: "15px",
//                   }}
//                 >
//                   Delete this Story
//                 </button>
//                 <img
//                   src={story.imageUrl}
//                   alt={story.name}
//                   style={{ margin: "10px", width: "700px" }}
//                 />
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   ) : (
//     "Loading"
//   );
// }
