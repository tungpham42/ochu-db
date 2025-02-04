import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";

const Record = () => {
  const [record, setRecord] = useState({ word: "", clue: "" });
  const [newRecord, setNewRecord] = useState({ word: "", clue: "" });
  const API_URL = "/api/record";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setRecord(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the record!", error);
      });
  }, []);

  const handleCreateOrUpdate = () => {
    axios
      .post(API_URL, newRecord)
      .then((response) => {
        setRecord(response.data); // Update the displayed record
        setNewRecord({ word: "", clue: "" }); // Reset form fields
      })
      .catch((error) => {
        console.error("There was an error saving the record!", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(API_URL)
      .then(() => {
        setRecord({ word: "", clue: "" }); // Reset displayed record
      })
      .catch((error) => {
        console.error("There was an error deleting the record!", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Word and Clue</h2>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Current Record</Card.Title>
          <Card.Text>
            <strong>Word:</strong> {record.word}
          </Card.Text>
          <Card.Text>
            <strong>Clue:</strong> {record.clue}
          </Card.Text>
        </Card.Body>
      </Card>

      <Form>
        <Form.Group controlId="word">
          <Form.Label>Word</Form.Label>
          <Form.Control
            type="text"
            value={newRecord.word}
            onChange={(e) =>
              setNewRecord({ ...newRecord, word: e.target.value })
            }
            placeholder="Enter word"
          />
        </Form.Group>

        <Form.Group controlId="clue">
          <Form.Label>Clue</Form.Label>
          <Form.Control
            type="text"
            value={newRecord.clue}
            onChange={(e) =>
              setNewRecord({ ...newRecord, clue: e.target.value })
            }
            placeholder="Enter clue"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateOrUpdate}>
          Save
        </Button>
        <Button variant="danger" onClick={handleDelete} className="ml-2">
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default Record;
