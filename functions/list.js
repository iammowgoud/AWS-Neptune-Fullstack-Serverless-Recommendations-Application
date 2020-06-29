import handler from "../libs/handler-lib";
// import dynamoDb from "./libs/dynamodb-lib";

import gremlin from 'gremlin';


const Graph = gremlin.structure.Graph;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;


// const endpoint = `ws://${process.env.NEPTUNE_ENDPOINT}:${process.env.NEPTUNE_PORT}/gremlin`; // TODO: fix this
const endpoint = `wss://neptunedbcluster-XXXXXXX.cluster-XXXXX.us-east-2.neptune.amazonaws.com:8182/gremlin`;
const graph = new Graph();
const conn = new DriverRemoteConnection(endpoint, { traversalSource: 'g' });
const g = graph.traversal().withRemote(conn);


export const main = handler(async () => {
  const ids = await g.V().hasLabel("Operation").id().toList();
  const result = await g.V().hasLabel("Operation").properties().toList();

  return result.map((n, i) => { n.id = ids[i]; return n; });
});