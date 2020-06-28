import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";


export default function Home() {
  const [nodes, setNodes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const nodes = await loadNodes();
        setNodes(nodes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNodes() {
    return API.get("hmd", "/hmd");
  }

  function renderNodesList(nodes) {
    return [{}].concat(nodes).map((node, i) =>
      i !== 0 ? (
        <LinkContainer key={node.id} to={`/nodes/${node.id}`}>
          <ListGroupItem>
            {"id: " + node.id}
            <br></br>
            {"Text: " + node.value}
          </ListGroupItem>
        </LinkContainer>
      ) : (
          <LinkContainer key="new" to="/nodes/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new node
            </h4>
            </ListGroupItem>
          </LinkContainer>
        )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>HMD</h1>
        <p>Test</p>
      </div>
    );
  }

  function renderNodes() {
    return (
      <div className="nodes">
        <PageHeader>Nodes (Operations)</PageHeader>
        <ListGroup>
          {!isLoading && renderNodesList(nodes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNodes() : renderLander()}
    </div>
  );
}
