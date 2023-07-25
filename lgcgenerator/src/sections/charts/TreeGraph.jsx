import React from "react";
import Tree from "react-d3-tree";
import { getFrameTree } from "../../data_processing/processing";

const TreeGraph = ({ data }) => {
  const myTreeData = getFrameTree(data.LGC_DATA);

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
          height: "500px",
          border: "1px solid black",
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
