import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { useParams, useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Nodes.css";

export default function Nodes() {
  const { id } = useParams();
  const history = useHistory();
  const [node, setNode] = useState(null);

  useEffect(() => {
    function loadNode() {
      return API.get("hmd", `/hmd/${id}`);
    }

    async function onLoad() {
      try {
        const node = await loadNode();
        setNode(node[0]);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);



  return (
    <div className="Nodes">
      {node && (
        <div>
          {Object.keys(node).map(key => (
            <h4 key="key"> {key}: {node[key]}</h4>
          ))}
        </div>
      )}
    </div>
  );
}
