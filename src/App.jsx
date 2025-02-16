import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import "./App.css";
import { familyData } from "./assets/familyData";
import { createLinkTemplate, createNodeTemplate } from "./helpers/tree-helper";

function initDiagram() {
  const diagram = new go.Diagram({
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    "clickCreatingTool.archetypeNodeData": { text: "new node", color: "lightblue" },

    layout: new go.TreeLayout({
      angle: 90,
      nodeSpacing: 20,
      layerSpacing: 50,
      layerStyle: go.TreeLayout.LayerUniform,

      treeStyle: go.TreeStyle.LastParents,
      alternateAngle: 90,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeAlignment.BottomRightBus,
      alternateNodeSpacing: 20,
    }),
    "toolManager.hoverDelay": 100,
    linkTemplate: createLinkTemplate(),
    model: new go.TreeModel({ nodeKeyProperty: "name" }),
  });

  diagram.nodeTemplate = createNodeTemplate();
  const nodes = familyData;
  diagram.model.addNodeDataCollection(nodes);

  // Initially center on root:
  diagram.addDiagramListener("InitialLayoutCompleted", () => {
    const root = diagram.findNodeForKey("King George V");
    if (!root) return;
    diagram.scale = 0.6;
    diagram.scrollToRect(root.actualBounds);
  });

  return diagram;
}

function App() {
  return <ReactDiagram initDiagram={initDiagram} divClassName="diagram-component" />;
}

export default App;
