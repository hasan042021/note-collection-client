import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Form,
  FormGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useCreateNoteMutation } from "../../redux/notesApi";
import MDEditor from "@uiw/react-md-editor";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("#hello");
  const [category, setCategory] = useState("");

  //   const noteCreate = useSelector((state) => state.noteCreate);
  //   const { loading, error, note } = noteCreate;

  //   console.log(note);s

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const [createNote, { isLoading, error, isSuccess }] = useCreateNoteMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    createNote({ title, content, category });
    resetHandler();
  };
  const [value, setValue] = React.useState("**Hello world!!!**");

  return (
    <MainScreen title="Create a Note">
      {isLoading && <Loading size={50} />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {isSuccess && "note created successfully"}
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <FormGroup>
              <div className="container">
                <MDEditor value={value} onChange={setValue} />
                {/* <MDEditor.Markdown
                  source={value}
                  style={{ whiteSpace: "pre-wrap" }}
                /> */}
              </div>
            </FormGroup>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <div className="mt-3">
              <Button type="submit" variant="primary">
                Create Note
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
              </Button>
            </div>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
