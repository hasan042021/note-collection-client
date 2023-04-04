import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main ">
      <div className="intro-text">
        <h1 className="title">Welcome to note collection</h1>
        <p className="subtitle">One safe place for all your notes.</p>
        <div className="buttonContainer">
          <Link to="/login">
            <Button className="landingButton">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="landingButton" variant="outline-primary">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
