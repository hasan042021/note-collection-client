import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import { EyeSlashFill } from "react-bootstrap-icons";
import useVisiblePassword from "../../components/hooks/useVisiblePassword";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const { passwordShown, togglePassword } = useVisiblePassword();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.userReducer);
  const path = location.state?.from || "/";
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, pic);
    setMessage(null);
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(userRegister({ name, email, password, pic, navigate, path }));
    }
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
    <div>
      <Container
        aria-live="polite"
        aria-atomic="true"
        className="position-relative"
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <MainScreen title="Register" width="70%">
          <div className="loginContainer">
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2">
                <Form.Label>Email Your Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="position-relative my-2"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeSlashFill
                  className="position-absolute  translate-middle"
                  style={{ top: "70%", right: 0, cursor: "pointer" }}
                  onClick={togglePassword}
                />
              </Form.Group>
              <Form.Group
                className="position-relative"
                controlId="formBasicPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  accept="image/*"
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
                Submit
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                Already Have an account ? <Link to="/login">Login</Link>
              </Col>
            </Row>
          </div>
        </MainScreen>
      </Container>
    </div>
  );
};

export default Register;
