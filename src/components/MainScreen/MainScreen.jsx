import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

const MainScreen = ({ title, children, width }) => {
  return (
    <div
      style={{
        maxWidth: window.innerWidth >= 500 ? (width ? width : "100%") : "100%",
        margin: "auto",
      }}
      className="mainback"
    >
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
