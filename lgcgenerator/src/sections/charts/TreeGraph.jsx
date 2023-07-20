import React from "react";
import Tree from "react-d3-tree";
import { getFrameTree, getFrameTree2 } from "../../utils/allDataProcessing";

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

const TreeGraph = ({ data }) => {
  // const myTreeData = [treeData];
  const myTreeData = getFrameTree2(data.LGC_DATA);

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
          // width: "1100px",
          height: "100vh",
          // border: "1px solid black",
        }}
      >
        <Tree
          data={myTreeData}
          collapsible={false}
          pathFunc={"straight"}
          separation={{ nonSiblings: 1, siblings: 0.5 }}
          depthFactor={350}
        />
      </div>
    </div>
  );
};

export default TreeGraph;
