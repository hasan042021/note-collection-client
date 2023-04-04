import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { EyeSlashFill } from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useVisiblePassword from "../../components/hooks/useVisiblePassword";
import MainScreen from "../../components/MainScreen/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { passwordShown, togglePassword } = useVisiblePassword();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.from || "/";
  const dispatch = useDispatch();
  const login = useSelector((state) => state);
  const { error, loading } = login;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password, navigate, path }));
  };
  return (
    <div>
      <Container
        aria-live="polite"
        aria-atomic="true"
        className="position-relative"
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <MainScreen title="LOGIN" width="70%">
          <div className="loginContainer">
            {loading && <Loading />}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail" className="mb-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="position-relative"
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

              <Button className="my-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                New Customer ? <Link to="/register">Register Here</Link>
              </Col>
            </Row>
          </div>
        </MainScreen>
      </Container>
    </div>
  );
};

export default Login;
