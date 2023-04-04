import React, { useState } from "react";
import { useEffect } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDeleteNoteMutation, useNotesQuery } from "../../redux/notesApi";
import "./MyNotes.css";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "white", border: "none" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const MyNotes = ({ search }) => {
  const { error, isLoading, data } = useNotesQuery();
  const userInfo = useSelector((state) => state.userReducer.userInfo);

  const [deleteNote] = useDeleteNoteMutation();
  console.log(data);
  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      deleteNote(id);
    }
  };
  return (
    <MainScreen title={`Welcome ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error.message}</ErrorMessage>}
      {isLoading && <Loading />}
      {data && data.length === 0 && <p>No Data Found</p>}
      {data &&
        [...data]
          .reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((d) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={d._id}>
                <Card.Header
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CustomToggle eventKey="0">{d.title}</CustomToggle>

                  <div>
                    <Link to={`${d._id}`}>
                      {" "}
                      <Button variant="outline-info">Edit </Button>
                    </Link>{" "}
                    <Button
                      onClick={() => deleteHandler(d._id)}
                      variant="danger"
                      className="mx-2"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4 className="mb-2">
                      <Badge variant="success" className="my-2">
                        Category - {d.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{d.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {d.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
