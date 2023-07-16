import React from "react";
import Plot from "react-plotly.js";
import { getFrameTree } from "../utils/allDataProcessing";

const FrameTree = ({ data }) => {
  const frameTree = getFrameTree(data.LGC_DATA);

  const nodes = frameTree.nodes.map((node) => ({
    id: node.id,
    label: node.label,
    x: Math.random(),
    y: Math.random(),
    size: 15,
    color: "blue",
    type: "scatter",
    mode: "markers",
    hovertemplate: node.label,
  }));

  const edges = frameTree.edges.map((edge) => ({
    type: "scatter",
    mode: "lines",
    x: [
      nodes.find((node) => node.id === edge.source).x,
      nodes.find((node) => node.id === edge.target).x,
    ],
    y: [
      nodes.find((node) => node.id === edge.source).y,
      nodes.find((node) => node.id === edge.target).y,
    ],
    line: { width: 2 },
  }));

  const data2 = [...nodes, ...edges];

  const layout = {
    title: "Network Graph",
    showlegend: false,
    hovermode: "closest",
    margin: { t: 40, l: 40, r: 40, b: 40 },
    xaxis: { showgrid: false, zeroline: false },
    yaxis: { showgrid: false, zeroline: false },
    width: 600,
    height: 400,
  };

  return (
    <Plot data={data2} layout={layout} config={{ displayModeBar: false }} />
  );
};

export default FrameTree;
