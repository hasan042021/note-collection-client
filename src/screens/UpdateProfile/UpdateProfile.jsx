import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { updateProfile } from "../../redux/userSlice";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const { error, loading, userInfo } = useSelector(
    (state) => state.userReducer
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPic(userInfo.pic);
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    const user = { name, email, password, pic };
    dispatch(updateProfile(user));
    !error && setSuccess(true);
  };

  const postDetails = (img) => {
    console.log(img);
    setDisabled(true);
    if (!img) {
      setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (img.type === "image/jpeg" || img.type === "image/png") {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "notes_collection_image");
      data.append("cloud_name", "dfarc1axc");
      fetch("https://api.cloudinary.com/v1_1/dfarc1axc/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          setDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          setDisabled(false);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };
  return (
    <MainScreen title="EDIT PROFILE">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {success && (
        <ErrorMessage variant="success">Updated Successfully</ErrorMessage>
      )}
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  type="file"
                  accept="img/*"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button
                disabled={disabled}
                className="my-3"
                variant="primary"
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default UpdateProfile;
