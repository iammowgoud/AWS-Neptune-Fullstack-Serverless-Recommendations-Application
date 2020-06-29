import handler from "../libs/handler-lib";

import gremlin from 'gremlin';
const Graph = gremlin.structure.Graph;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;


////
// const endpoint = `ws://${process.env.NEPTUNE_ENDPOINT}:${process.env.NEPTUNE_PORT}/gremlin`; // TODO: fix this
const endpoint = `wss://neptunedbcluster-XXXXXXX.cluster-XXXXX.us-east-2.neptune.amazonaws.com:8182/gremlin`;
const endpoint = `wss://neptunedbcluster-m6gsagawv2nw.cluster-cafqxbb12cgh.us-east-2.neptune.amazonaws.com:8182/gremlin`;
const graph = new Graph();
const g = graph.traversal().withRemote(new DriverRemoteConnection(endpoint, { traversalSource: 'g' }));

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const result = await g.addV("Operation").property("text", data.text).valueMap(true).toList();
  return result;
});