import React from "react";
import Tree from "react-d3-tree";

const treeData = {
  name: "Root",
  children: [
    {
      name: "Node 1",
      children: [{ name: "Leaf 1" }, { name: "Leaf 2" }],
    },
    {
      name: "Node 2",
      children: [{ name: "Leaf 3" }, { name: "Leaf 4" }],
    },
  ],
};

const NodeLabel = ({ nodeData }) => {
  return (
    <text x="-30" y="-20" fill="white">
      {nodeData.name}
    </text>
  );
};

const TreeGraph = () => {
  const myTreeData = [treeData];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1100px",
          height: "900px",
          border: "1px solid black",
        }}
      >
        <Tree
          data={myTreeData}
          collapsible={false}
          pathFunc={"straight"}
          separation={{ nonSiblings: 1, siblings: 0.5 }}
        />
      </div>
    </div>
  );
};

export default TreeGraph;
