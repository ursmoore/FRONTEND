import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAllSpaces } from "../../store/spaceReducer/selectors";
import { Link } from "react-router-dom";
import { fetchSpaces } from "../../store/spaceReducer/actions";
// import { Button, Card } from "react-bootstrap";

const Homepage = () => {
  const dispatch = useDispatch();
  const spaces = useSelector(selectAllSpaces);
  console.log("spaces", spaces);

  useEffect(() => {
    dispatch(fetchSpaces);
  }, []);

  return (
    <div>
      <p>This is Homepage</p>
      {spaces.map((space) => {
        return (
          // <>
          //   <Card style={{ width: "18rem" }}>
          //     <Card.Img variant="top" src="holder.js/100px180" />
          //     <Card.Body>
          //       <Card.Title>Card Title</Card.Title>
          //       <Card.Text>
          //         Some quick example text to build on the card title and make up
          //         the bulk of the card's content.
          //       </Card.Text>
          //       <Button variant="primary">Go somewhere</Button>
          //     </Card.Body>
          //   </Card>
          // </>

          <div
            key={space.id}
            style={{
              backgroundColor: space.backgroundColor,
              color: space.color,
            }}
          >
            <h1>{space.title}</h1>
            <div>{space.description}</div>
            <button>
              <Link
                style={{ textDecoration: "none" }}
                to={`/spaces/${space.id}`}
              >
                <p>VISIT SPACE</p>
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
