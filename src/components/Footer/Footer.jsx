import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">Copyright&copy;note-collection 2022</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
