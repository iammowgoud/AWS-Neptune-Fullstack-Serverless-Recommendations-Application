import React, { useRef, useState } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";

import "./NewNode.css";

export default function NewNode() {
  const history = useHistory();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return text.length > 0;
  }


  async function handleSubmit(event) {
    event.preventDefault();


    setIsLoading(true);

    try {

      await createNode({ text });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createNode(node) {
    return API.post("hmd", "/hmd", {
      body: node
    });
  }

  return (
    <div className="NewNode">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={text}
            componentClass="textarea"
            onChange={e => setText(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
