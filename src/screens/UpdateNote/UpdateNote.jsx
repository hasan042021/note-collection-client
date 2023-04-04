import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import {
  useGetSingleNoteQuery,
  useUpdateNoteMutation,
} from "../../redux/notesApi";

const UpdateNote = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useGetSingleNoteQuery(id);

  const [updateNote] = useUpdateNoteMutation();
  const [title, setTitle] = useState(data?.title);
  const [content, setContent] = useState(data?.content);
  const [category, setCategory] = useState(data?.category);
  const [date, setDate] = useState("");
  useEffect(() => {
    setTitle(data?.title);
    setContent(data?.content);
    setCategory(data?.category);
  }, [data]);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    updateNote({
      id,
      title,
      content,
      category,
    });
    resetHandler();
  };

  return (
    <MainScreen title="Edit Note">
      {isLoading && <Loading />}
      {data && (
        <Card>
          <Card.Header>Edit your Note</Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the content"
                  rows={4}
                  value={content}
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
                  placeholder="Enter the Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {isLoading && <Loading size={50} />}
              <Button variant="primary" type="submit">
                Update Note
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(id)}
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Updated on - {date.substring(0, 10)}
          </Card.Footer>
        </Card>
      )}
    </MainScreen>
  );
};

export default UpdateNote;
